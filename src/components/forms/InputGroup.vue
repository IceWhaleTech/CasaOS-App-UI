<template>
  <div class="mb-5">
    <div class="mb-2 field is-flex is-align-items-center">
      <label class="mb-0 label is-flex-grow-1">{{ label }}</label>
      <b-button icon-left="plus" rounded size="is-small" @click="addItem">{{ $t('Add') }}</b-button>
    </div>
    <div v-if="items.length == 0" class="mb-5 is-flex is-align-items-center info">
      <b-icon class="mr-2 " icon="information" size="is-small"></b-icon>
      <span>
        {{ message }}
      </span>
    </div>

    <div v-for="(item, index) in items" :key="'port' + index" class="port-item">
      <b-icon class="is-clickable" icon="close" size="is-small" @click.native="removeItem(index)"></b-icon>
      <template v-if="index < 1">
        <b-field grouped>
          <b-field :label="$t(name2)" expanded>
            <icon-input v-model="item.host" :placeholder="$t(name2)" :type="type" expanded></icon-input>
          </b-field>
          <b-field :label="$t(name1)" expanded>
            <b-input v-model="item.container" :placeholder="$t(name1)" expanded></b-input>
          </b-field>

        </b-field>
      </template>
      <template v-else>
        <b-field grouped>
          <b-field expanded>
            <icon-input v-model="item.host" :placeholder="$t(name2)" :type="type" expanded></icon-input>
          </b-field>
          <b-field expanded>
            <b-input v-model="item.container" :placeholder="$t(name1)" expanded></b-input>
          </b-field>

        </b-field>

      </template>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import IconInput from '../forms/IconInput.vue'


const props = defineProps({
  devices: Array,
  label: String,
  message: String,
  type: String,
  name1: {
    type: String,
    default: "Container"
  },
  name2: {
    type: String,
    default: "Host"
  },
})

const items = computed({
  get() {
    return props.devices
  },
  set(val) {
    emit('change', val)
  }
})

const addItem = () => {
  let itemObj = {
    container: "",
    host: ""
  }
  items.value.push(itemObj)
}

const removeItem = (index) => {
  items.value.splice(index, 1)
}
defineExpose({
  items,
  addItem,
  removeItem
})

</script>