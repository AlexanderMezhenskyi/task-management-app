<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { TaskPriorities, TaskStatuses } from '@/types/task'

const selectedPriority = ref('')
const selectedStatus = ref('')

const resetFilters = () => {
  selectedPriority.value = ''
  selectedStatus.value = ''
}
</script>

<template>
  <div class="task-filters flex align-center">
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
      Reset Filters
    </BaseButton>
  </div>
</template>

<style src="@/assets/forms.css"></style>

<style scoped>
.task-filters {
  font-size: 16px;
  gap: 12px;
}

.form-group {
  flex-direction: row;
  align-items: center;
  margin-bottom: 0;
}
</style>
