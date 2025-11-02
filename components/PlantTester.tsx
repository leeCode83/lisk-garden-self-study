'use client'

import React, { useState, useEffect } from 'react'
import { usePlants } from '@/hooks/usePlants'
import { useContract } from '@/hooks/useContract'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { STAGE_NAMES } from '@/types/contracts'
import { LoginButton, liskSepolia } from 'panna-sdk'

// Komponen sederhana untuk menguji fungsionalitas kontrak
export default function PlantTester() {
    // Mengambil fungsionalitas dari usePlants (yang juga menangani loading state)
    const {
        plants,
        loading,
        plantSeed,
        waterPlant,
        harvestPlant,
        updatePlantStage
    } = usePlants()
    const { isConnected, address } = useContract()

    const [plantIdInput, setPlantIdInput] = useState('')
    const [currentPlant, setCurrentPlant] = useState<any>(null)

    // Mencari plant berdasarkan ID yang diinput
    useEffect(() => {
        if (plantIdInput) {
            const foundPlant = plants.find(p => p.id.toString() === plantIdInput)
            setCurrentPlant(foundPlant)
        } else {
            setCurrentPlant(null)
        }
    }, [plantIdInput, plants])

    // Handler untuk aksi yang memerlukan Plant ID
    const handleAction = (action: (id: bigint) => Promise<any>) => {
        if (plantIdInput) {
            // Pastikan input adalah angka yang valid sebelum diubah ke BigInt
            if (isNaN(Number(plantIdInput))) {
                alert('Invalid Plant ID. Please enter a number.')
                return
            }
            action(BigInt(plantIdInput))
        }
    }

    // Tampilan jika Wallet belum terhubung
    if (!isConnected) {
        return (
            <Card className="p-8 text-center max-w-lg mx-auto space-y-4">
                <CardTitle>Plant Tester (Mode Uji)</CardTitle>
                <p className="mt-4 text-red-500">Tolong hubungkan dompet Anda untuk menguji fungsionalitas.</p>

                {/* Tambahkan tombol login di sini */}
                <div className="flex justify-center">
                    <LoginButton chain={liskSepolia} />
                </div>
            </Card>
        )
    }

    // Tampilan Control Panel
    return (
        <div className="space-y-6 max-w-2xl mx-auto p-4 md:p-0">
            <Card>
                <CardHeader>
                    <CardTitle>Plant Tester (Control Panel)</CardTitle>
                    <p className="text-sm text-muted-foreground">Uji coba fungsi kontrak secara terpisah pada jaringan Lisk Sepolia.</p>
                    <p className="text-xs font-mono truncate text-primary/70">Wallet: {address}</p>
                </CardHeader>
                <CardContent className="space-y-6">

                    {/* Bagian 1: Data & Aksi Global */}
                    <div className="space-y-4 border-b pb-4">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg">Total Plants: {plants.length}</span>
                            <Button
                                // onClick={() => fetchPlants(false)}
                                disabled={loading}
                                variant="outline"
                                className="gap-2"
                            >
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {loading ? 'Fetching...' : 'Fetch/Refresh Data'}
                            </Button>
                        </div>
                        <Button
                            onClick={plantSeed}
                            disabled={loading}
                            className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            Plant New Seed (0.001 ETH)
                        </Button>
                    </div>

                    {/* Bagian 2: Aksi Per Tanaman (Plant ID) */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Aksi Per Tanaman</h3>
                        <div className="space-y-2">
                            <Label htmlFor="plantId">Plant ID</Label>
                            <Input
                                id="plantId"
                                type="text"
                                placeholder={`Masukkan Plant ID (e.g., ${plants.length > 0 ? plants[0].id.toString() : '1'})`}
                                value={plantIdInput}
                                onChange={(e) => setPlantIdInput(e.target.value)}
                            />
                        </div>

                        {currentPlant && (
                            <Card className="p-4 bg-primary/10 border-primary/30">
                                <p className="text-sm font-semibold text-primary">Status Tanaman Saat Ini:</p>
                                <ul className="text-xs mt-2 space-y-1 text-foreground/80">
                                    <li>ID: **{currentPlant.id.toString()}**</li>
                                    {/* <li>Stage: **{STAGE_NAMES[currentPlant.stage].toUpperCase()}** ({currentPlant.stage})</li> */}
                                    <li>Water Level: **{currentPlant.waterLevel}%**</li>
                                    <li>Is Dead: {currentPlant.isDead ? '**Yes 💀**' : 'No ✅'}</li>
                                    {/* <li>Needs Water Sync?: {isStageOutOfSync(currentPlant) ? '**Yes 🔄**' : 'No'}</li> */}
                                </ul>
                            </Card>
                        )}

                        <div className="grid grid-cols-3 gap-2">
                            <Button
                                onClick={() => handleAction(waterPlant)}
                                disabled={loading || !plantIdInput || currentPlant?.isDead}
                                variant="default"
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                Water
                            </Button>
                            <Button
                                onClick={() => handleAction(harvestPlant)}
                                disabled={loading || !plantIdInput || currentPlant?.stage !== 3 || currentPlant?.isDead}
                                variant="default"
                                className="bg-yellow-600 hover:bg-yellow-700"
                            >
                                Harvest
                            </Button>
                            <Button
                                onClick={() => handleAction(updatePlantStage)}
                                disabled={loading || !plantIdInput || currentPlant?.isDead}
                                variant="outline"
                            >
                                Sync Stage
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground pt-4">
                            *Tombol **Harvest** hanya aktif jika stage = **BLOOMING** (3) dan belum mati.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}