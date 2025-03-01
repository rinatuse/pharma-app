import { defineStore } from 'pinia'
import { api } from '../../convex/_generated/api'
import { inject, ref, onUnmounted } from 'vue'
import type { Id } from '../../convex/_generated/dataModel'
import { ConvexClient } from 'convex/browser'

export interface Medicine { 
    _id: Id<"medicines">,
    _creationTime: number,
    name: string,
    description: string,
    dosage: string,
    sideEffects?: string,
}

export const useMedicinesStore = defineStore('medicines', () => {
    const convex = inject('convexClient') as ConvexClient
    const medicines = ref<Medicine[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    
    // Для периодических обновлений
    let pollingInterval: number | null = null;
    
    // Запуск периодического обновления данных
    function startPolling(intervalMs = 2000) {
        // Первоначальная загрузка
        fetchMedicines();
        
        // Настройка периодического опроса
        pollingInterval = window.setInterval(() => {
            fetchMedicines();
        }, intervalMs);
    }
    
    // Остановка периодического обновления
    function stopPolling() {
        if (pollingInterval !== null) {
            window.clearInterval(pollingInterval);
            pollingInterval = null;
        }
    }
    
    async function fetchMedicines() {
        loading.value = true
        error.value = null
        try {
            medicines.value = await convex.query(api.medicines.getAllMedicines, {})
        } catch (err) {
            error.value = (err as Error).message
        } finally {
            loading.value = false
        }
    }

    async function addMedicine(medicine: Omit<Medicine, '_id' | '_creationTime'>) {
        loading.value = true
        error.value = null 
        try {
            await convex.mutation(api.medicines.addMedicine, medicine)
            await fetchMedicines() // Явно обновляем данные после добавления
        } catch (err) {
            error.value = (err as Error).message
        } finally {
            loading.value = false
        }
    }

    async function removeMedicine(id: Id<"medicines">) {
        loading.value = true
        error.value = null
        try {
            await convex.mutation(api.medicines.remove, { id }) 
            await fetchMedicines() // Явно обновляем данные после удаления
        } catch (err) {
            error.value = (err as Error).message
        } finally {
            loading.value = false
        }
    }
    
    // Очистка при удалении хранилища
    onUnmounted(() => {
        stopPolling()
    })

    return {
        medicines,
        loading,
        error,
        fetchMedicines,
        startPolling,
        stopPolling,
        addMedicine,
        removeMedicine,
    }
})