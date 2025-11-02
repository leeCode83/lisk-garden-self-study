import { liskSepolia } from 'panna-sdk'
import { prepareContractCall, sendTransaction, readContract, waitForReceipt } from 'thirdweb/transaction'
import { getContract } from 'thirdweb/contract'
import { toWei } from 'thirdweb/utils'
import {
    LISK_GARDEN_ADDRESS,
    LISK_GARDEN_ABI,
    Plant,
    GrowthStage,
    STAGE_NAMES,
    PLANT_PRICE,
    HARVEST_REWARD,
    STAGE_DURATION,
    WATER_DEPLETION_TIME,
    WATER_DEPLETION_RATE,
} from '@/types/contracts'

export function parsePlantData(rawPlant: any): Plant {
    // Handle both array-like tuples and object-like structures
    const isArray = Array.isArray(rawPlant)

    return {
        id: BigInt(isArray ? rawPlant[0] ?? 0 : rawPlant.id ?? 0),
        owner: isArray ? rawPlant[1] ?? '' : rawPlant.owner ?? '',
        stage: Number(isArray ? rawPlant[2] ?? 0 : rawPlant.stage ?? 0) as GrowthStage,
        plantedDate: BigInt(isArray ? rawPlant[3] ?? 0 : rawPlant.plantedDate ?? 0),
        lastWatered: BigInt(isArray ? rawPlant[4] ?? 0 : rawPlant.lastWatered ?? 0),
        waterLevel: Number(isArray ? rawPlant[5] ?? 0 : rawPlant.waterLevel ?? 0),
        exists: Boolean(isArray ? rawPlant[6] ?? false : rawPlant.exists ?? false),
        isDead: Boolean(isArray ? rawPlant[7] ?? false : rawPlant.isDead ?? false),
    }
}

export async function plantSeed(client: any, account: any) {
    const tx = prepareContractCall({
        contract: getContract({
            client,
            chain: liskSepolia,
            address: LISK_GARDEN_ADDRESS
        }),
        method: 'function plantSeed() external payable returns (uint256)',
        params: [],
        value: toWei(PLANT_PRICE)
    });

    const result = await sendTransaction({
        account,
        transaction: tx
    });

    await waitForReceipt(result);

    return result;
}

export async function waterPlant(client: any, account: any, plantId: bigint) {
    const tx = prepareContractCall({
        contract: getContract({
            client,
            chain: liskSepolia,
            address: LISK_GARDEN_ADDRESS
        }),
        method: 'function waterPlant(uint256 _plantId) external',
        params: [plantId]
    });

    const result = await sendTransaction({
        account,
        transaction: tx
    });

    await waitForReceipt(result);

    return result;
}

export async function calculateWaterLevel(client: any, plantId: bigint): Promise<number> {
    const contract = getContract({
        client,
        chain: liskSepolia,
        address: LISK_GARDEN_ADDRESS
    })

    const waterLevel = await readContract({
        contract: contract,
        method: 'function calculateWaterLevel(uint256 _plantId) public returns(uint8)',
        params: [plantId]
    });

    return Number(waterLevel);
}

export async function updatePlantStage(client: any, account: any, plantId: bigint) {
    const tx = prepareContractCall({
        contract: getContract({
            client,
            chain: liskSepolia,
            address: LISK_GARDEN_ADDRESS
        }),
        method: 'function updatePlantStage(uint256 _plantId) public',
        params: [plantId]
    });

    const result = await sendTransaction({
        account,
        transaction: tx
    });

    await waitForReceipt(result);

    return result;
}

export async function harvestPlant(client: any, account: any, plantId: bigint) {
    const tx = prepareContractCall({
        contract: getContract({
            client,
            chain: liskSepolia,
            address: LISK_GARDEN_ADDRESS
        }),
        method: 'function harvestPlant(uint256 _plantId) external',
        params: [plantId]
    });

    const result = await sendTransaction({
        account,
        transaction: tx
    });

    await waitForReceipt(result);

    return result;
}