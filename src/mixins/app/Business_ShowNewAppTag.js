
const customStorageName = 'new_app_ids';
// appId : container id
export default {
	data() {
		return {
			newAppIds: [],
		}
	},
	mounted() {
		this.getNewAppIdsFromCustomStorage();
	},
	methods: {
		// getSessionStorageOutputArray() {
		// 	// THIS FUNCTION IS DEPRECATED!!!
		// 	// USE getNewAppIdsFromCustomStorage FUNCTION INSTEAD!!!
		// 	let newAppTag = sessionStorage.getItem('newAppTag');
		// 	if (newAppTag === null) {
		// 		return [];
		// 	} else {
		// 		return JSON.parse(newAppTag);
		// 	}
		// },
		getNewAppIdsFromCustomStorage(callback) {
			this.$api.users.getCustomStorage(customStorageName)
				.then((res) => {
					this.newAppIds = res.data.data || [];
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
			this.$api.users.setCustomStorage(customStorageName, this.newAppIds)
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
			// THIS FUNCTION IS DEPRECATED!!!
			// USE addIdToNewAppIds FUNCTION INSTEAD!!!

			// let newAppTag = this.getSessionStorageOutputArray('newAppTag');
			// if (newAppTag.length > 0) {
			// 	if (newAppTag.indexOf(appId) === -1) {
			// 		newAppTag.push(appId);
			// 	}
			// } else {
			// 	newAppTag = [appId];
			// }
			// this.newAppIds = newAppTag;
			// return sessionStorage.setItem('newAppTag', JSON.stringify(newAppTag));

			this.addIdToNewAppIds(appId);
		},
		addIdToNewAppIds(appId, callback) {
			// THIS OPERATION SHOULD BE IN BACKEND!!!
			this.getNewAppIdsFromCustomStorage({
				then: () => {
					if (this.newAppIds.indexOf(appId) === -1) {
						this.newAppIds.push(appId);
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
				}
			});
		},
		removeIdFromSessionStorage(appId) {
			// THIS FUNCTION IS DEPRECATED!!!
			// USE removeIdFromNewAppIds FUNCTION INSTEAD!!!

			// let newAppTag = this.getSessionStorageOutputArray('newAppTag');
			// if (newAppTag.length > 0) {
			// 	if (newAppTag.indexOf(appId) !== -1) {
			// 		newAppTag.splice(newAppTag.indexOf(appId), 1);
			// 	}
			// }
			// this.newAppIds = newAppTag;
			// sessionStorage.setItem('newAppTag', JSON.stringify(newAppTag));

			this.removeIdFromNewAppIds(appId);
		},
		removeIdFromNewAppIds(appId, callback) {
			// THIS OPERATION SHOULD BE IN BACKEND!!!
			this.getNewAppIdsFromCustomStorage({
				then: () => {
					if (this.newAppIds.indexOf(appId) !== -1) {
						this.newAppIds.splice(this.newAppIds.indexOf(appId), 1);
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
				}
			});
		},
		// getIdFromSessionStorage() {
		// 	// THIS FUNCTION IS DEPRECATED!!!
		// 	// USE getNewAppIdsFromCustomStorage FUNCTION INSTEAD!!!
		// 	this.getNewAppIdsFromCustomStorage({
		// 		finally: () => {
		// 			return this.newAppIds;
		// 		},
		// 	});
		// },
		hasNewTag(appId) {
			return this.newAppIds.indexOf(appId) !== -1;
		},
	}
}