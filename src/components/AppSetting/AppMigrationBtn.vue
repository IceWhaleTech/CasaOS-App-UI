<template>
  <b-tooltip type="is-black" position="is-right" :label="$t('Migrate user data to another space.')">
    <b-button
      rounded
      type="is-info is-light"
      size="is-small"
      @click="
        $messageBus('mircoapp_communicate', {
          action: 'open',
          peerType: 'settings',
          name: 'icewhale_settings',
          routerPath: '/migration',
        })
      "
    >
      {{ $t("Migration") }}
    </b-button>
  </b-tooltip>
</template>

<script>
export default {
  name: "AppMigrationBtn",
};
</script>
