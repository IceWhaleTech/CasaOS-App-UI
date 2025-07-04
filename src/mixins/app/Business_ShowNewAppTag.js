const STORAGE_KEYS = {
	NEW_APP_IDS: "new_app_ids",
	TIPS_STATE: "tips_state"
};

export default {
	data() {
		return {};
	},

	computed: {
		newAppIds: {
			get() {
				return this.$store.state.newAppIds;
			},
			set(value) {
				this.$store.commit("SET_NEW_APP_IDS", value);
			},
		},
		tipsState: {
			get() {
				return this.$store.state.tipsState;
			},
			set(value) {
				this.$store.commit("SET_TIPS_STATE", value);
			},
		},
	},

	methods: {
		// ============ 通用存储操作方法 ============
		async getFromCustomStorage(storageKey) {
			try {
				const res = await this.$api.users.getCustomStorage(storageKey);
				return res.data.data || [];
			} catch (err) {
				console.error(`获取自定义存储 ${storageKey} 失败:`, err);
				return [];
			}
		},

		async setToCustomStorage(storageKey, data) {
			try {
				await this.$api.users.setCustomStorage(storageKey, data);
				return true;
			} catch (err) {
				console.error(`设置自定义存储 ${storageKey} 失败:`, err);
				return false;
			}
		},

		// ============ 新应用ID管理 ============
		async getNewAppIdsFromCustomStorage(callback) {
			try {
				const newAppIds = await this.getFromCustomStorage(STORAGE_KEYS.NEW_APP_IDS);
				this.$store.commit("SET_NEW_APP_IDS", newAppIds);
				callback?.then?.();
			} catch (err) {
				console.error("获取新应用ID失败:", err);
				callback?.catch?.(err);
			} finally {
				callback?.finally?.();
			}
		},

		async setNewAppIdsToCustomStorage(callback) {
			try {
				const success = await this.setToCustomStorage(STORAGE_KEYS.NEW_APP_IDS, this.newAppIds);
				if (success) {
					callback?.then?.();
				} else {
					callback?.catch?.();
				}
			} catch (err) {
				console.error("设置新应用ID失败:", err);
				callback?.catch?.(err);
			} finally {
				callback?.finally?.();
			}
		},

		// 添加应用ID到新应用列表
		async addIdToNewAppIds(appId, callback) {
			if (!appId) {
				console.warn("应用ID不能为空");
				callback?.catch?.();
				return;
			}

			try {
				await this.getNewAppIdsFromCustomStorage({
					then: async () => {
						// 修复逻辑：如果不在列表中才添加
						if (!this.newAppIds.includes(appId)) {
							this.$store.commit("ADD_NEW_APP_ID", appId);
							await this.setNewAppIdsToCustomStorage({
								then: () => callback?.then?.(),
								catch: (err) => {
									console.error("添加新应用ID失败:", err);
									callback?.catch?.(err);
								}
							});
						} else {
							callback?.then?.();
						}
					},
					catch: (err) => {
						console.error("获取新应用ID失败:", err);
						callback?.catch?.(err);
					}
				});
			} catch (err) {
				console.error("添加新应用ID操作失败:", err);
				callback?.catch?.(err);
			}
		},

		// 从新应用列表中移除应用ID
		async removeIdFromNewAppIds(appId, callback) {
			if (!appId) {
				console.warn("应用ID不能为空");
				callback?.catch?.();
				return;
			}

			try {
				await this.getNewAppIdsFromCustomStorage({
					then: async () => {
						if (this.newAppIds.includes(appId)) {
							this.$store.commit("REMOVE_NEW_APP_ID", appId);
							await this.setNewAppIdsToCustomStorage({
								then: () => callback?.then?.(),
								catch: (err) => {
									console.error("移除新应用ID失败:", err);
									callback?.catch?.(err);
								}
							});
						} else {
							callback?.then?.();
						}
					},
					catch: (err) => {
						console.error("获取新应用ID失败:", err);
						callback?.catch?.(err);
					}
				});
			} catch (err) {
				console.error("移除新应用ID操作失败:", err);
				callback?.catch?.(err);
			}
		},

		// 兼容性方法（保持向后兼容）
		addIdToSessionStorage(appId) {
			this.addIdToNewAppIds(appId);
		},

		removeIdFromSessionStorage(appId) {
			this.removeIdFromNewAppIds(appId);
		},

		// 检查是否有新标签
		hasNewTag(appId) {
			return this.newAppIds.includes(appId);
		},

		// ============ 提示状态管理 ============
		async getTipsStateFromCustomStorage(callback) {
			try {
				const tipsState = await this.getFromCustomStorage(STORAGE_KEYS.TIPS_STATE);
				this.$store.commit("SET_TIPS_STATE", tipsState);
				callback?.then?.();
			} catch (err) {
				console.error("获取提示状态失败:", err);
				callback?.catch?.(err);
			} finally {
				callback?.finally?.();
			}
		},

		async setTipsStateToCustomStorage(callback) {
			try {
				const success = await this.setToCustomStorage(STORAGE_KEYS.TIPS_STATE, this.tipsState);
				if (success) {
					callback?.then?.();
				} else {
					callback?.catch?.();
				}
			} catch (err) {
				console.error("设置提示状态失败:", err);
				callback?.catch?.(err);
			} finally {
				callback?.finally?.();
			}
		},

		// 添加应用ID到提示状态
		async addIdToTipsState(appId, callback) {
			if (!appId) {
				console.warn("应用ID不能为空");
				callback?.catch?.();
				return;
			}

			if (!this.tipsState.includes(appId)) {
				this.tipsState.push(appId);
				await this.setTipsStateToCustomStorage({
					then: () => callback?.then?.(),
					catch: (err) => {
						console.error("添加提示状态失败:", err);
						callback?.catch?.(err);
					}
				});
			} else {
				callback?.then?.();
			}
		},

		// 从提示状态中移除应用ID
		async removeIdFromTipsState(appId, callback) {
			if (!appId) {
				console.warn("应用ID不能为空");
				callback?.catch?.();
				return;
			}

			if (this.tipsState.includes(appId)) {
				// 使用 store mutation 而不是直接操作数组
				this.$store.commit("REMOVE_TIPS_STATE", appId);
				await this.setTipsStateToCustomStorage({
					then: () => callback?.then?.(),
					catch: (err) => {
						console.error("移除提示状态失败:", err);
						callback?.catch?.(err);
					}
				});
			} else {
				callback?.then?.();
			}
		},

		// 检查是否需要显示提示
		hasTips(appId) {
			return !this.tipsState.includes(appId);
		},
	},
};
