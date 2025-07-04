<template>
  <div class="modal-card">
    <!-- Modal Header -->
    <header class="modal-card-head">
      <div class="is-flex-grow-1">
        <h3 class="title is-5">{{ appName }} {{ $t("Tips") }}</h3>
      </div>
      <div class="is-flex is-align-items-center">
        <b-icon class="_polymorphic" icon="close-outline" pack="casa" @click.native="handleClose" />
      </div>
    </header>

    <!-- Modal Body -->
    <section class="py-2 modal-card-body">
      <!-- Editor Toolbar (only show when name prop exists) -->
      <div v-if="showEditorToolbar" class="flex justify-between items-center">
        <AppMigrationBtn />
        <b-tooltip type="is-black" position="is-left" :label="$t(editTooltip)">
          <b-icon
            class="_polymorphic"
            :class="editIconClasses"
            :icon="editIcon"
            pack="casa"
            @click.native="toggleEditMode"
          />
        </b-tooltip>
      </div>

      <!-- Markdown Editor -->
      <VMdEditor
        ref="editor"
        v-model="tips"
        :mode="editorMode"
        :placeholder="$t('Something to remember eg. password')"
        left-toolbar
        right-toolbar
        class="tips-editor"
      />
    </section>

    <!-- Modal Footer -->
    <footer class="modal-card-foot">
      <div class="is-flex-grow-1">
        <b-checkbox v-model="dontShowAgain" size="is-small" :disabled="isProcessing" v-if="!showEditorToolbar">
          {{ $t("Don't show this again") }}
        </b-checkbox>
      </div>
      <div class="is-flex">
        <b-button rounded size="is-small" type="is-primary" :loading="isProcessing" @click="handleSubmit">
          {{ $t("Open") }} {{ appName }}
        </b-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { stringify } from "yaml";
import merge from "lodash/merge";
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";

import { ice_i18n } from "@/mixins/base/common-i18n";
import AppMigrationBtn from "@/components/AppSetting/AppMigrationBtn.vue";
import business_ShowNewAppTag from "@/mixins/app/Business_ShowNewAppTag";

// 编辑器配置
VMdEditor.use(githubTheme);

// 常量定义
const EDITOR_MODES = {
  PREVIEW: "preview",
  EDIT: "edit",
};

const ICONS = {
  EDIT: "edit-outline",
  CHECK: "check-outline",
};

