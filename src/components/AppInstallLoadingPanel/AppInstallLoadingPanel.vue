<template>
  <div :class="{ '_hideOverflow': !isCasa }" class="pt-3 modal-card-body _b-line">
    <div class="mb-5 installing-warpper">
      <div class="is-flex is-align-items-center is-justify-content-center">
        <img :src="require('@/assets/img/loading/waiting.svg')" alt="pending" class="is-64x64" />
      </div>
      <b-progress :value="totalPercentage" format="percent" show-value type="is-primary"></b-progress>
      <h3 :class="currentInstallAppTextClass" class="title is-6 has-text-centered" style="height: 20px"
        v-html="currentInstallAppText"></h3>
    </div>
  </div>
</template>

<script setup>

defineProps({
  isCasa: Boolean,
  totalPercentage: Number,
  currentInstallAppText: String,
  currentInstallAppTextClass: String,
})
</script>