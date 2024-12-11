<template>
  <div class="modal-card">
    <!-- Modal-Card Header Start -->
    <header class="modal-card-head !bg-gray-100">
      <div class="is-flex-grow-1">
        <h3 class="_title is-5">{{ $t('Import') }}</h3>
      </div>
      <div>
        <button class="delete" type="button" @click="$emit('close')" />
      </div>
    </header>
    <!-- Modal-Card Header End -->
    <!-- Modal-Card Body Start -->
    <section class="modal-card-body">
      <b-tabs v-model="activeTab" :animated="false">
        <b-tab-item label="Docker Compose">
          <b-field :message="errors" :type="{ 'is-danger': !!errors }">
            <b-input v-model="dockerComposeCommands" ref="dockerComposeCommands"
              :placeholder="$t('Notice: If there are multiple services, only the first set can be analyzed correctly')"
              class="import-area" type="textarea"></b-input>
          </b-field>

          <b-upload ref="importUpload" v-model="dropFiles" accept=".yaml,.yml" drag-drop expanded @input="onSelect"
            class="mb-2">
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon :icon="uploadIcon" custom-size="is-size-2" size="is-40"></b-icon>
                </p>
                <p class="has-text-full-03">{{ dropText }}</p>
              </div>
            </section>
          </b-upload>

        </b-tab-item>
        <b-tab-item label="Docker CLI">
          <b-field :message="errors" :type="{ 'is-danger': !!errors }">
            <b-input v-model="dockerCliCommands" ref="dockerCliCommands" class="import-area" custom-class="!h-[244px]"
              type="textarea"></b-input>
          </b-field>
        </b-tab-item>

        <b-tab-item v-if="false" :label="$t('AppFile')">
          <b-field :message="errors" :type="{ 'is-danger': !!errors }">
            <b-upload ref="importUpload" v-model="dropFiles" accept="application/json" drag-drop expanded
              @input="onSelect">
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon :icon="uploadIcon" size="is-large"></b-icon>
                  </p>
                  <p>{{ dropText }}</p>
                </div>
              </section>
            </b-upload>
          </b-field>
        </b-tab-item>

      </b-tabs>

    </section>
    <!-- Modal-Card Body End -->
    <!-- Modal-Card Footer Start-->
    <footer class="modal-card-foot is-flex is-align-items-center">
      <div class="is-flex-grow-1 has-text-full-04">

      </div>
      <div>
        <b-button :label="$t('Submit')" rounded type="is-primary" @click="emitSubmit" />
      </div>
    </footer>
    <!-- Modal-Card Footer End -->
  </div>
</template>

<script>

import { parse, stringify } from "yaml"
import Composerize from "composerize";