export default {
  name: "AppTipModal",

  mixins: [business_ShowNewAppTag],

  components: {
    VMdEditor,
    AppMigrationBtn,
  },

  props: {
    composeData: {
      type: Object,
      required: true,
      validator: (value) => value && typeof value === "object",
    },
    name: {
      type: String,
      default: "",
    },
    appInfo: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      // 编辑器状态
      isEditing: false,
      tips: "",
      tempTips: "",

      // 复选框状态
      dontShowAgain: false,
      isInitializing: true,

      // UI状态
      isProcessing: false,
    };
  },

  computed: {
    /**
     * 应用名称
     */
    appName() {
      const title = this.composeData?.["x-casaos"]?.["title"];
      if (!title) return "";

      return title.custom || ice_i18n(title) || "";
    },

    /**
     * 当前应用ID
     */
    currentAppId() {
      return this.appInfo?.name || this.name || "";
    },

    /**
     * 是否显示编辑器工具栏
     */
    showEditorToolbar() {
      return Boolean(this.name);
    },

    /**
     * 编辑器模式
     */
    editorMode() {
      return this.isEditing ? EDITOR_MODES.EDIT : EDITOR_MODES.PREVIEW;
    },

    /**
     * 编辑按钮图标
     */
    editIcon() {
      return this.isEditing ? ICONS.CHECK : ICONS.EDIT;
    },

    /**
     * 编辑Tooltip 文字
     */
    editTooltip() {
      return this.isEditing ? "Save" : "Edit";
    },

    /**
     * 编辑按钮样式类
     */
    editIconClasses() {
      return {
        "has-text-grey-800": !this.isEditing,
        "has-text-green-default": this.hasUnsavedChanges,
        "has-text-grey-400": !this.hasUnsavedChanges && this.isEditing,
        "cursor-pointer": true,
      };
    },

    /**
     * 是否有未保存的更改
     */
    hasUnsavedChanges() {
      return this.tempTips !== this.tips;
    },
  },

  watch: {
    /**
     * 监听compose数据变化，更新tips内容
     */
    composeData: {
      handler(newData) {
        this.updateTipsFromComposeData(newData);
      },
      immediate: true,
    },

    /**
     * 监听"不再显示"状态变化
     */
    dontShowAgain: {
      handler(newValue) {
        if (!this.isInitializing) {
          this.handleDontShowAgainChange(newValue);
        }
      },
    },
  },

  async mounted() {
    await this.initializeComponent();
  },

  methods: {
    // ==================== 初始化方法 ====================

    /**
     * 初始化组件
     */
    async initializeComponent() {
      try {
        // 初始化复选框状态
        await this.initDontShowAgainState();

        // 如果tips为空，自动进入编辑模式并聚焦
        if (!this.tips) {
          this.isEditing = true;
          await this.$nextTick();
          this.focusEditor();
        }
      } catch (error) {
        console.error("组件初始化失败:", error);
      }
    },

    /**
     * 初始化"不再显示"复选框状态
     */
    async initDontShowAgainState() {
      if (!this.currentAppId) {
        console.warn("无法获取应用ID，无法初始化复选框状态");
        this.isInitializing = false;
        return;
      }

      try {
        await this.getTipsStateFromCustomStorage({
          then: () => {
            this.dontShowAgain = !this.hasTips(this.currentAppId);
            console.log(`应用 ${this.currentAppId} 初始状态: ${this.dontShowAgain ? "不再显示" : "显示提示"}`);
          },
          catch: (error) => {
            console.error("获取tipState失败:", error);
            this.dontShowAgain = false;
          },
          finally: () => {
            this.isInitializing = false;
          },
        });
      } catch (error) {
        console.error("初始化复选框状态失败:", error);
        this.dontShowAgain = false;
        this.isInitializing = false;
      }
    },

    // ==================== 数据处理方法 ====================

    /**
     * 从compose数据更新tips内容
     */
    updateTipsFromComposeData(composeData) {
      const tipsData = composeData?.["x-casaos"]?.["tips"];
      if (!tipsData) {
        this.tips = "";
        this.tempTips = "";
        return;
      }

      const customTips = tipsData.custom;
      const beforeInstallTips = tipsData.before_install;

      this.tips = customTips || ice_i18n(beforeInstallTips) || "";
      this.tempTips = this.tips;
    },

    /**
     * 获取完整的compose数据
     */
    getCompleteComposeData() {
      return merge(this.composeData, {
        "x-casaos": {
          tips: {
            custom: this.tips,
          },
        },
      });
    },

    // ==================== 编辑器相关方法 ====================

    /**
     * 切换编辑模式
     */
    toggleEditMode() {
      this.isEditing = !this.isEditing;

      if (this.hasUnsavedChanges) {
        this.saveTips();
      }

      if (this.isEditing) {
        this.$nextTick(() => this.focusEditor());
      }
    },

    /**
     * 聚焦编辑器
     */
    focusEditor() {
      try {
        this.$refs.editor?.focus();
      } catch (error) {
        console.warn("无法聚焦编辑器:", error);
      }
    },

    /**
     * 保存tips内容
     */
    async saveTips() {
      if (!this.name) {
        console.warn("缺少name参数，无法保存tips");
        return;
      }

      this.isProcessing = true;
      this.tempTips = this.tips;

      try {
        const composeData = this.getCompleteComposeData();
        const response = await this.$openAPI.appManagement.compose.applyComposeAppSettings(
          this.name,
          stringify(composeData)
        );

        if (response.status === 200) {
          this.showSuccessToast(response.data.message);
        }
      } catch (error) {
        console.error("保存tips失败:", error);
        this.showErrorToast(error.response?.data?.data || "保存失败");
      } finally {
        this.isProcessing = false;
      }
    },

    // ==================== 复选框处理方法 ====================

    /**
     * 处理"不再显示"状态变化
     */
    async handleDontShowAgainChange(newValue) {
      if (!this.currentAppId) {
        console.warn("无法获取应用ID，无法保存设置");
        return;
      }

      this.isProcessing = true;

      try {
        if (newValue) {
          await this.addToTipsState();
        } else {
          await this.removeFromTipsState();
        }
      } catch (error) {
        console.error("处理设置变化失败:", error);
      } finally {
        this.isProcessing = false;
      }
    },

    /**
     * 添加到tips状态
     */
    async addToTipsState() {
      return new Promise((resolve, reject) => {
        this.addIdToTipsState(this.currentAppId, {
          then: () => {
            console.log(`已标记应用 ${this.currentAppId} 不再显示提示`);
            resolve();
          },
          catch: (error) => {
            console.error(`标记应用 ${this.currentAppId} 失败:`, error);
            this.$nextTick(() => {
              this.dontShowAgain = false;
            });
            reject(error);
          },
        });
      });
    },

    /**
     * 从tips状态移除
     */
    async removeFromTipsState() {
      return new Promise((resolve, reject) => {
        this.removeIdFromTipsState(this.currentAppId, {
          then: () => {
            console.log(`已恢复应用 ${this.currentAppId} 的提示显示`);
            resolve();
          },
          catch: (error) => {
            console.error(`移除应用 ${this.currentAppId} 标记失败:`, error);
            this.$nextTick(() => {
              this.dontShowAgain = true;
            });
            reject(error);
          },
        });
      });
    },

    // ==================== 事件处理方法 ====================

    /**
     * 处理提交按钮点击
     */
    handleSubmit() {
      this.$emit("submit");
      this.$emit("close");
    },

    /**
     * 处理关闭按钮点击
     */
    handleClose() {
      this.$emit("close");
    },

    // ==================== 工具方法 ====================

    /**
     * 显示成功提示
     */
    showSuccessToast(message) {
      this.$buefy.toast.open({
        message,
        type: "is-success",
        position: "is-top",
        duration: 5000,
      });
    },

    /**
     * 显示错误提示
     */
    showErrorToast(message) {
      this.$buefy.toast.open({
        message,
        type: "is-danger",
        position: "is-top",
        duration: 5000,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal .animation-content .modal-card {
  /* v0.4.3 */
  width: 26.5rem;
  margin: 0 auto;

  .modal-card-head {
    padding-top: 1.25rem;
    border-bottom: 1px solid hsla(208, 16%, 94%, 1) !important;
  }

  .modal-card-body {
    padding: 1.5rem;

    ::v-deep .v-md-editor {
      box-shadow: none;
      border-radius: 0.375rem;

      overflow: hidden;
      resize: vertical;
      max-height: 20.25rem;
      min-height: 5.25rem;
      margin-top: 0.5rem;

      &.v-md-editor--edit {
        /* 覆盖上层 */
        border: 0;

        .scrollbar__wrap {
          border: 1px solid hsla(208, 100%, 53%, 1);
          border-radius: 0.625rem;
        }
      }

      .v-md-editor__right-area {
        .v-md-editor__toolbar {
          display: none;
          padding: 0;
          border: 0;
        }

        .v-md-editor__main {
          .v-md-textarea-editor textarea {
            padding: 0.75rem 1rem;
            /* Text 400Regular/Text03 */

            font-family: "BrittiSans";
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            /* identical to box height, or 143% */

            font-feature-settings: "pnum" on, "lnum" on;
          }
        }
      }
    }

    ::v-deep textarea {
      background: white;
    }
    ::v-deep .github-markdown-body {
      font-family: "BrittiSans";
      padding: 0.5rem 0 0 0;
      line-height: 1.5em;
      font-size: 0.875rem;
    }
  }
}

._polymorphic {
  height: 2rem;
  width: 2rem;
  border-radius: 0.375rem;
}

._polymorphic:hover {
  cursor: pointer;
  background: hsla(208, 16%, 96%, 1);
}

._polymorphic:active {
  background: hsla(208, 16%, 94%, 1);
}
</style>
