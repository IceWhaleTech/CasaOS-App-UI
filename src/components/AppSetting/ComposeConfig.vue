<template>
  <section style="height: calc(100dvh - 12rem)">
    <b-tabs :value="firstAppName" class="has-text-full-03" style="height: 100%">
      <b-tab-item v-for="(service, key) in configData.services" :key="key" :label="key" :value="key"
        @click="current_service = key">
        <ValidationObserver :ref="key + 'valida'">
          <b-field grouped>
            <ValidationProvider v-slot="{ errors, valid }" name="Image" rules="required" class="is-flex-grow-1">
              <b-field :label="$t('Docker Image') + ' *'" :message="$t(errors)"
                :type="{ 'is-danger': errors[0], 'is-success': valid }" class="mb-3">
                <b-input :key="service.image" :readonly="state == 'update' || serviceStableVersion !== ''"
                  :value="getFirstField(service.image)" :placeholder="$t('e.g.,hello-world:latest')" @input="(V) => {
                    changeIcon(V);
                  }
                    " @blur="(E) =>
                    (service.image = service.image.split(':')[1]
                      ? E.target._value + ':' + service.image.split(':')[1]
                      : E.target._value)
                      "></b-input>
              </b-field>
            </ValidationProvider>

            <ValidationProvider v-slot="{ errors, valid }" name="Image1" rules="required">
              <b-field class="ml-2" :label="$t('Tag')" :message="$t(errors)"
                :type="{ 'is-danger': errors[0], 'is-success': valid }">
                <b-dropdown :value="getLateField(service.image)" aria-role="menu" trap-focus>
                  <template #trigger>
                    <b-input icon-pack="casa" icon-right="down-outline" class="w-48 is-flex-grow-1"
                      :value="getLateField(service.image)" @input="(V) => {
                        service.image = service.image.split(':')[0] + ':' + V;
                      }
                        ">
                    </b-input>
                  </template>
                  <b-dropdown-item key="latest" @click="() => {
                    service.image = service.image.split(':')[0] + ':latest';
                  }
                    ">
                    latest
                  </b-dropdown-item>
                  <b-dropdown-item key="stable" v-show="serviceStableVersion !== ''" @click="() => {
                    service.image = service.image.split(':')[0] + ':' + serviceStableVersion;
                  }
                    ">
                    stable({{ serviceStableVersion }})
                  </b-dropdown-item>
                </b-dropdown>
              </b-field>
            </ValidationProvider>
          </b-field>
          <ValidationProvider v-slot="{ errors, valid }" name="composeAppName" rules="required">
            <b-field :label="$t('App Name') + ' *'" :message="$t(errors)"
              :type="{ 'is-danger': errors[0], 'is-success': valid }">
              <b-input :placeholder="$t('e.g.,Your App Name')" :value="i18n(configData['x-casaos'].title)"
                @blur="(E) => (configData['x-casaos'].title.custom = E.target._value)"></b-input>
            </b-field>
          </ValidationProvider>

          <b-field v-if="key === firstAppName" :label="$t('Icon URL')">
            <p class="control">
              <span class="button is-static container-icon">
                <b-image :key="appIcon" :src="appIcon" :src-fallback="require('@/assets/img/app/default.svg')"
                  class="is-32x32" ratio="1by1"></b-image>
              </span>
            </p>
            <b-input v-model="configData['x-casaos'].icon" :placeholder="$t('Your custom icon URL')" expanded></b-input>
          </b-field>

          <b-field v-if="key === firstAppName" label="Web UI">
            <b-select v-model="configData['x-casaos'].scheme">
              <option value="http">http://</option>
              <option value="https">https://</option>
            </b-select>
            <b-input v-model="configData['x-casaos'].hostname" :placeholder="baseUrl" expanded></b-input>
            <b-autocomplete v-model="configData['x-casaos'].port_map" :data="bridgePorts(configData.services)"
              :open-on-focus="true" :placeholder="$t('Port')" class="has-colon" field="hostname"
              @select="(option) => (portSelected = option)"></b-autocomplete>
            <b-input v-model="configData['x-casaos'].index" :placeholder="'/index.html ' + $t('[Optional]')"
              expanded></b-input>
          </b-field>

          <b-field :label="$t('Network')">
            <b-select :value="service.network_mode || service?.networks?.[0]" expanded placeholder="Select"
              @input="(v) => patchNetworkValue(v, service)">
              <optgroup v-for="net in appendNetworks" :key="net.driver" :label="net.driver">
                <option v-for="(option, index) in net.networks" :key="option.name + index" :value="option.name">
                  {{ option.name }}
                </option>
              </optgroup>
            </b-select>
          </b-field>

          <ports v-if="showPorts(service)" v-model="service.ports" :ports_in_use="ports_in_use"
            :showHostPost="showHostPort(service)"></ports>

          <volumes-input-group v-model="service.volumes" :label="$t('Volumes')" name2="ZimaOS"
            :name1="i18n(configData['x-casaos'].title)" :message="$t('No volumes now, click “+” to add one.')"
            type="volume">
            <template #label-extra>
              <AppMigrationBtn />
            </template>
          </volumes-input-group>
          <env-input-group v-model="service.environment" :label="$t('Environment Variables')"
            :message="$t('No environment variables now, click “+” to add one.')">
          </env-input-group>
          <input-group :devices="service.devices" :label="$t('Devices')" name2="ZimaOS"
            :name1="i18n(configData['x-casaos'].title)" :message="$t('No devices now, click “+” to add one.')"
            type="device">
          </input-group>
          <commands-input v-model="service.command" :label="$t('Container Command')"
            :message="$t('No commands now, click “+” to add one.')">
          </commands-input>

          <b-field :label="$t('Privileged')">
            <b-switch v-model="service.privileged"></b-switch>
          </b-field>

          <b-field :label="$t('Memory Limit')">
            <vue-slider :max="totalMemory" :min="memory_min"
              :value="service.deploy.resources.limits.memory | duplexDisplay"
              @change="(v) => (service.deploy.resources.limits.memory = v)"></vue-slider>
          </b-field>

          <b-field :label="$t('CPU Shares')">
            <b-select v-model="service.cpu_shares" :placeholder="$t('Select')" expanded>
              <option :value="10">{{ $t("Low") }}</option>
              <option :value="50">{{ $t("Medium") }}</option>
              <option :value="90">{{ $t("High") }}</option>
            </b-select>
          </b-field>

          <b-field :label="$t('Restart Policy')">
            <b-select v-model="service.restart" :placeholder="$t('Select')" expanded>
              <option value="on-failure">on-failure</option>
              <option value="always">always</option>
              <option value="unless-stopped">unless-stopped</option>
            </b-select>
          </b-field>

          <b-field :label="$t('Container Capabilities (cap-add)')">
            <b-taginput ref="taginput" v-model="service.cap_add" :allow-new="false" :data="capArray"
              :open-on-focus="false" autocomplete @typing="getFilteredTags">
              <template slot-scope="props">
                {{ props.option }}
              </template>
              <template #empty> There are no items</template>
              <template #portSelected="props">
                <b-tag v-for="(tag, index) in props.tags" :key="index" :tabstop="false" closable
                  @close="$refs.taginput.removeTag(index, $event)">
                  {{ tag }}
                </b-tag>
              </template>
            </b-taginput>
          </b-field>

          <ValidationProvider v-slot="{ errors, valid }" name="ContainerName" rules="ContainerName">
            <b-field :label="$t('Container Name')" :message="$t(errors)"
              :type="{ 'is-danger': errors[0], 'is-success': valid && service.container_name }">
              <b-input v-model="service.container_name" :placeholder="$t('Name of app container')" value=""></b-input>
            </b-field>
          </ValidationProvider>
        </ValidationObserver>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import debounce from "lodash/debounce";
