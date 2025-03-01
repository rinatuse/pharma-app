<template>
    <div class="add-machine">
        <h2>Добавить новое лекарство</h2>

        <form @submit.prevent="submitForm">
            <div class="form-field">
                <span class="p-float-label">
                    <label for="name">Название</label>
                    <InputText id="name" v-model="medicine.name" :disabled="loading" required />
                </span>
            </div>

            <div class="form-field">
                <span class="p-float-label">
                    <label for="description">Описание</label>
                    <InputText id="description" v-model="medicine.description" :disabled="loading" required />
                </span>
            </div>

            <div class="form-field">
                <span class="p-float-label">
                    <label for="dosage">Дозировка</label>
                    <InputText id="dosage" v-model="medicine.dosage" :disabled="loading" required />
                </span>
            </div>

            <div class="form-field">
                <span class="p-float-label">
                    <label for="sideEffects">Побочные эффекты</label>
                    <InputText id="sideEffects" v-model="medicine.sideEffects" :disabled="loading" required />
                </span>
            </div>

           <Button type="submit" label="Добавить" :loading="loading" />
        </form>

        <Message v-if="error" severity="error">{{ error }}</Message>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMedicinesStore } from '../stores/medicines'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Message from 'primevue/message';

const medicinesStore = useMedicinesStore();

const medicine = ref({
    name: '',
    description: '',
    dosage: '',
    sideEffects: '',
})

const loading = computed(() => medicinesStore.loading)
const error = computed(() => medicinesStore.error)

const submitForm = async () => {
    await medicinesStore.addMedicine({
        name: medicine.value.name,
        description: medicine.value.description,
        dosage: medicine.value.dosage,
        sideEffects: medicine.value.sideEffects, 
    });

    if (!error.value) {
        medicine.value = {
            name: '',
            description: '',
            dosage: '',
            sideEffects: '',
        }
    }
}
</script>

<style scoped>
.add-medicine {
  margin-top: 20px;
  max-width: 600px;
}

.form-field {
  margin-bottom: 20px;
}
</style>