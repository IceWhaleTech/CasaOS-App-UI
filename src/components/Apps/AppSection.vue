<template>
  <div class="home-section has-text-left">
    <!-- Title Bar Start -->
    <div class="pt-1 pb-2 is-flex is-align-items-center">
      <app-section-title-tip
        id="appTitle1"
        class="is-flex-grow-1 has-text-sub-04"
        :label="$t('DragIconsToSort')"
        :title="$t('Apps')"
      ></app-section-title-tip>

      <b-dropdown
        ref="cdro"
        animation="fade1"
        aria-role="menu"
        position="is-bottom-left"
        v-on-click-outside="() => ($refs.cdro.isActive = false)"
      >
        <template #trigger>
          <b-icon
            class="polymorphic is-clickable has-text-grey-100"
            icon="plus-outline"
            pack="casa"
            size="is-24"
          ></b-icon>
        </template>
        <b-dropdown-item aria-role="menuitem" @click="showAppSettingPanel('', 'custom')">
          {{ $t("Add a Containerized Application APP") }}
        </b-dropdown-item>
        <b-dropdown-item aria-role="menuitem" @click="showExternalLinkPanel">
          {{ $t("Add external link/APP") }}
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <!-- Title Bar End -->

    <!-- App List Start -->
    <transition name="fade">
      <draggable
        v-model="appList"
        :draggable="draggable"
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 app-list contextmenu-canvas"
        tag="div"
        v-bind="dragOptions"
        @end="onSortEnd"
        @start="drag = true"
        v-if="!isLoading"
      >
        <!-- App Icon Card Start -->
        <template>
          <div v-for="item in appList" :id="'app-' + item.name" :key="'app-' + item.name" class="handle">
            <app-card
              :item="item"
              :appIds="$store.state.newAppIds"
              @configApp="showConfigPanel"
              @importApp="showContainerPanel"
              @updateState="getList"
              @updateAppIds="getNewAppIdsFromCustomStorage"
            ></app-card>
          </div>
        </template>
        <!-- App Icon Card End -->
      </draggable>
    </transition>
    <!-- App List End -->

    <template v-if="oldAppList.length > 0">
      <!-- Title Bar Start -->
      <div class="mb-5 title-bar is-flex is-align-items-center mt-2rem">
        <app-section-title-tip
          id="appTitle2"
          class="is-flex-grow-1 has-text-sub-04"
          :label="$t('To be rebuilt.')"
          title="Legacy app"
        >
        </app-section-title-tip>
      </div>
      <!-- Title Bar End -->

      <!-- App List Start -->
      <div
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 app-list contextmenu-canvas"
      >
        <!-- Application not imported Start -->
        <div v-for="item in oldAppList" :id="'app-' + item.name" :key="'app-' + item.name">
          <app-card
            :isCasa="false"
            :item="item"
            :appIds="newAppIds"
            @configApp="showConfigPanel"
            @importApp="showContainerPanel"
            @updateState="getList"
          ></app-card>
        </div>
        <!-- Application not imported End -->
      </div>
      <!-- App List End -->
    </template>
  </div>
</template>

<script>
import AppCard from "./AppCard.vue";
import AppCardSkeleton from "./AppCardSkeleton.vue";
import AppPanel from "./AppPanel.vue";
import ExternalLinkPanel from "@/components/Apps/ExternalLinkPanel";
import AppSectionTitleTip from "./AppSectionTitleTip.vue";
import draggable from "vuedraggable";
import xor from "lodash/xor";
import concat from "lodash/concat";
import events from "@/events/events";
import last from "lodash/last";
import business_ShowNewAppTag from "@/mixins/app/Business_ShowNewAppTag";
import business_LinkApp from "@/mixins/app/Business_LinkApp";
import isEqual from "lodash/isEqual";
import { ice_i18n } from "@/mixins/base/common-i18n";
import { iceGpu } from "@/service/index.js";
import { openDB } from "idb";
import { vOnClickOutside } from "@vueuse/components";

