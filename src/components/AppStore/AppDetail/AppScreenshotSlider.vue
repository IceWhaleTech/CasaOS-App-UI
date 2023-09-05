<!--
 * @Author: zhanghengxin ezreal.zhang@icewhale.org
 * @Date: 2023-08-31 15:40:59
 * @LastEditors: zhanghengxin ezreal.zhang@icewhale.org
 * @LastEditTime: 2023-09-05 10:59:02
 * @FilePath: /CasaOS-App-UI/src/components/AppStore/AppDetail/AppScreenshotSlider.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by IceWhale, All Rights Reserved.
-->
<template>
	<div class="is-relative">
		<swiper ref="infoSwiper" :options="swiperOptions"
				class="swiper swiper-responsive-breakpoints">
			<swiper-slide v-for="item in appDetailData.screenshot_link" :key="'sc'+item">
				<div class="gap">
					<b-image 
						class="app-screenshot"
						:src="item"
						:src-fallback="require('@/assets/img/app/swiper_placeholder.png')"
						placeholder ratio="16by9" @click.native="zoomScreenshot(item)">
					</b-image>
				</div>
			</swiper-slide>
		</swiper>

		<div :class="{'swiper-button-disabled':disPrev}" class="swiper-button-prev"
			@click="$refs.infoSwiper.$swiper.slidePrev()">
		</div>

		<div :class="{'swiper-button-disabled':disNext}" class="swiper-button-next"
			@click="$refs.infoSwiper.$swiper.slideNext()">
		</div>
	</div>
</template>

<script setup>
import { defineProps, defineExpose, ref, reactive, getCurrentInstance } from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

const {proxy} = getCurrentInstance();

const props = defineProps({
	appDetailData: {
		type: Object,
		default: () => {
		}
	},
});

const disPrev = ref(false);
const disNext = ref(false);

const swiperOptions =reactive( {
	loop: false,
	autoplay: true,
	spaceBetween: 24,
	breakpoints: {
		640: {
			slidesPerView: 1
		},
		768: {
			slidesPerView: 2
		},
		1366: {
			slidesPerView: 3
		}
	},
	// on: {
	// 	slideChangeTransitionStart: this.handleInfoSlide
	// },
})

defineExpose({
	disPrev,
	disNext,
	swiperOptions
});

function zoomScreenshot(img) {
	const VNode = proxy.$createElement(
		"div",
		{
			class: "modal-content",
		},
		[proxy.$createElement("img", { attrs: { src: img } })]
	);
	proxy.$buefy.modal.open({
		content: [VNode],
		customClass: "_zoom-screenshot",
		fullScreen: true,
		hasModalCard: true,
		destroyOnHide: true,
		animation: "zoom-in",
		canCancel: ["escape", "outside", "x"],
	});
}
</script>

<style lang="scss" scoped>
.app-screenshot{
	border-radius: 8px;
	border: 1px solid #cfcfcf;
	overflow: hidden;
}
.swiper-button-next, .swiper-rtl .swiper-button-prev {
	right: -20px;
	left: auto;
}

.swiper-button-prev,
.swiper-rtl .swiper-button-next {
	left: -20px;
	right: auto;
}

</style>
<style lang="scss">
//The underscore "_" here represents that it is only used in this context and needs to be placed in the modularized CSS later.
.modal._zoom-screenshot {
  .animation-content {
    display: flex;
    align-items: center;
  }
  .modal-content {
    width: auto;
    overflow: unset;
    img {
      max-width: 90vw;
      max-height: 90vh;
      border: 3px solid #ccc;
      border-radius: 1rem;
      box-shadow: 0 0 40px 0 rgba(255, 255, 255, 0.5);
    }
  }
  .modal-close {
    position: absolute;
    &::before,
    &::after {
      background: #fff;
    }
  }
}
</style>