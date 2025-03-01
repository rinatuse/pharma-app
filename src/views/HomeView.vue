<template>
    <main>
      <div class="container">
        <h1>Фармакология - Список лекарств</h1>
        
        <Card>
          <template #content>
            <AddMedicineForm />
          </template>
        </Card>
        
        <Card class="mt-4">
          <template #content>
            <MedicinesList />
          </template>
        </Card>
      </div>
    </main>
  </template>

<script setup lang="ts">
import AddMedicineForm from '@/components/AddMedicineForm.vue';
import MedicinesList from '@/components/MedicinesList.vue';
import Card from 'primevue/card';
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
  color: var(--primary-color);
}

.mt-4 {
  margin-top: 20px;
}
</style>