<template>
  <fullscreen :class="{ 'mt-4': !fullscreen }" :fullscreen.sync="fullscreen" :page-only="true" :teleport="true"
    class="pt-2 pb-2 pl-2 fullScreen fdark-bg" @change="onWindowResize">
    <a class="fullscreen-button" @click="toggleFullScreen">
      <b-icon :icon="buttonIcon"></b-icon>
    </a>
    <div ref="logs" id="logs" :class="[fullscreen ? 'fullheight' : 'sheight']" class="logs scrollbars">
      <div contenteditable v-html="data"></div>
    </div>
  </fullscreen>

</template>

<script>
export default {
  name: "logs-card",
  data() {
    return {
      fullscreen: false,
      state: true
    }
  },
  props: {
    data: String,
  },
  computed: {
    buttonSzie() {
      return this.$store.state.device == "mobile" ? 'is-small' : ''
    },
    buttonIcon() {
      return this.fullscreen ? "fullscreen-exit" : "fullscreen"
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize)
  },
  created() {
    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();
  },
  mounted() {
    this.onWindowResize();
  },
  methods: {

    toggleFullScreen() {
      this.fullscreen = !this.fullscreen
    },
    onWindowResize() {
      this.$nextTick(() => {
        this.$refs.logs.scrollTop = this.$refs.logs.scrollHeight;
      });

    },
    getTop(e) {
      var offset = e.offsetTop;
      if (e.offsetParent != null) offset += this.getTop(e.offsetParent);
      return offset;
    },
    active(state) {
      this.state = state;
      if (state) {
        this.onWindowResize();
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.logs {
  white-space: pre-wrap;
  color: #fff;
  font-size: 13px;
  font-family: 'Monaco', 'Consolas', monospace !important;
  padding: 0 0.25rem;
  line-height: 1.5em;
  overflow-y: auto;
  overflow-x: hidden;

  >div {
    outline: none;
  }

  &.fullheight {
    height: 100%;
  }

  &.sheight {
    height: 35rem;
  }
}
</style>