'use client'

import { useState, useEffect, useCallback } from 'react'
import { useContract } from './useContract'
import {
    plantSeed as plantSeedContract,
    waterPlant as waterPlantContract,
    harvestPlant as harvestPlantContract,
    updatePlantStage as updatePlantStageContract,
} from '@/lib/contract'
import { Plant } from '@/types/contracts'
// import { useToast } from '@/hooks/use-toast'

/**
 * Hook to manage user's plants (simplified workshop version)
 * Fetches plants from contract and provides plant operations using Panna SDK
 */
// Export harus menggunakan nama 'usePlants' agar PlantTester dapat mengimpornya.
export function usePlants() {
    const { client, account, isConnected, address } = useContract()
    // const { toast } = useToast()
    const [plants, setPlants] = useState<Plant[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    // Plant a new seed (reintroducing full hook logic)
    const plantSeed = useCallback(async () => {
        try {
            // Send transaction and wait for receipt
            await plantSeedContract(client, account) // Menggunakan alias yang diimpor

        } catch (err: any) {
            console.error('Error planting seed:', err)
        } finally {
            setLoading(false)
        }
    }, [client, account])

    // Water a plant (reintroducing full hook logic termasuk stage sync)
    const waterPlant = useCallback(
        async (plantId: bigint) => {
            try {
                await waterPlantContract(client, account, plantId)
            } catch (err: any) {
                console.error('Error watering plant:', err)
            } finally {
                setLoading(false)
            }
        },
        [client, account]
    )

    // Harvest a plant (reintroducing full hook logic termasuk stage sync)
    const harvestPlant = useCallback(
        async (plantId: bigint) => {
            try {
                // Check if stage needs updating before harvest (LOGIKA PENTING)
                await harvestPlantContract(client, account, plantId)
            } catch (err: any) {
                console.error('Error harvesting plant:', err)
            } finally {
                setLoading(false)
            }
        },
        [client, account]
    )

    // Update plant stage manually (reintroducing full hook logic)
    const updatePlantStage = useCallback(
        async (plantId: bigint) => {
            try {
                // Send transaction and wait for receipt
                await updatePlantStageContract(client, account, plantId)
            } catch (err: any) {
                console.error('Error updating plant stage:', err)
            } finally {
                setLoading(false)
            }
        },
        [client, account]
    )

    return {
        plants,
        loading,
        error,
        plantSeed,
        waterPlant,
        harvestPlant,
        updatePlantStage,
    }
}