<template>
    <div class="add-medicine">
        <h2>Добавить новое лекарство</h2>

        <form @submit.prevent="submitForm">
            <div class="form-field">
                <span class="p-float-label">
                    <InputText id="name" v-model="medicine.name" :disabled="medicinesStore.loading" required />
                    <label for="name">Название</label>
                </span>
            </div>

            <div class="form-field">
                <span class="p-float-label">
                    <InputText id="description" v-model="medicine.description" :disabled="medicinesStore.loading" required />
                    <label for="description">Описание</label>
                </span>
            </div>

            <div class="form-field">
                <span class="p-float-label">
                    <InputText id="dosage" v-model="medicine.dosage" :disabled="medicinesStore.loading" required />
                    <label for="dosage">Дозировка</label>
                </span>
            </div>

            <div class="form-field">
                <span class="p-float-label">
                    <InputText id="sideEffects" v-model="medicine.sideEffects" :disabled="medicinesStore.loading" />
                    <label for="sideEffects">Побочные эффекты</label>
                </span>
            </div>

           <Button type="submit" label="Добавить" :loading="medicinesStore.loading" />
        </form>

        <div v-if="medicinesStore.error" class="error-message">
            <i class="pi pi-exclamation-triangle"></i> {{ medicinesStore.error }}
        </div>
        
        <div v-if="successMessage" class="success-message">
            <i class="pi pi-check-circle"></i> {{ successMessage }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useMedicinesStore } from '../stores/medicines'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const medicinesStore = useMedicinesStore()
const successMessage = ref('');

// Подписываемся на обновления, если форма загружается отдельно
onMounted(() => {
    // Если мы не подписаны на обновления, то подписываемся
    medicinesStore.subscribeToMedicines();
})

// Очищаем сообщение об успехе через 3 секунды
watch(successMessage, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            successMessage.value = '';
        }, 3000);
    }
});

const medicine = ref({
    name: '',
    description: '',
    dosage: '',
    sideEffects: '',
})

const submitForm = async () => {
    try {
        await medicinesStore.addMedicine({
            name: medicine.value.name,
            description: medicine.value.description,
            dosage: medicine.value.dosage,
            sideEffects: medicine.value.sideEffects, 
        })
        
        // Если ошибок нет, очищаем форму и выводим сообщение об успехе
        if (!medicinesStore.error) {
            medicine.value = {
                name: '',
                description: '',
                dosage: '',
                sideEffects: '',
            }
            successMessage.value = 'Лекарство успешно добавлено!';
            console.log('Форма успешно отправлена и очищена');
        }
    } catch (error) {
        console.error('Ошибка при отправке формы:', error);
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

.success-message {
  margin: 20px 0;
  padding: 15px;
  background-color: #f0fff0;
  border-radius: 4px;
  color: #4caf50;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>