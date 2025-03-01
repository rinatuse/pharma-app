<template>
    <div class="medicines-list">
        <h2>Список лекарств</h2>
        <DataTable :value="medicines" :loading="loading" stripedRows>
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
                        :disabled="loading"/>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useMedicinesStore } from '../stores/medicines';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

const medicinesStore = useMedicinesStore();

onMounted(() => {
    medicinesStore.fetchMedicines();
});

const medicines = medicinesStore.medicines;
const loading = medicinesStore.loading;

const removeMedicine = (id: any) => {
    medicinesStore.removeMedicine(id);
}
</script>

<style scoped>
.medicines-list {
  margin-top: 20px;
}
</style>