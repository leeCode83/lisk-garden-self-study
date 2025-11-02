"use client"

// Hapus semua import kecuali React dan PlantTester
import PlantTester from "@/components/PlantTester"

// Komponen utama halaman
export default function Home() {

  // Karena tidak ada header, kita tidak perlu memanggil usePlantStageScheduler lagi.
  // const { isRunning } = usePlantStageScheduler() // Dihapus

  return (
    <div className="min-h-screen bg-background">
      {/* <GardenHeader schedulerRunning={isRunning} /> // Dihapus */}
      <div className="p-6 max-w-7xl mx-auto">
        <main className="flex-1">
          <PlantTester />
        </main>
        {/* Hapus sidebar dan modals jika tidak diperlukan untuk pengujian */}
      </div>
    </div>
  )
}