// meta_data :: build-in app
const builtInApplications = [
  {
    id: "1",
    name: "App Store",
    title: {
      en_us: "App Store",
    },
    icon: require(`@/assets/img/app/appstore.svg`),
    status: "running",
    app_type: "system",
  },
  {
    id: "2",
    name: "Settings",
    title: {
      en_us: "Settings",
    },
    icon: require(`@/assets/img/app/settings.svg`),
    status: "running",
    app_type: "system",
  },
  {
    id: "3",
    name: "Backup",
    title: {
      en_us: "Backup",
    },
    icon: require(`@/assets/img/app/backup.svg`),
    status: "running",
    app_type: "system",
  },
];

const orderConfig = "app_order";
let db;

export default {
  directives: {
    onClickOutside: vOnClickOutside,
  },
  mixins: [business_ShowNewAppTag, business_LinkApp],
  data() {
    return {
      user_id: localStorage.getItem("user_id"),
      appList: [],
      oldAppList: [],
      appConfig: {},
      drag: false,
      isLoading: false,
      isShowing: false,
      importHelpText: "Click icon to import.",
      appHelpText: "Drag icons to sort.",
      draggable: ".handle",
      retryCount: 0,
      appListErrorMessage: "",
      skCount: 0,
      ListRefreshTimer: null,
      hasGpu: null,
      gpuAppList: [],
      mircoAppList: [],
    };
  },
  components: {
    AppCard,
    draggable,
    AppSectionTitleTip,
    AppCardSkeleton,
  },
  provide() {
    return {
      openAppStore: this.showAppSettingPanel,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 300,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    showDragTip() {
      return this.draggable === ".handle";
    },
  },
  async created() {
    db = await openDB("casaos", "1", {
      upgrade(db) {
        db.createObjectStore("app", {
          keyPath: "name",
        });
      },
    });
    this.getNewAppIdsFromCustomStorage();

    this.isLoading = true;
    this.draggable = this.isMobile() ? "" : ".handle";

    const initGetList = () => {
      // check GPU and get app list
      this.checkGpu({
        then: () => {
          // get app list
          this.getList();
          // listen to reload app list event
          this.$EventBus.$on(events.RELOAD_APP_LIST, () => {
            this.getList();
          });
          // refresh app list every 5 seconds
          this.ListRefreshTimer = setInterval(() => {
            this.getList();
          }, 5000);
        },
        catch: () => {
          // retry
          setTimeout(() => {
            initGetList();
          }, 1000);
        },
      });
    };
    initGetList();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getSkCount);

    clearInterval(this.ListRefreshTimer);
  },
  mounted() {
    window.addEventListener("resize", this.getSkCount);
    this.getSkCount();
  },
  methods: {
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },

    getSkCount() {
      const windowWidth = window.innerWidth;
      if (windowWidth < 1024) {
        this.skCount = 4;
      } else if (windowWidth < 1216) {
        this.skCount = 6;
      } else if (windowWidth < 1408) {
        this.skCount = 8;
      } else {
        this.skCount = 10;
      }
    },

    /**
     * @description: Get the module UI entry
     * @return {*} module
     */
    async getModuleUIEntries() {
      const moduleList = await this.$openAPI.modManagement.moduleList();
      const entries = [];
      moduleList?.data?.data?.forEach((module) => {
        if (module.ui)
          entries.push({
            name: module.name,
            ...module.ui,
          });
      });
      return entries;
    },

    /**
     * @description: Check if the GPU is available
     * @return {*} void
     */
    checkGpu(callback) {
      iceGpu
        .getGPUList(10 * 1024 * 1024 * 1024, true)
        .then((res) => {
          this.hasGpu = res.data.data.length > 0;
          callback?.then?.();
        })
        .catch(() => {
          callback?.catch?.();
        })
        .finally(() => {
          callback?.finally?.();
        });
    },

    /**
     * @description: Get the list of GPU applications
     * @return {*} void
     */
    getGpuAppList() {
      iceGpu
        .getGPUApplications()
        .then((res) => {
          this.gpuAppList = res.data.data || [];
        })
        .catch(() => {
          this.gpuAppList = [];
        });
    },

    /**
     * @description: Fetch the list of installed apps
     * @return {*} void
     */
    async getList() {
      // this.hasGpu = await iceGpu
      // 	.getGPUList(10 * 1024 * 1024 * 1024, true)
      // 	.then((res) => {
      // 		return res.data.data.length > 0;
      // 	})
      // 	.catch(() => {
      // 		return false;
      // 	});
      // if (this.gpuAppList.length === 0) {
      // 	this.gpuAppList = await iceGpu
      // 		.getGPUApplications()
      // 		.then((res) => res.data.data || [])
      // 		.catch(() => {
      // 			return [];
      // 		});
      // }

      // if (this.hasGpu === null) {
      //   this.checkGpu();
      // }

      if (this.gpuAppList.length === 0) {
        this.getGpuAppList();
      }

      try {
        const orgAppList = await this.$openAPI.appGrid.getAppGrid().then((res) => res.data.data || []);
        let orgOldAppList = [],
          orgNewAppList = [];
        orgAppList.forEach((item) => {
          item.hostname = item.hostname || this.$baseHostname;
          // Container app does not have icon.
          item.icon = item.icon || require(`@/assets/img/app/default.svg`);
          if (item.app_type === "v1app" || item.app_type === "container") {
            // if(item.status === "running") {

            // }
            orgOldAppList.push(item);
          } else {
            orgNewAppList.push(item);
          }
        });
        this.oldAppList = orgOldAppList;

        let linkAppList = await this.getLinkAppList();
        linkAppList.forEach((item, i) => {
          // linkApp does not have title.
          item.title = {
            en_us: item.name,
          };
          item.linkId = i;
        });
        // mirco app list
        if (this.mircoAppList.length === 0) {
          const mircoAppListRaw = await this.getModuleUIEntries();
          this.mircoAppList = mircoAppListRaw
            .filter((item) => item?.show ?? true)
            .map((item) => {
              return {
                name: item.name,
                store_app_id: item.name, // Add supplementary field during the GPU era to determine if it is a GPU app.
                entry: item.entry,
                title: item.title,
                icon: item.icon,
                status: "running",
                app_type: "mircoApp",
                open_type: item.formality.type,
                // TODO Resolve metadata structure conflicts and ensure uniformity and non-redundancy in the application's data models.
                // formality: item.formality,
                // prefetch: item.prefetch
              };
            });
        }
        // all app list
        let casaAppList = concat(builtInApplications, orgNewAppList, linkAppList, this.mircoAppList);

        if (this.hasGpu) {
          casaAppList = casaAppList.map((item) => {
            item.requireGPU = this.gpuAppList.find((gpuItem) => gpuItem.name === item.name);
            return item;
          });
        } else if (this.hasGpu === false) {
          casaAppList = casaAppList.filter((item) => {
            return item.name != "icewhale_chat";
            // return !this.gpuAppList.find((gpuItem) => gpuItem.name === item.name);
          });
        }

        for (let app of casaAppList) {
          db.put("app", app);
        }

        // get app sort info.
        let lateSortList = await this.$api.users
          .getCustomStorage(orderConfig)
          .then(
            (res) =>
              res.data.data.data || [
                "App Store",
                "icewhale_files",
                "zimaos_zvm",
                "icewhale_chat",
                "icewhale_peerdrop",
                "Settings",
                "IceWhale Community",
              ]
          );

        // filter anything not in casaAppList.
        const propList = casaAppList.map((obj) => obj.name);
        const existingList = lateSortList.filter((item) => propList.includes(item));
        const futureList = propList.filter((item) => !lateSortList.includes(item));
        const newSortList = existingList.concat(futureList);

        // then sort.
        const sortedAppList = casaAppList.sort((obj1, obj2) => {
          return newSortList.indexOf(obj1.name) - newSortList.indexOf(obj2.name);
        });

        const sortedList = sortedAppList.map((obj) => obj.name);
        this.appList = sortedAppList;
        if (!isEqual(lateSortList, sortedList)) {
          this.saveSortData();
        }

        this.isLoading = false;
        this.retryCount = 0;
        this.appListErrorMessage = "";
      } catch (error) {
        console.error(error);
        this.isLoading = true;
        if (this.retryCount < 5) {
          setTimeout(() => {
            this.retryCount++;
            this.getList();
          }, 2000);
        } else {
          this.appListErrorMessage = "Failed to get app list.";
          this.$buefy.toast.open({
            message: this.$t(`Failed to load apps, please refresh later.`),
            type: "is-danger",
          });
        }
      }
    },

    /**
     * @description:
     * @param {Array} oriList
     * @param {Array} newList
     * @return {*}
     */
    getNewSortList(oriList, newList) {
      let xorList = xor(oriList, newList);
      // xorList.reverse()
      return concat(oriList, xorList);
    },

    /**
     * @description: Save Sort Table
     * @param {*}
     * @return {*}
     */
    saveSortData() {
      let newList = this.appList.map((item) => {
        // compose milestone :: name is unique, global index.
        return item.name;
      });
      let data = {
        data: newList,
      };
      this.$api.users.setCustomStorage(orderConfig, data);
    },
    /**
     * @description: Handle on Sort End
     * @param {*}
     * @return {*}
     */
    onSortEnd() {
      this.drag = false;
      this.saveSortData();
    },

    /**
     * @description: Show Setting App Panel Programmatic
     * @return {*} void
     */
    async showAppSettingPanel(storeId = "", mode) {
      if (mode === "custom") {
        this.$messageBus("apps_custominstall");
      }
      this.isShowing = true;
      // block parent scroll

      const networks = await this.$api.container.getNetworks();
      const memory = this.$store.state.hardwareInfo.mem;
      const configData = {
        networks: networks.data.data,
        memory: memory,
      };
      this.isShowing = false;
      window.parent?.document.body.classList.add("p-overflow-hidden");
      this.$buefy.modal.open({
        parent: this,
        component: AppPanel,
        hasModalCard: true,
        customClass: "app-panel",
        trapFocus: true,
        canCancel: ["escape"],
        scroll: "keep",
        animation: "zoom-in",
        events: {
          updateState: () => {
            this.getList();
          },
          close: () => {
            window.parent?.document.body.classList.remove("p-overflow-hidden");
          },
        },
        props: {
          id: "0",
          state: "install",
          configData: configData,
          storeId: storeId,
          // TODO transfer to yaml string.
          settingData: mode !== "custom" ? undefined : {},
        },
      });
    },

    /**
     * @description: Show Settings Panel Programmatic
     * @param {Object} {id:String,status:String }
     * @param {Boolean} isCasa
     * @return {*}
     */
    async showConfigPanel(item, isCasa) {
      let name = item.name;
      // this.$messageBus('appsexsiting_open', name);
      try {
        if (item.app_type === "LinkApp") {
          await this.showExternalLinkPanel(item);
          return;
        }
        const networks = await this.$api.container.getNetworks();
        const memory = this.$store.state.hardwareInfo.mem;
        const configData = {
          networks: networks.data.data,
          memory: memory,
        };
        const ret = await this.$openAPI.appManagement.compose.myComposeApp(name, {
          headers: {
            "content-type": "application/yaml",
            accept: "application/yaml",
          },
        });
        window.parent?.document.body.classList.add("p-overflow-hidden");
        this.$buefy.modal.open({
          parent: this,
          component: AppPanel,
          hasModalCard: true,
          customClass: "app-panel",
          trapFocus: true,
          canCancel: [""],
          scroll: "keep",
          animation: "zoom-in",
          events: {
            updateState: () => {
              this.getList();
            },
            close: () => {
              window.parent?.document.body.classList.remove("p-overflow-hidden");
            },
          },
          props: {
            id: name,
            state: "update",
            isCasa: isCasa,
            // 区分 terminal
            runningStatus: item.status,
            configData: configData,
            // settingData: ret.data,
            settingComposeData: ret.data,
          },
        });
      } catch (e) {
        console.error(e);
      }
    },

    async showContainerPanel(item) {
      this.$messageBus("appsexsiting_open", item.name);
      let id = item.name;
      const networks = await this.$api.container.getNetworks();
      const memory = this.$store.state.hardwareInfo.mem;
      const configData = {
        networks: networks.data.data,
        memory: memory,
      };
      const ret = await this.$api.container.getInfo(id);
      window.parent?.document.body.classList.add("p-overflow-hidden");
      this.$buefy.modal.open({
        parent: this,
        component: AppPanel,
        hasModalCard: true,
        customClass: "app-panel",
        trapFocus: true,
        canCancel: [""],
        scroll: "keep",
        animation: "zoom-in",
        events: {
          updateState: () => {
            this.getList();
          },
          updateCompose: (res) => {
            console.log("updateCompose", res);
          },
          close: () => {
            window.parent?.document.body.classList.remove("p-overflow-hidden");
          },
        },
        props: {
          id: id,
          state: "update",
          isCasa: false,
          runningStatus: item.status,
          configData: configData,
          settingData: ret.data.data,
        },
      });
    },

    async showExternalLinkPanel(item = {}) {
      window.parent?.document.body.classList.add("p-overflow-hidden");
      this.$buefy.modal.open({
        parent: this,
        component: ExternalLinkPanel,
        hasModalCard: true,
        customClass: "app-panel", // peer modal
        trapFocus: true,
        canCancel: [""],
        scroll: "keep",
        animation: "zoom-in",
        events: {
          updateState: () => {
            this.$messageBus("apps_external");
            this.getList().then(() => {
              this.scrollToNewApp();
            });
          },
          close: () => {
            window.parent?.document.body.classList.remove("p-overflow-hidden");
          },
        },
        props: {
          linkName: item.name,
          linkHost: item.hostname,
          linkIcon: item.icon,
          linkId: item.linkId?.toString() ?? "",
        },
      });
    },

    scrollToNewApp() {
      // business :: scroll to last position
      let name = last(this.newAppIds);
      let showEl = document.getElementById("app-" + name);
      showEl && showEl.scrollIntoView({ behavior: "smooth", block: "end" });
    },

    messageBusToast(message, type) {
      let duration = 5000;
      this.$buefy.toast.open({
        message: message,
        duration,
        type,
      });
    },
  },
  sockets: {
    "app:install-end"(res) {
      // business :: Tagging of new app / scrollIntoView
      this.addIdToNewAppIds(res.Properties["app:name"]);
      this.getList().then(() => {
        this.scrollToNewApp();
      });
    },
    "app:install-error"(res) {
      const message = res.Properties.message.toString();
      let toastMessage = "";
      if (message.startsWith("Error response from daemon") && message.includes("docker.io")) {
        toastMessage = this.$t(
          "App installation error: ZimaOS is currently unable to access Docker Hub. Please check your network connection and try again."
        );
      } else {
        toastMessage = message;
      }
      this.$buefy.toast.open({
        message: toastMessage,
        type: "is-danger",
        duration: 5000,
      });
      this.getList().then(() => {
        this.scrollToNewApp();
      });
    },
    "app:uninstall-end"() {
      this.getList();
    },
    "app:apply-changes-error"(res) {
      // toast info
      this.messageBusToast(res.Properties.message, "is-danger");
    },
    "app:apply-changes-end"(res) {
      let languages = JSON.parse(res.Properties["app:title"]);
      const title = ice_i18n(languages);
      // toast info
      this.messageBusToast(this.$t("appSettingsUpdated", { appName: title }), "is-success");

      // business :: Tagging of new app / scrollIntoView
      this.addIdToNewAppIds(res.Properties["app:name"], {
        then: () => {
          this.getList().then(() => {
            this.scrollToNewApp();
          });
        },
      });
    },
    /**
     * @description: Update App Version
     * @param {Object} data
     * @return {void}
     */
    "app:update-end"(data) {
      if (data.Properties["docker:image:updated"] === "true") {
        // business :: Tagging of new app / scrollIntoView
        this.addIdToNewAppIds(data.Properties["app:name"], {
          then: () => {
            this.$buefy.toast.open({
              message: this.$t(`{name} has been updated to the latest version!`, {
                name: data.Properties.name,
              }),
              type: "is-success",
            });
            this.getList().then(() => {
              this.scrollToNewApp();
            });
          },
        });
      }
    },
    "app:update-error"(data) {
      if (data.Properties.cid === this.item.id) {
        this.isUpdating = false;
        this.$buefy.toast.open({
          message: this.$t(data.Properties["error"]),
          type: "is-danger",
        });
      }
    },
    "casaos-ui:app:mircoapp_communicate"(data) {
      if (data.Properties.access_id === window.$wujie.props?.access_id) {
        // Open App Detail Panel
        if (data.Properties.action === "open_appstore_detail" && data.Properties.storeId) {
          this.showAppSettingPanel(data.Properties.storeId);
        }
      }
    },
  },
};
</script>