import axios from "axios";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import "@/plugins/vee-validate";
import Ports from "../forms/Ports.vue";
import EnvInputGroup from "../forms/EnvInputGroup.vue";
import CommandsInput from "../forms/CommandsInput.vue";
import InputGroup from "../forms/InputGroup.vue";
import VolumesInputGroup from "@/components/forms/VolumesInputGroup.vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import YAML from "yaml";
import lowerFirst from "lodash/lowerFirst";
import isNil from "lodash/isNil";
import { isNumber, isString } from "lodash/lang";
import cloneDeep from "lodash/cloneDeep";
import merge from "lodash/merge";
import i18n from "@/mixins/base/common-i18n";
import { nanoid } from "nanoid";
import find from "lodash/find";
import isArray from "lodash/isArray";
import AppMigrationBtn from './AppMigrationBtn.vue';

const data = [
  "AUDIT_CONTROL",
  "AUDIT_READ",
  "BLOCK_SUSPEND",
  "BPF",
  "CHECKPOINT_RESTORE",
  "DAC_READ_SEARCH",
  "IPC_LOCK",
  "IPC_OWNER",
  "LEASE",
  "LINUX_IMMUTABLE",
  "MAC_ADMIN",
  "MAC_OVERRIDE",
  "NET_ADMIN",
  "NET_BROADCAST",
  "PERFMON",
  "SYS_ADMIN",
  "SYS_BOOT",
  "SYS_MODULE",
  "SYS_NICE",
  "SYS_PACCT",
  "SYS_PTRACE",
  "SYS_RAWIO",
  "SYS_RESOURCE",
  "SYS_TIME",
  "SYS_TTY_CONFIG",
  "SYSLOG",
  "WAKE_ALARM",
];

