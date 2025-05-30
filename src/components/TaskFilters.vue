<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { TaskPriorities, TaskStatuses } from '@/types/task'

const emit = defineEmits<{
  (e: 'update-filters', filters: { priority: string; status: string }): void
}>()

const selectedPriority = ref('')
const selectedStatus = ref('')

watch([selectedPriority, selectedStatus], () => {
  emit('update-filters', {
    priority: selectedPriority.value,
    status: selectedStatus.value,
  })
})

const resetFilters = () => {
  selectedPriority.value = ''
  selectedStatus.value = ''
}
</script>

<template>
  <div class="task-filters">
    <div class="form-group">
      <label class="form-label" for="priority">Priority:</label>
      <select id="priority" v-model="selectedPriority" class="form-select">
        <option value="">All priorities</option>
        <option v-for="item in TaskPriorities" :key="item" :value="item">{{ item }}</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label" for="status">Status:</label>
      <select id="status" v-model="selectedStatus" class="form-select">
        <option value="">All statuses</option>
        <option v-for="item in TaskStatuses" :key="item" :value="item">{{ item }}</option>
      </select>
    </div>

    <BaseButton variant="ghost" size="sm" no-padding @click="resetFilters">
      Reset filters
    </BaseButton>
  </div>
</template>

<style src="@/assets/forms.css"></style>

<style scoped>
.task-filters {
  display: flex;
  align-items: center;
  font-size: 16px;
  gap: 12px;

  @media (max-width: 580px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.form-label {
  min-width: 55px;
}

.form-group {
  flex-direction: row;
  align-items: center;
  margin-bottom: 0;

  @media (max-width: 580px) {
    width: 100%;
  }
}
</style>
