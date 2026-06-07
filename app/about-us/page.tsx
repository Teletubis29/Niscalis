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
          <h2 className="mb-4 text-4xl font-bold text-gray-900">About Us</h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            We provide products, properties & services designed to simplify your daily life with the best quality and affordable prices
          </p>
        </div>

        {/* Main About Section */}
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-sm md:p-12">
          <h3 className="mb-6 text-2xl font-bold text-gray-900">Who Are We?</h3>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              <span className="font-semibold text-gray-900">NISCALIS</span> is a brand focused on providing practical, modern, and high-quality products for 
              everyday needs. We offer a variety of curated items designed to provide convenience, 
              efficiency, and added value to our customers.
            </p>
            <p>
              With a selective product curation approach, NISCALIS ensures that every item we 
              offer has real functionality, relevant design, and remains affordable.
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
            <h3 className="mb-4 text-2xl font-bold text-gray-900">Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To be a trusted brand providing practical and valuable global products for everyday life.
            </p>
          </div>

          {/* Mission */}
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900">Mission</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-3 font-semibold text-green-600">•</span>
                Provide functional and high-quality products
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-semibold text-green-600">•</span>
                Offer competitive and affordable prices
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-semibold text-green-600">•</span>
                Deliver an easy and trusted shopping experience
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-semibold text-green-600">•</span>
                Continuously innovate to meet modern market needs
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Core Values</h2>
          <p className="text-muted-foreground">
            Principles that guide every decision we make
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
              Simple yet beneficial products
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
              Stable and professional service
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
              Reliable quality
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
              Price that matches the benefit
            </p>
          </div>
        </div>
      </div>

      {/* Our Products Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50 p-8 shadow-sm md:p-12">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Our Product Categories</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          
            <div className="flex items-start space-x-3">
              <span className="text-primary mt-1 text-xl">✓</span>
              <span className="text-lg text-gray-700">Modern Home Appliances</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-primary mt-1 text-xl">✓</span>
              <span className="text-lg text-gray-700">Practical Lifestyle Products</span>
            </div>
              <div className="flex items-start space-x-3">
              <span className="text-primary mt-1 text-xl">✓</span>
              <span className="text-lg text-gray-700">Gadget Accessories</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-primary mt-1 text-xl">✓</span>
              <span className="text-lg text-gray-700">Innovative Daily Essentials</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-primary mt-1 text-xl">✓</span>
              <span className="text-lg text-gray-700">Housing & Apartment Solutions (Property)</span>
            </div>
              <div className="flex items-start space-x-3">
              <span className="text-primary mt-1 text-xl">✓</span>
              <span className="text-lg text-gray-700">Premium Stock Photos & Visual Assets</span>
            </div>
            
          </div>
        </div>
      </div>

      {/* Commitment Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm md:p-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Commitment</h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that good products don't have to be expensive. <span className="font-semibold text-gray-900">NISCALIS</span> is committed 
              to providing practical, quality products that are easily accessible to everyone.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We carefully curate every product to ensure customers get the best value - products 
              that not only work well but are also designed with attention to detail and modern aesthetics.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-xl border-2 border-primary bg-gradient-to-r from-primary to-primary p-8 text-center text-white shadow-lg md:p-12">
          <h2 className="mb-4 text-3xl font-bold">Ready to Simplify Your Life?</h2>
          <p className="mb-8 text-lg opacity-90">
            Explore NISCALIS product collection specially designed to simplify 
            your daily life.
          </p>
          <Link href="/shopping">
            <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-gray-100">
              View Our Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
