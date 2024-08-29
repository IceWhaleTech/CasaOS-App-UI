<template>
  <div class="modal-card">
    <!-- Modal-Card Header Start -->
    <header class="modal-card-head">
      <div class="is-flex-grow-1">
        <h3 class="title is-4 has-text-weight-normal">{{ $t("Select") }}</h3>
      </div>
    </header>
    <!-- Modal-Card Header End -->
    <!-- Modal-Card Body Start -->
    <section class="modal-card-body">
      <div class="left" v-if="rootPath != '/dev'">
        <div class="category">
          <span class="category-title">{{ $t("Favorites") }}</span>
          <span class="no-data-desc" v-if="favoriteList.length == 0">{{ $t("noFavorites") }}</span>
          <ul v-else>
            <li
              v-for="pin in favoriteList"
              :key="pin.index"
              class="folder-item"
              :class="[{ 'folder-item-selected': activePath.startsWith(pin.path) }]"
              @click="getFileList(pin.path)"
            >
              <img src="@/assets/img/filebrowser/folder-default.svg" />
              <span>{{ pin.name }}</span>
            </li>
          </ul>
        </div>
        <div class="category">
          <span class="category-title">{{ $t("Storage") }}</span>
          <ul>
            <li
              v-for="storage in storageList"
              :key="storage.path"
              class="folder-item"
              :class="[{ 'folder-item-selected': activePath.startsWith(storage.path) }]"
              @click="getFileList(storage.path)"
            >
              <img src="@/assets/img/storage/storage.svg" />
              <span>{{ storage.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <nav aria-label="breadcrumbs" class="breadcrumb">
          <ul>
            <li>
              <a v-if="showPopUp" @click="getParentList()">
                <b-icon icon="arrow-up"></b-icon>
              </a>
            </li>
            <li v-if="showPopUp">
              <a @click="getFileList(rootPath)">{{ rootName }}</a>
            </li>
            <li v-if="showPopUp & showDots"><a @click="getParentList()">...</a></li>
            <li class="is-active">
              <div>{{ lastFolder }}</div>
            </li>
          </ul>
        </nav>
        <ul class="file-list scrollbars-light">
          <list-item
            v-for="item in fileList"
            :id="item.path"
            :key="item.path"
            :IsDir="item.is_dir"
            :item="item"
            :name="item.name"
            :path="item.path"
            :state="checkActive(item.path)"
            @active="activeFile"
            @expand="getFileList"
          ></list-item>
        </ul>
      </div>
    </section>

    <!-- Modal-Card Body End -->
    <!-- Modal-Card Footer Start-->
    <footer class="modal-card-foot is-flex is-align-items-center">
      <div class="is-flex-grow-1">
        <div v-if="path.startsWith('/DATA') || storageList.some((s) => path.startsWith(s.path))">
          <b-tooltip :label="$t('Create Folder')" position="is-right" type="is-dark">
            <a class="add-button" @click="showCreatePanel(true)">
              <b-icon icon="folder-plus"></b-icon>
            </a>
          </b-tooltip>
          <template v-if="rootPath != path && showFile">
            <b-tooltip :label="$t('Create File')" position="is-right" type="is-dark">
              <a class="add-button" @click="showCreatePanel(false)">
                <b-icon icon="file-plus-outline"></b-icon>
              </a>
            </b-tooltip>
          </template>
        </div>
      </div>
      <div>
        <b-button :label="$t('Cancel')" rounded @click="$emit('close')" />
        <b-button :label="$t('Select')" rounded type="is-primary" @click="selectFile()" />
      </div>
    </footer>
    <!-- Modal-Card Footer End-->
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";
import CreatePanel from "./CreatePanel.vue";
import trimStart from "lodash/trimStart";
import dropRight from "lodash/dropRight";

export default {
  name: "file-panel",
  components: {
    ListItem,
  },
  data() {
    return {
      path: this.initPath,
      activePath: this.initPath,
      fileList: [],
      favoriteList: [],
      storageList: [],
    };
  },
  props: {
    initPath: String,
    rootPath: String,
    showFile: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    // get Last foler name for breadcrumb
    lastFolder() {
      return this.path.split("/").pop();
    },
    // check show breadcrumb
    showPopUp() {
      return this.path != this.rootPath;
    },
    // check show breadcrumb dots
    showDots() {
      return this.path.split("/").length > 3;
    },
    // Root Name
    rootName() {
      return trimStart(this.rootPath, "/");
    },
  },
  created() {
    this.getFavoriteList();
    this.getStorageList();

    this.path = this.path === this.rootPath ? this.path : dropRight(this.path.split("/"), 1).join("/") || "/";

    this.getFileList(this.path, true);
  },

  methods: {
    getFavoriteList() {
      this.$openAPI.filesPin.getPin().then((res) => {
        if (res.status == 200) {
          this.favoriteList = res.data;
        }
      });
    },
    getStorageList() {
      this.$openAPI.storage.getAllStorages().then((res) => {
        if (res.status == 200) {
          this.storageList = res.data;
        }
      });
    },
    // get file list from api
    getFileList(path, locate = false) {
      this.$openAPI.iceFile.getFiles(path).then((res) => {
        if (res.status == 200) {
          this.path = path;
          if (this.showFile) {
            this.fileList = res.data.content;
          } else {
            this.fileList = res.data.content.filter((item) => {
              return item.is_dir;
            });
          }
          if (locate) {
            this.locateFile();
          } else {
            this.activePath = path;
          }
        }
      });
    },

    locateFile() {
      this.$nextTick(() => {
        const activeItem = document.getElementById(this.activePath);
        if (activeItem != null) {
          activeItem.scrollIntoView();
        }
      });
    },

    // get parent list
    getParentList() {
      let backDir = dropRight(this.path.split("/"), 1).join("/");
      if (backDir === "") backDir = "/";

      this.getFileList(backDir);
    },
    selectFile() {
      this.$emit("close");
      this.$emit("updatePath", this.activePath);
    },
    activeFile(val) {
      this.activePath = this.activePath == val ? this.path : val;
    },
    checkActive(val) {
      return this.activePath == val;
    },
    // show create folder or file panel
    showCreatePanel(isFolder) {
      this.$buefy.modal.open({
        parent: this,
        component: CreatePanel,
        hasModalCard: true,
        customClass: "file-sel-modal",
        trapFocus: true,
        canCancel: ["escape"],
        scroll: "keep",
        animation: "zoom-in",
        events: {
          reloadPath: (path) => {
            this.getFileList(this.path);
            this.activePath = path;
          },
        },
        props: {
          initPath: this.path == "" ? this.rootPath : this.path,
          isDir: isFolder,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.file-sel-modal {
  .breadcrumb {
    margin-bottom: 0.5rem;

    a {
      color: #0e9aff;
    }

    ul {
      overflow: hidden;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: flex-start;

      li {
        white-space: nowrap;

        div {
          max-width: 100%;
          padding: 0 0.5em;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        &:first-child {
          a {
            padding-right: 0;

            .icon {
              margin-left: 0;
            }
          }
        }

        &:last-child {
          min-width: 0;
          width: 100%;
        }

        &:nth-child(2) {
          &::before {
            content: "|";
          }
        }
      }
    }
  }

  .modal-card {
    width: 38rem;
    .modal-card-head {
      padding: 1rem 1.5rem;
    }
    .modal-card-body {
      display: flex;
      flex-direction: row;
      width: 100%;
      padding: 0 1rem;
      overflow-x: hidden;

      .left {
        flex-shrink: 0;
        border-right: #e4e4e4 1px solid;
        width: 12rem;
        height: 21.5rem;
        overflow-y: auto;
        padding-right: 1rem;
        margin-right: 1rem;

        .category {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;

          .category-title {
            padding-left: 0.5rem;
            font-size: 0.875rem;
            opacity: 0.8;
          }
          .no-data-desc {
            padding-left: 0.5rem;
            opacity: 0.5;
          }
        }
        :last-child {
          margin-bottom: 0;
        }

        .folder-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0.5rem 0.5rem;
          cursor: pointer;
          border-radius: 4px;

          img {
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 0.5rem;
          }
        }
        .folder-item:hover {
          background-color: #f0f0f0;
        }
        .folder-item-selected {
          background-color: #b6e0ff;
        }
        .folder-item-selected:hover {
          background-color: #b6e0ff;
        }
      }
      .right {
        flex-grow: 1;
        overflow-x: hidden;
      }
    }
  }

  .file-list {
    height: 20rem;
    overflow-x: hidden;
    overflow-y: auto;

    li {
      border-bottom: #e4e4e4 1px solid;
      line-height: 1.5em;
      border-radius: 4px;
      transition: background-color 0.2s;
      cursor: pointer;

      &:hover {
        background-color: #e0e0e0;
      }

      &.active {
        background-color: #b6e0ff;
      }
    }
  }
}
</style>
