<template>
  <div class="mb-5">
    <div class="mb-3 field is-flex is-align-items-center">
      <label class="mb-0 label is-flex-grow-1">NVIDIA GPU</label>
    </div>
    <div >
      <!-- Select All checkbox -->
      <b-field>
        <b-checkbox 
          v-model="selectAll" 
          size="is-small" 
          @input="handleSelectAll"
        >
          {{ $t("Enable all available NVIDIA GPUs") }}
        </b-checkbox>
      </b-field>

      <!-- Individual GPU device checkboxes -->
      <b-field 
        v-for="(device, index) in gpuList" 
        :key="`gpu-${index}`" 
        class="ml-5"
      >
        <b-checkbox 
          v-model="selectedDeviceIndices"
          :native-value="index"
          :disabled="selectAll"
          size="is-small"
          @input="handleDeviceChange"
        >
          {{ device.name }}
        </b-checkbox>
      </b-field>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import store from '@/store';

// Component props
const props = defineProps({
  devices: {
    type: Array,
    default: () => []
  }
});

// Component events
const emit = defineEmits(['update:devices']);

// Local reactive state
const gpuList = ref([]);
const selectAll = ref(false);
const selectedDeviceIndices = ref([]);

// Constants
const GPU_CAPABILITY = 'gpu';

/**
 * Create device configuration object for "all" mode
 * @returns {Array} Device configuration with count: "all"
 */
const createAllDevicesConfig = () => [{
  count: "all",
  capabilities: [GPU_CAPABILITY]
}];

/**
 * Create device configuration object for specific devices mode
 * @param {Array} deviceIndices - Array of selected device indices
 * @returns {Array} Device configuration with device_ids as strings
 */
const createSpecificDevicesConfig = (deviceIndices) => [{
  device_ids: deviceIndices.map(index => String(index)),
  capabilities: [GPU_CAPABILITY]
}];

/**
 * Handle "Select All" checkbox change
 * @param {boolean} isSelected - Whether "All" is selected
 */
const handleSelectAll = (isSelected) => {
  if (isSelected) {
    // Enable "all" mode - preserve individual selections visually but use "all" config
    emit('update:devices', createAllDevicesConfig());
  } else {
    // Disable "all" mode - revert to individual selections or empty
    const newDevices = selectedDeviceIndices.value.length === 0 
      ? [] 
      : createSpecificDevicesConfig(selectedDeviceIndices.value);
    emit('update:devices', newDevices);
  }
};

/**
 * Handle individual device checkbox change
 * Individual selections don't affect the "All" checkbox state
 */
const handleDeviceChange = () => {
  const newDevices = selectedDeviceIndices.value.length === 0
    ? []
    : createSpecificDevicesConfig(selectedDeviceIndices.value);
  emit('update:devices', newDevices);
};

/**
 * Update local component state based on props.devices
 * This function synchronizes the component's UI state with external data
 */
const updateLocalState = () => {
  const currentDevice = props.devices[0];
  
  if (!currentDevice) {
    // No device configuration - only update selectAll state
    selectAll.value = false;
    return;
  }
  
  if (currentDevice.count === "all") {
    // "All" mode - enable selectAll but preserve individual selections
    selectAll.value = true;
  } else if (currentDevice.device_ids && Array.isArray(currentDevice.device_ids)) {
    // Specific devices mode - update individual selections, convert string IDs back to numbers
    selectAll.value = false;
    selectedDeviceIndices.value = currentDevice.device_ids.map(id => Number(id));
  } else {
    // Fallback - reset selectAll state only
    selectAll.value = false;
  }
};

// Lifecycle hooks
onMounted(() => {
  gpuList.value = store.state.gpuList;
  updateLocalState();
});

// Watchers
watch(
  () => props.devices, 
  updateLocalState, 
  { deep: true, immediate: true }
);

watch(
  gpuList, 
  () => {
    if (gpuList.value.length > 0) {
      updateLocalState();
    }
  }, 
  { deep: true }
);
</script>
