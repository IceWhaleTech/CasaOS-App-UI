<template>
	<div class="modal-card">
    <!-- Modal-Card Header Start -->
    <header class="modal-card-head !bg-gray-100">
      <div class="is-flex-grow-1">
        <h3 class="_title is-5">{{ serviceName || appName }}</h3>
      </div>
      <div>
        <button class="delete" type="button" @click="$emit('close')" />
      </div>
    </header>
    <!-- Modal-Card Header End -->

		<!-- Modal-Card Body Start -->
		<section class="modal-card-body ">
			<div class="is-flex-grow-1">
				<b-tabs :animated="false" @input="onInput">
					<b-tab-item :label="$t('Terminal')" value="terminal">
						<terminal-card ref="terminal" :initWsUrl="wsUrl"></terminal-card>
					</b-tab-item>
					<b-tab-item :label="$t('Logs')" value="logs">
						<logs-card ref="logs" :data="logData"></logs-card>
					</b-tab-item>
				</b-tabs>

			</div>

		</section>
		<!-- Modal-Card Body End -->

		<b-loading v-model="isLoading" :is-full-page="false"></b-loading>
	</div>
</template>

<script>
import TerminalCard from '@/components/logsAndTerminal/TerminalCard.vue';
import LogsCard     from '@/components/logsAndTerminal/LogsCard.vue'

export default {
	name: 'app-terminal-panel',
	components: {
		TerminalCard,
		LogsCard
	},
	data() {
		return {
			isLoading: false,
			wsUrl: `${this.$wsProtocol}//${this.$baseURL}/v1/container/${this.appid}/terminal?token=${this.$store.state.access_token}`,
			logData: "",
			timer: "",
		}
	},
	props: {
		appid: String,
		appName: String,
		serviceName: String,
	},
	mounted() {
		this.getLogs();
		this.timer = setInterval(() => {
			this.getLogs();
		}, 1000 * 5);
	},
	methods: {
		getLogs() {
			// OLD:: this.$api.container.getLogsV2(this.appid)
			this.$openAPI.appManagement.compose.composeAppLogs(this.appName, 200).then((res) => {
				if (res.status == 200) {
					this.logData = res.data.data
				}
			}).catch((err) => {
				console.log('$openAPI.appManagement.compose.composeAppLogs', err)
			})
		},
		onInput(e) {
			if (e == "terminal") {
				this.$refs.terminal.active(true)
				this.$refs.logs.active(false)
			} else {
				this.$refs.terminal.active(false)
				this.$refs.logs.active(true)
			}
		}
	},
	destroyed() {
		clearInterval(this.timer);
	}
}
</script>

<style>
</style>