const MAIN_APP_KEY = "main_app";

export default {
  name: "ComposeConfig.vue",
  components: {
    ValidationObserver,
    ValidationProvider,
    Ports,
    InputGroup,
    VolumesInputGroup,
    EnvInputGroup,
    CommandsInput,
    VueSlider,
    AppMigrationBtn,
  },
  mixins: [i18n],
  data() {
    return {
      current_service: MAIN_APP_KEY,
      baseUrl: "",
      portSelected: null,
      serviceStableVersion: "",
      configData: {
        services: {
          main_app: {
            image: "",
            mem_reservation: "0",
            network_mode: "bridge",
            cpu_shares: 10,
            restart: "unless-stopped",
            volumes: [],
            depends_on: [],
            ports: [],
            environment: [],
            devices: [],
            command: [],
            container_name: "",
            deploy: {
              resources: {
                limits: {
                  memory: "256",
                },
              },
            },
          },
        },
        "x-casaos": {
          hostname: "",
          scheme: "http",
          index: "/",
          port_map: "",

          author: "self",
          category: "self",
          icon: "",
          title: {
            custom: "",
          },
        },
      },
      // error info
      ports_in_use: { udp: [], tcp: [] },

      memory_min: 256,
      // other level_config
      volumes: [],
    };
  },
  props: {
    state: String,
    totalMemory: {
      type: Number,
      required: true,
    },
    /*networks STRUCTURE [
      {
        "driver": "host",
        "networks": [
          {
            "driver": "host",
            "id": "3014e1842267eb8aabea9e83b21ff95f36d988c519a51b107d86db9906501ba0",
            "name": "host"
          }
        ]
      },
      {
        "driver": "bridge",
        "networks": [
          {
            "driver": "bridge",
            "id": "AAA",
            "name": "AAA"
          },
          {
            "driver": "bridge",
            "id": "BBB",
            "name": "BBB"
          },
          {
            "driver": "bridge",
            "id": "CCC",
            "name": "bridge"
          }
        ]
      }
    ]*/
    networks: {
      type: Array,
      required: true,
    },
    capArray: {
      type: Array,
      required: true,
    },
    dockerComposeCommands: {
      type: String,
    },
    errInfo: {
      type: Object,
      default: {
        ports_in_use: { udp: [], tcp: [] },
      },
    },
  },
  watch: {
    current_service: {
      handler(val) {
        this.$emit("updateDockerComposeServiceName", val);
        if (this.configData.name && val) {
          this.$openAPI.appManagement.appStore
            .composeAppServiceStableTag(this.configData.name, val)
            .then((res) => {
              this.serviceStableVersion = res.data.data.tag;
            })
            .catch((e) => {
              this.serviceStableVersion = "";
            });
        } else {
          this.serviceStableVersion = "";
        }
      },
      immediate: true,
    },
    // Watch if configData changes
    configData: {
      handler(val, newVal) {
        if (this.state == "install") {
          localStorage.setItem("app_data", JSON.stringify(val));
        }
        this.outputConfigDataCommands(val);
      },
      deep: true,
    },
    // The parent component passes in data
    dockerComposeCommands: {
      handler(val) {
        if (val != null) {
          this.parseComposeYaml(val);
        }
      },
      immediate: true,
    },
    "configData.name": {
      handler(name = "") {
        this.$emit("updateMainName", name);
      },
      immediate: true,
    },
    "errInfo.ports_in_use": {
      handler(val) {
        this.ports_in_use = val;
      },
      immediate: true,
    },
  },
  computed: {
    firstAppName() {
      return Object.keys(this.configData.services)[0];
    },
    appIcon() {
      return this.configData["x-casaos"].icon;
    },
    appendNetworks() {
      return this.networks.map((item) => {
        if (item.driver == "bridge") {
          if (find(item.networks, ["name", this.firstAppName])) {
            return item;
          } else {
            return {
              driver: "bridge",
              networks: [
                {
                  driver: "bridge",
                  id: nanoid(),
                  name: this.firstAppName,
                },
                ...item.networks,
              ],
            };
          }
        } else {
          return item;
        }
      });
    },
  },
  created() {
    // Set Front-end base url
    this.baseUrl = `${document.domain}`;
    // update Service Name.
    this.$emit("updateDockerComposeServiceName", this.firstAppName);
  },

  methods: {
    // ****** migration !!! start !!!
    /**
     * @description: Get remote synchronization information
     * @param {*} function
     * @return {*} void
     */
    getAsyncData: debounce(function (name) {
      if (!name.length) {
        this.data = [];
        return;
      }
      this.isFetching = true;
      axios
        .get(`https://hub.docker.com/api/content/v1/products/search?source=community&q=${name}&page=1&page_size=4`)
        .then(({ data }) => {
          this.data = [];
          data.summaries.forEach((item) => this.data.push(item.name));
        })
        .catch((error) => {
          this.data = [];
          throw error;
        })
        .finally(() => {
          this.isFetching = false;
        });
    }, 500),

    /**
     * @description: Change App icon when image changed
     * @param {String} image
     * @return {*} void
     */
    changeIcon(image) {
      // set this.configData['x-casaos'].icon
      this.configData["x-casaos"].icon = this.getIconFromImage(image);
    },

    /**
     * @description: Get App icon form image
     * @param {*} image
     * @return {*}
     */
    getIconFromImage(image) {
      if (image == "") {
        return "";
      } else {
        let appIcon = image.split(":")[0].split("/").pop();
        return `https://icon.casaos.io/main/all/${appIcon}.png`;
      }
    },

    /**
     * @description:
     * @param {*} text
     * @return {*}
     */
    getFilteredTags(text) {
      return data.filter((option) => {
        return option.toString().indexOf(text.toUpperCase()) >= 0;
      });
    },

    async checkStepItem(ref) {
      let isValid = await ref.validate();
      return isValid;
    },

    /**
     * @description: Validate form async
     * @param {Object} ref ref of component
     * @return {Boolean}
     */
    async checkStep() {
      const promises = [];
      for (const servicesKey in this.configData.services) {
        promises.push(this.$refs[servicesKey + "valida"][0].validate());
      }
      return await Promise.all(promises);
    },

    /**
     * @description: Parse Import Docker Compose Commands
     * @return {Boolean}
     */
    parseComposeYaml(val) {
      try {
        const yaml = YAML.parse(val);
        if (!yaml) {
          return;
        }

        // 其他配置
        this.volumes = yaml?.volumes || {};

        // set main app name
        this.configData.name = yaml?.name || "";
        this.configData.services = {};
        // 删除掉原默认主应用。
        this.$delete(this.configData.services, MAIN_APP_KEY);
        // this.current_service = yaml["x-casaos"].main;
        this.current_service = Object.keys(yaml.services)[0];
        // 解析 services，并将其赋值到 configData.services中。

        // set top level x-casaos data
        this.configData["x-casaos"] = merge(this.configData["x-casaos"], yaml["x-casaos"]);

        for (const serviceKey in yaml.services) {
          this.$set(this.configData.services, serviceKey, this.parseComposeItem(yaml.services[serviceKey]));
        }


      } catch (error) {
        console.log(error);
      }
    },

    /*
     * formate for render
     * */
    parseComposeItem(composeServicesItemInput) {
      let composeServicesItem = {};
      // Image
      composeServicesItem.image = composeServicesItemInput.image;

      // Envs
      // @environment is an object or an array -- TO be arry.
      // value@item@environment for Boolean, String and Number
      if (composeServicesItemInput.environment) {
        let envArray = Array.isArray(composeServicesItemInput.environment)
          ? composeServicesItemInput.environment
          : Object.entries(composeServicesItemInput.environment);
        composeServicesItem.environment = envArray.map((item) => {
          let ii = typeof item === "object" ? Array.from(item) : item.split("=");
          return {
            host: ii[1]?.toString().replace(/"/g, "") ?? "",
            container: ii[0],
          };
        });
      } else {
        composeServicesItem.environment = [];
      }

      //Ports
      /*
      - "3000"
      - "3000-3005"
      - "8000:8000"
      - "9090-9091:8080-8081"
      - "49100:22"
      - "127.0.0.1:8001:8001"
      - "127.0.0.1:5000-5010:5000-5010"
      - "127.0.0.1:5000-5010:5000-5010/udp"
      - "6060:6060/udp"
      test_data : ["3000-3005", "8000:8000", "9090-9091:8080-8081", "49100:22", "127.0.0.1:8001:8001", "127.0.0.1:5000-5010:5000-5010","6060:6060/udp"]
      */
      composeServicesItem.ports = this.makeArray(composeServicesItemInput.ports).map((item) => {
        if (isString(item)) {
          const regex =
            /(^(?<host>(\d{1,3}\.){1,3}\d{1,3}):?)?(?<published>(\d{1,5})(-(\d{1,5}))?)(:(?<target>(\d{1,5})(-(\d{1,5}))?))?(\/(?<protocol>.*)$)?/;
          const match = item.match(regex).groups;
          const host_ip = match.host;
          const target = Number(match.target?.split("-")?.[0]);
          const published = match.published;
          const protocol = match.protocol || "tcp";

          return {
            host_ip,
            target,
            published,
            protocol,
          };
        } else {
          item.published.toString();
          return item;
        }
      });
      isNil(composeServicesItem.ports) && this.$set(composeServicesItem, "ports", []);

      // set first port to port_map
      if (composeServicesItem.ports.length > 0 && !this.configData["x-casaos"].port_map) {
        this.configData["x-casaos"].port_map = composeServicesItem.ports[0].published;
      }

      //Volume
      // https://yeasy.gitbook.io/docker_practice/compose/compose_file#volumes
      composeServicesItem.volumes = this.makeArray(composeServicesItemInput.volumes).map((item) => {
        if (isString(item)) {
          // 1\ replace variable in string for example: ${VOLUME_PATH}:/data
          // this.volumes 可能为空。
          Object.keys(this.volumes || {}).map((key) => {
            item = item.replace(key, this.volumes[key] || "");
          });
          // 2\ split string
          let ii = item.split(":");
          if (ii.length > 1) {
            return {
              type: "bind",
              target: ii[1],
              source: this.volumeAutoCheck(ii[1], ii[0], lowerFirst(this.configData["x-casaos"].title.en_us)),
            };
          } else {
            return {
              type: "bind",
              target: ii[0],
              source: this.volumeAutoCheck(ii[0], "", lowerFirst(this.configData["x-casaos"].title.en_us)),
            };
          }
        } else if (item) {
          // 1\ replace value in object for example: {type: 'bind', source: '${VOLUME_PATH}', target: '/data'}
          Object.keys(this.volumes || {}).map((key) => {
            item.source = item?.source.replace(key, this?.volumes[key] || "");
            item.target = item?.target;
          });

          return item;
        }
      });
      isNil(composeServicesItem.volumes) && this.$set(composeServicesItem, "volumes", []);

      // Devices
      composeServicesItem.devices = this.makeArray(composeServicesItemInput.devices).map((item) => {
        let ii = item.split(":");
        return {
          container: ii[1],
          host: ii[0],
        };
      });
      isNil(composeServicesItem.devices) && this.$set(composeServicesItem, "devices", []);

      //Network_mode
      const network_mode = composeServicesItemInput?.network_mode;
      const networks = composeServicesItemInput?.networks;
      if (networks) {
        composeServicesItem.networks = isArray(networks) ? networks : Object.keys(networks);
      } else if (network_mode == "bridge" || network_mode == undefined) {
        composeServicesItem.network_mode = "bridge";
      } else if (network_mode == "host") {
        composeServicesItem.network_mode = "host";
      } else if (network_mode == "physical") {
        composeServicesItem.network_mode = "macvlan";
      } else {
        composeServicesItem.network_mode = network_mode;
      }

      //hostname
      // configData.host_name = parsedInput.hostname != undefined ? parsedInput.hostname : ""

      // privileged
      // relation issue: https://github.com/IceWhaleTech/CasaOS/issues/1264
      // if privileged is undefined or false, set it to false.
      composeServicesItem.privileged = composeServicesItemInput.privileged === true;

      //cap-add
      if (composeServicesItemInput.cap_add != undefined) {
        composeServicesItem.cap_add = composeServicesItemInput.cap_add;
      } else {
        composeServicesItem.cap_add = [];
      }
      //Restart
      if (composeServicesItemInput.restart != undefined) {
        composeServicesItem.restart = composeServicesItemInput.restart;
      }
      composeServicesItem.restart =
        composeServicesItem.restart === "no" || !composeServicesItem.restart
          ? "unless-stopped"
          : composeServicesItem.restart;

      // command
      composeServicesItem.command = this.makeArray(composeServicesItemInput.command);

      // container_name
      composeServicesItem.container_name = composeServicesItemInput?.container_name || "";
      // this.$set(composeServicesItem, "container_name", composeServicesItemInput?.container_name);

      if (
        composeServicesItemInput.cpu_shares === 0 ||
        composeServicesItemInput.cpu_shares > 99 ||
        isNil(composeServicesItemInput.cpu_shares)
      ) {
        this.$set(composeServicesItem, "cpu_shares", 90);
      } else {
        this.$set(composeServicesItem, "cpu_shares", composeServicesItemInput.cpu_shares);
      }

      // 判断是否存在
      const memory = composeServicesItemInput?.deploy?.resources?.limits?.memory ?? 0;
      let newMemory = 0;
      if (memory) {
        // In the presence of a unit, detect whether there is a unit
        // Detect the absence of units
        if (isNumber(memory) && memory > 0) {
          newMemory = memory / 1024 / 1024;
        } else if (/[Mm]$/.test(memory)) {
          newMemory = memory.replace(/[Mm]/, "");
        } else if (/[Gg]$/.test(memory)) {
          newMemory = memory.replace(/[Gg]/, "") * 1024;
        }
        // Detect if the maximum value is exceeded
        if (newMemory > this.totalMemory) {
          newMemory = this.totalMemory;
        }
      }
      let ob = merge(composeServicesItemInput?.deploy, {
        resources: { limits: { memory: newMemory || this.totalMemory } },
      });
      this.$set(composeServicesItem, "deploy", ob);

      return composeServicesItem;
    },

    volumeAutoCheck(containerPath, hostPath, appName) {
      let finalHostPath = hostPath;
      const rootDir = "/DATA";
      const checkArray = [
        {
          keywords: ["config"],
          value: `/AppData/${appName}${containerPath}`,
        },
        {
          keywords: ["tvshows", "TV", "tv"],
          value: `/Media/TV Shows`,
        },
        {
          keywords: ["movies", "Movie", "movie"],
          value: `/Media/Movies`,
        },
        {
          keywords: ["Music", "music"],
          value: `/Media/Music`,
        },
        {
          keywords: ["download"],
          value: `/Downloads`,
        },
        {
          keywords: ["pictures", "photo"],
          value: `/Gallery`,
        },
        {
          keywords: ["media"],
          value: `/Media`,
        },
      ];

      checkArray.forEach((item) => {
        if (
          item.keywords.some((keywordsItem) => {
            return containerPath.includes(keywordsItem);
          })
        ) {
          finalHostPath = rootDir + item.value;
        }
      });
      return finalHostPath;
    },

    makeArray(foo) {
      const newArray = typeof foo == "string" ? [foo] : foo;
      return newArray == undefined ? [] : newArray;
    },

    // ****** migration !!! end !!!

    /*
     * follow this.configData
     * var : this.configData
     * */
    outputConfigDataCommands(val) {
      // configData tans to docker-compose.yml
      let ConfigData = cloneDeep(val);
      for (const servicesKey in val.services) {
        // 数据源
        let service = val.services[servicesKey];
        // 输出结果
        let outputService = ConfigData.services[servicesKey];
        // memory
        outputService.deploy.resources.limits.memory = service.deploy.resources.limits.memory + "M";
        outputService.devices = service.devices
          .filter((device) => {
            if (device.container || device.host) {
              return true;
            }
            return false;
          })
          .map((device) => {
            return `${device.host}:${device.container}`;
          });
        outputService.environment = service.environment
          .filter((env) => {
            if (env.container || env.host) {
              return true;
            }
            return false;
          })
          .map((env) => {
            return `${env.container}=${env.host}`;
          });
      }
      if (this.dockerComposeCommands) {
        let yaml = YAML.parse(this.dockerComposeCommands);
        Object.keys(yaml.services).map((key) => {
          yaml.services[key].ports = [];
          yaml.services[key].volumes = [];
          yaml.services[key].devices = [];
          yaml.services[key].cap_add = [];
          yaml.services[key].command = [];
          delete yaml.services[key]?.network_mode;
          delete yaml.services[key]?.networks;
        });

        ConfigData = merge(yaml, ConfigData);
      }

      // check
      // let DockerComposeCommands = YAML.stringify(ConfigData)
      // this.$api.apps.checkPort().then(res => {
      // 	this.ports_in_use = res.data?.data || {}
      // })

      this.$emit("updateDockerComposeCommands", YAML.stringify(ConfigData));
    },

    showPorts(service) {
      if (service.networks) {
        return true;
      }
      if (!service?.network_mode) {
        return true;
      }
      // 存在
      if (service.network_mode.toLowerCase().indexOf("macvlan") > -1 || service.network_mode.indexOf("host") > -1) {
        return false;
      } else {
        return true;
      }
    },
    showHostPort(service) {
      if (!service.network_mode) {
        return true;
      }
      // 存在
      if (service.network_mode.indexOf("host") > -1) {
        return false;
      } else {
        return true;
      }
    },
    bridgePorts(services) {
      /*
       - "3000"
       - "3000-3005"
       - "127.0.0.1:8001"
       - "127.0.0.1:5000-5010"
       */

      let published,
        result = [];
      for (let key in services) {
        let service = services[key];
        service.ports.map(function (item) {
          // TODO 需要健壮一下
          const TEMPORARY_PORT_INFORMATION = item.published?.toString()?.split(":");
          if (TEMPORARY_PORT_INFORMATION.length > 1) {
            published = TEMPORARY_PORT_INFORMATION[1];
          } else {
            published = TEMPORARY_PORT_INFORMATION[0];
          }
          published = published.split("-");

          if (published.length > 1) {
            let start = published[0];
            let end = published[1];
            for (let i = start; i <= end; i++) {
              result.push(i);
            }
          } else {
            result.push(published[0]);
          }
        });
      }
      return result;
    },
    // unused
    filteredBeidgePort(service) {
      return this.bridgePorts(service).filter((port) => {
        return port.host.indexOf(service.port_map) >= 0;
      });
    },
    // networks or network_mode
    patchNetworkValue(value, service) {
      if (value === "host" || value === "bridge") {
        this.$delete(service, "networks");
        this.$set(service, "network_mode", value);
      } else {
        this.$delete(service, "network_mode");
        this.$set(service, "networks", [value]);
        const tempNetworks = merge(this.configData?.networks || {}, { [value]: { name: value } });
        this.$set(this.configData, "networks", tempNetworks);
      }
    },

    getFirstField(image) {
      return image?.split(":")[0];
    },

    getLateField(image) {
      return image?.split(":")[1];
    },
  },
  filters: {
    duplexDisplay(val) {
      // units is M
      return val < 256 ? 256 : val;
    },
  },
};
</script>
<style lang="scss">
.app-card .tab-content {
  @apply [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/30;
  @apply pr-7 pl-6 overflow-x-hidden overflow-y-auto;
  height: calc(100% - 2.75rem);
}
</style>
<style lang="scss" scoped>
.b-tabs {
  margin-bottom: 0;

  ::v-deep .tabs {
    padding: 0 1.5rem;
    border-bottom: 1px solid hsla(208, 16%, 94%, 1);

    ul {
      border: 0;

      li {
        font-size: 0.875rem;

        a {
          padding-top: 0.75rem;
          padding-bottom: 5px;
        }
      }
    }
  }

}
</style>
