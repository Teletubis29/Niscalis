import { Heart, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner Cover Section */}
      <div 
        className="relative h-96 w-full overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.3) 100%), url('https://images.unsplash.com/photo-1632835848598-f42b833fec33?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-white blur-3xl"></div>
        </div>

        {/* Banner Content */}
        <div className="relative flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">NISCALIS</h1>
            <p className="text-xl text-white md:text-2xl">Smart Goods for Daily Life</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white"></div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">Tentang Kami</h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Kami menyediakan products, properties & services dirancang untuk menyederhanakan kehidupan sehari-hari Anda dengan kualitas terbaik dan harga terjangkau
          </p>
        </div>

        {/* Main About Section */}
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-sm md:p-12">
          <h3 className="mb-6 text-2xl font-bold text-gray-900">Siapa Kami?</h3>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              <span className="font-semibold text-gray-900">NISCALIS</span> adalah brand yang 
              berfokus pada penyediaan produk-produk praktis, modern, dan berkualitas untuk 
              kebutuhan sehari-hari. Kami menghadirkan berbagai pilihan barang pilihan yang 
              dirancang untuk memberikan kemudahan, efisiensi, dan nilai lebih bagi pelanggan.
            </p>
            <p>
              Dengan pendekatan kurasi produk yang selektif, NISCALIS memastikan setiap item 
              yang kami tawarkan memiliki fungsi nyata, desain yang relevan, serta harga yang 
              tetap terjangkau.
            </p>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Vision */}
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900">Visi</h3>
            <p className="text-gray-700 leading-relaxed">
              Menjadi brand terpercaya dalam menyediakan produk global yang praktis dan bernilai 
              untuk kehidupan sehari-hari.
            </p>
          </div>

          {/* Mission */}
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900">Misi</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-3 font-semibold text-green-600">•</span>
                Menyediakan produk yang fungsional dan berkualitas
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-semibold text-green-600">•</span>
                Memberikan harga yang kompetitif dan terjangkau
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-semibold text-green-600">•</span>
                Menghadirkan pengalaman belanja yang mudah dan terpercaya
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-semibold text-green-600">•</span>
                Terus berinovasi mengikuti kebutuhan pasar modern
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Nilai Utama Kami</h2>
          <p className="text-muted-foreground">
            Prinsip-prinsip yang memandu setiap keputusan kami
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Simplicity */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-purple-100">
                <Zap className="h-7 w-7 text-purple-600" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">Simplicity</h3>
            <p className="text-sm text-gray-700">
              Produk yang sederhana namun bermanfaat
            </p>
          </div>

          {/* Consistency */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-100">
                <Shield className="h-7 w-7 text-blue-600" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">Consistency</h3>
            <p className="text-sm text-gray-700">
              Pelayanan yang stabil dan profesional
            </p>
          </div>

          {/* Reliability */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-green-100">
                <Heart className="h-7 w-7 text-green-600" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">Reliability</h3>
            <p className="text-sm text-gray-700">
              Kualitas yang dapat diandalkan
            </p>
          </div>

          {/* Value */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-amber-100">
                <TrendingUp className="h-7 w-7 text-amber-600" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">Value</h3>
            <p className="text-sm text-gray-700">
              Harga sepadan dengan manfaat
            </p>
          </div>
        </div>
      </div>

      {/* Our Products Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50 p-8 shadow-sm md:p-12">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Kategori Produk Kami</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          
            <div className="flex items-start space-x-3">
              <span className="text-primary mt-1 text-xl">✓</span>
              <span className="text-lg text-gray-700">Peralatan Rumah Tangga Modern</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-primary mt-1 text-xl">✓</span>
              <span className="text-lg text-gray-700">Produk Lifestyle Praktis</span>
            </div>
              <div className="flex items-start space-x-3">
              <span className="text-primary mt-1 text-xl">✓</span>
              <span className="text-lg text-gray-700">Aksesoris Gadget</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-primary mt-1 text-xl">✓</span>
              <span className="text-lg text-gray-700">Barang Kebutuhan Sehari-Hari Inovatif</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-primary mt-1 text-xl">✓</span>
              <span className="text-lg text-gray-700">Solusi Hunian & Apartemen (Property)</span>
            </div>
              <div className="flex items-start space-x-3">
              <span className="text-primary mt-1 text-xl">✓</span>
              <span className="text-lg text-gray-700">Stok Foto & Aset Visual Premium</span>
            </div>
            
          </div>
        </div>
      </div>

      {/* Commitment Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm md:p-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">Komitmen Kami</h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              Kami percaya bahwa produk yang baik tidak harus mahal. <span className="font-semibold text-gray-900">NISCALIS</span> berkomitmen 
              untuk menghadirkan barang yang tepat guna, berkualitas, dan mudah diakses oleh 
              semua kalangan.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Setiap produk kami kurasi dengan cermat untuk memastikan bahwa pelanggan mendapatkan 
              nilai terbaik - produk yang tidak hanya berfungsi dengan baik, tetapi juga dirancang 
              dengan perhatian terhadap detail dan estetika modern.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-xl border-2 border-primary bg-gradient-to-r from-primary to-primary p-8 text-center text-white shadow-lg md:p-12">
          <h2 className="mb-4 text-3xl font-bold">Siap Mempermudah Hidup Anda?</h2>
          <p className="mb-8 text-lg opacity-90">
            Jelajahi koleksi produk NISCALIS yang dirancang khusus untuk menyederhanakan 
            kehidupan sehari-hari Anda.
          </p>
          <Link href="/shopping">
            <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-gray-100">
              Lihat Produk Kami
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
