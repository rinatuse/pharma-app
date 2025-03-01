<template>
    <div class="medicines-list">
        <h2>Список лекарств</h2>
        
        <div v-if="medicinesStore.loading && !medicinesStore.medicines.length" class="loading-message">
            <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i> Загрузка данных...
        </div>
        
        <DataTable 
            :value="medicinesStore.medicines" 
            :loading="medicinesStore.loading" 
            stripedRows
            v-if="medicinesStore.medicines.length > 0"
        >
            <Column field="name" header="Название"></Column>
            <Column field="description" header="Описание"></Column>
            <Column field="dosage" header="Дозировка"></Column>
            <Column field="sideEffects" header="Побочные эффекты"></Column>
            <Column header="Действия">
                <template #body="{data}"> 
                    <Button 
                        icon="pi pi-trash"
                        severity="danger"
                        @click="removeMedicine(data._id)"
                        :disabled="medicinesStore.loading"/>
                </template>
            </Column>
        </DataTable>
        
        <div v-if="medicinesStore.error" class="error-message">
            <i class="pi pi-exclamation-triangle"></i> {{ medicinesStore.error }}
        </div>
        
        <div v-if="!medicinesStore.loading && medicinesStore.medicines.length === 0 && !medicinesStore.error" class="empty-message">
            Список лекарств пуст. Добавьте новое лекарство через форму выше.
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useMedicinesStore } from '../stores/medicines';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import type { Id } from '../../convex/_generated/dataModel';

const medicinesStore = useMedicinesStore();

onMounted(() => {
    // Подписываемся на обновления при монтировании компонента
    medicinesStore.subscribeToMedicines();
    console.log('MedicinesList компонент подписался на обновления');
});

// Отписываемся при размонтировании компонента для предотвращения утечек памяти
onUnmounted(() => {
    medicinesStore.cancelSubscription();
    console.log('MedicinesList компонент отписался от обновлений');
});

const removeMedicine = async (id: Id<"medicines">) => {
    console.log("Удаляем документ с ID:", id);
    try {
        await medicinesStore.removeMedicine(id);
    } catch (error) {
        console.error("Ошибка при удалении:", error);
    }
};
</script>

<style scoped>
.medicines-list {
  margin-top: 20px;
}

.loading-message {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.error-message {
  margin: 20px 0;
  padding: 15px;
  background-color: #fff3f3;
  border-radius: 4px;
  color: #f44336;
  display: flex;
  align-items: center;
  gap: 10px;
}

.empty-message {
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
  text-align: center;
  color: #6c757d;
}
</style>