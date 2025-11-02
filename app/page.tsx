// app/page.tsx

"use client"

import { useContract } from "@/hooks/useContract"
import { usePlants } from "@/hooks/usePlants"
import { Button } from "@/components/ui/button"

export default function Home() {
  // Hanya ambil isConnected dari useContract
  const { isConnected } = useContract()

  // Ambil loading dan plantSeed dari usePlants
  const { plantSeed, loading: plantSeedLoading } = usePlants()

  // Gunakan loading dari plantSeed saja
  const loading = plantSeedLoading

  return (
    <div className="min-h-screen p-10 bg-background flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Plant Seed Test Interface 🌱</h1>

      {!isConnected ? (
        <div className="text-center">
          <p className="text-xl mb-4 text-red-500">
            ❌ **Dompet Belum Terhubung**
          </p>
          <p className="text-muted-foreground">
            Silakan hubungkan dompet Anda melalui tombol "Connect Wallet" di Header.
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl mb-6 text-green-500">
            ✅ **Wallet Terhubung**
          </p>

          <Button
            onClick={plantSeed}
            disabled={loading}
            className="text-lg px-8 py-4"
          >
            {loading ? 'Planting Seed... (Cek Dompet!)' : 'Klik untuk Uji plantSeed'}
          </Button>

          <p className="text-sm text-muted-foreground mt-4">
            Setelah klik, seharusnya muncul pop-up konfirmasi transaksi di dompet Anda.
          </p>
        </div>
      )}

    </div>
  )
}