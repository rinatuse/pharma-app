import { defineStore } from 'pinia'
import { api } from '../../convex/_generated/api'
import { ref, onUnmounted } from 'vue'
import type { Id } from '../../convex/_generated/dataModel'
import { convexClient } from '../lib/convex'

export interface Medicine { 
    _id: Id<"medicines">,
    _creationTime: number,
    name: string,
    description: string,
    dosage: string,
    sideEffects?: string,
}

export const useMedicinesStore = defineStore('medicines', () => {
    const medicines = ref<Medicine[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    
    // Переменная для хранения функции отписки
    let unsubscribe: (() => void) | null = null;
    
    // Подписка на обновления данных в реальном времени
    function subscribeToMedicines() {
        // Отменяем предыдущую подписку если она существует
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }
        
        loading.value = true;
        
        try {
            // Создаем новую подписку с использованием метода onUpdate
            unsubscribe = convexClient.onUpdate(
                api.medicines.getAllMedicines, 
                {}, // параметры запроса
                (newData) => {
                    // Обработка полученных данных
                    if (newData) {
                        medicines.value = newData;
                    }
                    loading.value = false;
                    error.value = null;
                    console.log("Данные обновлены:", newData);
                },
                (err) => {
                    // Обработка ошибки
                    console.error("Ошибка подписки:", err);
                    error.value = err.message;
                    loading.value = false;
                }
            );
        } catch (err) {
            console.error("Ошибка при создании подписки:", err);
            error.value = (err as Error).message;
            loading.value = false;
        }
    }
    
    // Отмена подписки
    function cancelSubscription() {
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }
    }
    
    async function fetchMedicines() {
        loading.value = true;
        error.value = null;
        try {
            medicines.value = await convexClient.query(api.medicines.getAllMedicines, {});
        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            loading.value = false;
        }
    }

    async function addMedicine(medicine: Omit<Medicine, '_id' | '_creationTime'>) {
        loading.value = true;
        error.value = null; 
        try {
            const id = await convexClient.mutation(api.medicines.addMedicine, medicine);
            console.log("Лекарство добавлено с ID:", id);
            // Данные должны обновиться автоматически через подписку
        } catch (err) {
            console.error("Ошибка при добавлении:", err);
            error.value = (err as Error).message;
        } finally {
            loading.value = false;
        }
    }

    async function removeMedicine(id: Id<"medicines">) {
        loading.value = true;
        error.value = null;
        try {
            await convexClient.mutation(api.medicines.remove, { id });
            console.log("Лекарство удалено с ID:", id);
            // Данные должны обновиться автоматически через подписку
        } catch (err) {
            console.error("Ошибка при удалении:", err);
            error.value = (err as Error).message;
        } finally {
            loading.value = false;
        }
    }
    
    // Очистка при удалении хранилища
    onUnmounted(() => {
        cancelSubscription();
    });

    return {
        medicines,
        loading,
        error,
        fetchMedicines,
        subscribeToMedicines,
        cancelSubscription,
        addMedicine,
        removeMedicine,
    }
})