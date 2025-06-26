const customStorageName = "new_app_ids";
// appId : container id
export default {
	data() {
		return {
			// newAppIds 现在通过 computed 从 store 获取，不再需要本地存储
		};
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
	},

	methods: {
		getNewAppIdsFromCustomStorage(callback) {
			this.$api.users
				.getCustomStorage(customStorageName)
				.then((res) => {
					const newAppIds = res.data.data || [];
					this.$store.commit("SET_NEW_APP_IDS", newAppIds);
					callback?.then?.();
				})
				.catch((err) => {
					console.log("getNewAppIdsFromCustomStorage error", err);
					callback?.catch?.();
				})
				.finally(() => {
					callback?.finally?.();
				});
		},
		setNewAppIdsToCustomStorage(callback) {
			this.$api.users
				.setCustomStorage(customStorageName, this.newAppIds)
				.then(() => {
					callback?.then?.();
				})
				.catch((err) => {
					console.log("setNewAppIdsToCustomStorage error", err);
					callback?.catch?.();
				})
				.finally(() => {
					callback?.finally?.();
				});
		},
		addIdToSessionStorage(appId) {
			this.addIdToNewAppIds(appId);
		},
		addIdToNewAppIds(appId, callback) {
			// THIS OPERATION SHOULD BE IN BACKEND!!!
			this.getNewAppIdsFromCustomStorage({
				then: () => {
					if (this.newAppIds.indexOf(appId) === -1) {
						this.$store.commit("ADD_NEW_APP_ID", appId);
						this.setNewAppIdsToCustomStorage({
							then: () => {
								callback?.then?.();
							},
							catch: (err) => {
								console.log("addIdToNewAppIds error", err);
								callback?.catch?.();
							},
						});
					}
				},
				catch: (err) => {
					console.log("addIdToNewAppIds error", err);
					callback?.catch?.();
				},
			});
		},
		removeIdFromSessionStorage(appId) {
			this.removeIdFromNewAppIds(appId);
		},
		removeIdFromNewAppIds(appId, callback) {
			// THIS OPERATION SHOULD BE IN BACKEND!!!
			this.getNewAppIdsFromCustomStorage({
				then: () => {
					if (this.newAppIds.indexOf(appId) !== -1) {
						this.$store.commit("REMOVE_NEW_APP_ID", appId);
						this.setNewAppIdsToCustomStorage({
							then: () => {
								callback?.then?.();
							},
							catch: (err) => {
								console.log("removeIdFromNewAppIds error", err);
								callback?.catch?.();
							},
						});
					}
				},
				catch: (err) => {
					console.log("removeIdFromNewAppIds error", err);
					callback?.catch?.();
				},
			});
		},

		hasNewTag(appId) {
			return this.newAppIds.indexOf(appId) > 0;
		},
	},
};
