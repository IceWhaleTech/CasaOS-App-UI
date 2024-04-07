<template>
	<section :class="{ _hideOverflow: !isCasa }" class="modal-card-body pt-3">
		<!--	导入"已存在的容器"，进行初始化操作	-->
		<ValidationObserver ref="containerValida">
			<ValidationProvider v-slot="{ errors, valid }" name="appName" rules="required">
				<b-field
					:label="$t('App name') + ' *'"
					:message="$t(errors)"
					:type="{ 'is-danger': errors[0], 'is-success': valid }"
				>
					<b-input
						v-model="settingData.label"
						:placeholder="$t('Your custom App Name')"
						maxlength="40"
					></b-input>
				</b-field>
			</ValidationProvider>

			<b-field :label="$t('Icon URL')">
				<p class="control">
					<span class="button is-static container-icon">
						<b-image
							:key="settingData.icon"
							:src="settingData.icon"
							:src-fallback="require('@/assets/img/app/default.svg')"
							class="is-32x32"
							ratio="1by1"
						></b-image>
					</span>
				</p>
				<b-input v-model="settingData.icon" :placeholder="$t('Your custom icon URL')" expanded></b-input>
			</b-field>

			<b-field label="Web UI">
				<b-select v-model="settingData.protocol">
					<option value="http">http://</option>
					<option value="https">https://</option>
				</b-select>
				<b-input v-model="settingData.host" :placeholder="this.$baseHostname" expanded></b-input>
				<b-autocomplete
					v-model="settingData.port_map"
					:data="
						(() => {
							return (settingData.ports || []).map((item) => {
								return item.host;
							});
						})()
					"
					:open-on-focus="true"
					:placeholder="$t('Port')"
					class="has-colon"
					field="hostname"
					@select="(option) => (settingData.port_map = option)"
				></b-autocomplete>
				<b-input
					v-model="settingData.index"
					:placeholder="'/index.html ' + $t('[Optional]')"
					expanded
				></b-input>
			</b-field>
		</ValidationObserver>
	</section>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
/* import { defineProps }                            from 'vue';
defineProps({
	settingData: {
		type: Object,
		default: () => {
			return {
				label: "",
				icon: "",
				protocol: "http",
				host: "",
				port_map: "",
				index: "",
			};
		},
	},
	isCasa: {
		type: Boolean,
		default: false,
	},
});
async function updateAppHost() {
	try {
		const is_validate = await $refs.containerValida.validate();
		if (is_validate === true) {
			const result = await $api.container.update(id, settingData);
			if (result.data.success == 200) {
				return true;
			} else {
				return new Error(result.data.message.data);
			}
		}
	} catch (error) {
		return error;
	}
} */
export default {
	name: "AppHost",
	components: {
		ValidationObserver,
		ValidationProvider,
	},
	props: {
		settingData: {
			type: Object,
			default: () => {
				return {
					label: "",
					icon: "",
					protocol: "http",
					host: "",
					port_map: "",
					index: "",
				};
			},
		},
		isCasa: {
			type: Boolean,
			default: false,
		},
		appId: {
			type: String,
			required: true,
		},
	},
	methods: {
		async updateAppHost() {
			try {
				console.log(1);
				const is_validate = await this.$refs.containerValida.validate();
				if (is_validate === true) {
					const result = await this.$api.container.update(this.appId, this.settingData);
					if (result.data.success == 200) {
						console.log(2);
					} else {
						return new Error(result.data.message.data);
					}
				}
			} catch (error) {
				return error;
			}
		},
	},
};
</script>
