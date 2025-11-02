// lib/plant-service.ts
import {
    plantSeed as plantSeedContract,
    waterPlant as waterPlantContract,
    harvestPlant as harvestPlantContract,
    updatePlantStage as updatePlantStageContract,
} from '@/lib/contract'
import { Plant } from '@/types/contracts'

// Asumsikan Anda telah mendapatkan objek client dan account
// dari lingkungan non-React Anda (misalnya, Next.js API route)

/**
 * Menanam benih baru.
 * @param client Klien Thirdweb/Panna yang sudah terinisialisasi.
 * @param account Objek Account Panna SDK yang aktif.
 * @returns Hasil transaksi (receipt).
 */
export async function plantNewSeed(client: any, account: any) {
    if (!client || !account) {
        throw new Error('Wallet client or account not provided.')
    }

    try {
        // Memanggil fungsi kontrak dari lib/contract.ts
        const result = await plantSeedContract(client, account)
        console.log(`Seed planted successfully. Transaction hash: ${result.transactionHash}`)
        return result
    } catch (err) {
        console.error('Error planting seed:', err)
        throw new Error('Failed to plant seed. Check contract execution.')
    }
}

/**
 * Menyiram tanaman berdasarkan ID, termasuk sinkronisasi stage jika diperlukan.
 * @param client Klien Thirdweb/Panna yang sudah terinisialisasi.
 * @param account Objek Account Panna SDK yang aktif.
 * @param plantId ID tanaman (bigint).
 * @returns Hasil transaksi (receipt).
 */
export async function waterUserPlant(client: any, account: any, plantId: bigint) {
    if (!client || !account) {
        throw new Error('Wallet client or account not provided.')
    }

    try {
        // Melanjutkan dengan menyiram tanaman
        const result = await waterPlantContract(client, account, plantId)
        console.log(`Plant #${plantId} watered successfully. Transaction hash: ${result.transactionHash}`)
        return result
    } catch (err) {
        console.error(`Error watering plant #${plantId}:`, err)
        throw new Error('Failed to water plant. Check contract execution.')
    }
}

/**
 * Memanen tanaman berdasarkan ID, termasuk sinkronisasi stage jika diperlukan.
 * @param client Klien Thirdweb/Panna yang sudah terinisialisasi.
 * @param account Objek Account Panna SDK yang aktif.
 * @param plantId ID tanaman (bigint).
 * @returns Hasil transaksi (receipt).
 */
export async function harvestUserPlant(client: any, account: any, plantId: bigint) {
    if (!client || !account) {
        throw new Error('Wallet client or account not provided.')
    }

    try {
        // Melanjutkan dengan memanen
        const result = await harvestPlantContract(client, account, plantId)
        console.log(`Plant #${plantId} harvested successfully. Transaction hash: ${result.transactionHash}`)
        return result
    } catch (err) {
        console.error(`Error harvesting plant #${plantId}:`, err)
        throw new Error('Failed to harvest plant. Check contract execution.')
    }
}