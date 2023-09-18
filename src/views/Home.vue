<!--
 * @LastEditors: zhanghengxin ezreal.zhang@icewhale.org
 * @LastEditTime: 2023-09-15 16:44:45
 * @FilePath: /CasaOS-App-UI/src/views/Home.vue
  * @Description:
  *
  * Copyright (c) 2022 by IceWhale, All Rights Reserved.
  -->

<template>
	<!-- Content Start -->
	<div class="container">
		<!-- Apps Start -->
		<app-section ref="apps"></app-section>
		<!-- Apps End -->
	</div>
	<!-- Content End -->
</template>

<script>

import AppSection from '@/components/Apps/AppSection.vue';
import {nanoid}   from 'nanoid';

export default {
	name: "home-page",
	components: {
		AppSection,
	},
	created() {
		// 系统信息
		this.getHardwareInfo();
		this.$store.commit('SET_ACCESS_ID', nanoid());
	},
	methods: {
		/**
		 * @description: Get Hardware info and save to store
		 * @param {*}
		 * @return {*} void
		 */
		getHardwareInfo() {
			this.$api.sys.getUtilization().then(res => {
				if (res.data.success === 200) {
					this.hardwareInfoLoading = false
					this.$store.commit('SET_HARDWARE_INFO', res.data.data);
				}
			})
		},
	},
}
</script>