export default {
  data() {
    return {
      activeTab: 0,
      file: {},
      dropFiles: {},
      dockerCliCommands: "",
      dockerComposeCommands: "",
      appFileLoaded: false,
      errors: "",
      dropText: this.$t('Drop your Docker Compose file here or click to upload'),
      uploadIcon: "upload",
    }
  },
  props: {
    // initData: Object,
    netWorks: Array,
    oriNetWorks: Array,
    deviceMemory: Number
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.dockerComposeCommands.focus()
    })
  },
  watch: {
    activeTab: {
      handler(val) {
        if (val === 0) {
          this.$refs.dockerComposeCommands.focus()
        } else if (val === 1) {
          this.$refs.dockerCliCommands.focus()
        }
      },
      deep: true
    }
  },
  methods: {
    /**
     * @description: Emit Event to tell parent Update
     * @param {*}
     * @return {*} void
     */
    emitSubmit() {
      switch (this.activeTab) {
        case 0:
          this.dockerComposeCommands = this.addTitleToYaml(this.dockerComposeCommands)
          this.errors = ''
          this.$emit('update', this.dockerComposeCommands)
          this.$emit('close')
          break
        case 1: {
          const cleanedCommand = this.dockerCliCommands.replace(/`#.*?`/g, '').replace(/#.*$/gm, '').trim()
          this.dockerComposeCommands = Composerize(cleanedCommand)
          this.dockerComposeCommands = this.addTitleToYaml(this.dockerComposeCommands)
          this.$emit('update', this.dockerComposeCommands)
          this.$emit('close')
          break
        }
        case 2:
          if (this.appFileLoaded) {
            this.errors = ''
            this.$emit('close')
          }
          else {
            this.errors = this.$t('Please import a valid App file')
            this.parseError = true
          }
          break
      }
    },

    addTitleToYaml(yaml) {
      const yamlObj = parse(yaml)
      if (yamlObj['x-casaos'] !== undefined)
        return yaml

      const serviceName = Object.keys(yamlObj.services)[0]
      if (serviceName === undefined)
        return stringify(yamlObj)
      yamlObj['x-casaos'] = {}
      yamlObj['x-casaos'].title = {}
      yamlObj['x-casaos'].title.en_us = serviceName
      yamlObj['x-casaos'].icon = `https://icon.casaos.io/main/all/${serviceName}.png`
      return stringify(yamlObj)
    },

    volumeAutoCheck(containerPath, hostPath, appName) {
      let finalHostPath = hostPath
      const rootDir = "/DATA"
      const checkArray = [
        {
          keywords: ["config"],
          value: `/AppData/${appName}${containerPath}`
        },
        {
          keywords: ["tvshows", "TV", "tv"],
          value: `/Media/TV Shows`
        },
        {
          keywords: ["movies", "Movie", "movie"],
          value: `/Media/Movies`
        },
        {
          keywords: ["Music", "music"],
          value: `/Media/Music`
        },
        {
          keywords: ["download"],
          value: `/Downloads`
        },
        {
          keywords: ["pictures", "photo"],
          value: `/Gallery`
        },
        {
          keywords: ["media"],
          value: `/Media`
        }

      ]

      checkArray.forEach(item => {
        if (item.keywords.some(keywordsItem => {
          return containerPath.includes(keywordsItem)
        })) {
          finalHostPath = rootDir + item.value

        }
      })

      return finalHostPath
    },

    /**
     * @description: Make String to Array
     * @param {*}
     * @return {Array}
     */
    makeArray(foo) {
      const newArray = (typeof (foo) == "string") ? [foo] : foo
      return (newArray == undefined) ? [] : newArray
    },

    checkYAML() {
      let yaml = parse(this.dockerComposeCommands);
      if (!(yaml?.name in yaml.services)) {
        this.errors = this.$t("Please select a service name in the \"services\" and add it as the value of the top-level attribute \"name\" to serve as the main application.");
        return false
      }
      return true
    },

    onSelect(val) {
      const _this = this
      const reader = new FileReader();
      if (typeof FileReader === "undefined") {
        this.$buefy.toast.open({
          duration: 3000,
          message: this.$t('Your browser does not support file reading.'),
          type: 'is-danger'
        })
        return;
      }
      reader.readAsText(val)
      reader.onload = function () {
        _this.dockerComposeCommands = this.result
      }
    },

    clearInput() {
      this.uploadIcon = "upload"
      this.dropText = this.$t('Drop your Docker Compose file here or click to upload')
      this.appFileLoaded = false
      this.$refs.importUpload.clearInput()
      this.$buefy.toast.open({
        duration: 3000,
        message: this.$t('This is not a valid json file.'),
        type: 'is-danger'
      })
      this.appFileLoaded = false
    },

    getNetworkModel(netName) {
      const network = this.oriNetWorks.filter(net => {
        return net.name == netName
      })
      return (network.length > 0) ? network[0].name : this.oriNetWorks[0].name

    },
  },
}
</script>

<style lang="scss" scoped>
// layout
.modal-card {
  width: 960px;
}

@media screen and (max-width: 960px) {
  .modal-card {
    width: 100%;
  }
}

.import-area {
  .textarea {
    max-height: 40em;
    min-height: 173px;
  }
}

.control {
  min-height: 7.25rem;

  .section {
    padding: 0.84375rem;
  }
}
</style>