//enum yang ada di SC
export enum GrowthStage {
    SEED = 0,
    SPROUT = 1,
    GROWING = 2,
    BLOOMING = 3
}

//Interface representasi struct Plant yang digunakan di SC
export interface Plant {
    id: BigInt,
    owner: string,
    stage: GrowthStage,
    plantedDate: BigInt,
    lastWatered: BigInt,
    waterLevel: number,
    exists: boolean,
    isDead: boolean,
}

export const STAGE_NAMES = {
    [GrowthStage.SEED]: 'seed',
    [GrowthStage.SPROUT]: 'sprout',
    [GrowthStage.GROWING]: 'growing',
    [GrowthStage.BLOOMING]: 'blooming',
} as const

export const PLANT_PRICE = '0.001' // ETH
export const HARVEST_REWARD = '0.003' // ETH
export const STAGE_DURATION = 60 // 1 minute in seconds
export const WATER_DEPLETION_TIME = 30 // 30 seconds - how often water depletes
export const WATER_DEPLETION_RATE = 20 // 20% - how much water is lost per interval

export const LISK_GARDEN_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

export const LISK_GARDEN_ABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "plantId", "type": "uint256" }], "name": "PlantDied", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "plantId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "PlantHarvested", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "plantId", "type": "uint256" }], "name": "PlantSeeded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "plantId", "type": "uint256" }, { "indexed": false, "internalType": "uint8", "name": "newWaterLevel", "type": "uint8" }], "name": "PlantWatered", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "plantId", "type": "uint256" }, { "indexed": false, "internalType": "enum LiskGarden.GrowthStage", "name": "newStage", "type": "uint8" }], "name": "StageAdvanced", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "_plantId", "type": "uint256" }], "name": "calculateWaterLevel", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "deposit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_plantId", "type": "uint256" }], "name": "getPlant", "outputs": [{ "components": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "enum LiskGarden.GrowthStage", "name": "stage", "type": "uint8" }, { "internalType": "uint256", "name": "plantedDate", "type": "uint256" }, { "internalType": "uint256", "name": "lastWatered", "type": "uint256" }, { "internalType": "uint8", "name": "waterLevel", "type": "uint8" }, { "internalType": "bool", "name": "exists", "type": "bool" }, { "internalType": "bool", "name": "isDead", "type": "bool" }], "internalType": "struct LiskGarden.Plant", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getUserPlants", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_plantId", "type": "uint256" }], "name": "harvestPlant", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "plantCounter", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "plantSeed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "plants", "outputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "enum LiskGarden.GrowthStage", "name": "stage", "type": "uint8" }, { "internalType": "uint256", "name": "plantedDate", "type": "uint256" }, { "internalType": "uint256", "name": "lastWatered", "type": "uint256" }, { "internalType": "uint8", "name": "waterLevel", "type": "uint8" }, { "internalType": "bool", "name": "exists", "type": "bool" }, { "internalType": "bool", "name": "isDead", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_plantId", "type": "uint256" }], "name": "updatePlantStage", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "userPlants", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_plantId", "type": "uint256" }], "name": "waterPlant", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];