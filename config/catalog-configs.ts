export interface FilterConfig {
  id: string;
  type: "category" | "price" | "custom";
  label: string;
  defaultValue?: any;
  options?: Array<{ label: string; value: string }>;
}

export interface CatalogConfig {
  apiEndpoint: string;
  pageTitle: string;
  pageDescription: string;
  headerColor: string;
  headerTextColor: string;
  detailPathPrefix: string;
  filters: FilterConfig[];
  emptyStateText: string;
  loadingText: string;
  sortOptions: Array<{
    value: string;
    label: string;
  }>;
  maxPrice: number;
  colorClass?: string; // for active filter tags
  backgroundImage?: string; // optional background image URL
}

// SHOPPING CONFIG
export const SHOPPING_CONFIG: CatalogConfig = {
  apiEndpoint: "/api/admin/products",
  pageTitle: "Shopping with NISCALIS",
  pageDescription: "Discover our exclusive collection of premium products",
  headerColor: "bg-green-600",
  headerTextColor: "text-green-50",
  detailPathPrefix: "/shopping",
  colorClass: "green",
  filters: [
    {
      id: "category",
      type: "category",
      label: "Category",
      defaultValue: "all",
      options: [
        { label: "All Products", value: "all" },
        { label: "Audio", value: "audio" },
        { label: "Wearables", value: "wearables" },
        { label: "Accessories", value: "accessories" },
      ],
    },
    {
      id: "price",
      type: "price",
      label: "Price Range",
      defaultValue: [0, 100000000],
    },
  ],
  sortOptions: [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ],
  maxPrice: 100000000,
  emptyStateText: "Tidak ada produk yang sesuai dengan filter",
  loadingText: "Loading produk...",
};

// PROPERTY CONFIG
export const PROPERTY_CONFIG: CatalogConfig = {
  apiEndpoint: "/api/property",
  pageTitle: "Property dengan NISCALIS",
  pageDescription: "Temukan properti impian anda dari koleksi eksklusif kami",
  headerColor: "bg-blue-600",
  headerTextColor: "text-blue-50",
  detailPathPrefix: "/property",
  colorClass: "blue",
  backgroundImage: "https://media.istockphoto.com/id/1486160447/id/foto/closeup-baru-bangunan-apartemen-modern-latar-belakang-dengan-ruang-fotokopi.jpg?s=2048x2048&w=is&k=20&c=wH1171InEtvsijA5ulIeaxFiDgvV-m_HlItSXDVkIJA=",
  filters: [
    {
      id: "category",
      type: "category",
      label: "Tipe Properti",
      defaultValue: "all",
      options: [
        { label: "Semua Properti", value: "all" },
        { label: "Rumah", value: "rumah" },
        { label: "Apartemen", value: "apartemen" },
        { label: "Ruko", value: "ruko" },
        { label: "Tanah", value: "tanah" },
      ],
    },
    {
      id: "price",
      type: "price",
      label: "Harga",
      defaultValue: [0, 100000000],
    },
  ],
  sortOptions: [
    { value: "featured", label: "Pilihan Terbaik" },
    { value: "newest", label: "Terbaru" },
    { value: "price-low", label: "Harga: Rendah ke Tinggi" },
    { value: "price-high", label: "Harga: Tinggi ke Rendah" },
    { value: "rating", label: "Penilaian Tertinggi" },
  ],
  maxPrice: 100000000,
  emptyStateText: "Tidak ada properti yang sesuai dengan filter",
  loadingText: "Loading properti...",
};

// PHOTOGRAPHY CONFIG (untuk referensi di masa depan)
export const PHOTOGRAPHY_CONFIG: CatalogConfig = {
  apiEndpoint: "/api/photography",
  pageTitle: "Photography dengan NISCALIS",
  pageDescription: "Jelajahi koleksi fotografi profesional kami",
  headerColor: "bg-purple-600",
  headerTextColor: "text-purple-50",
  detailPathPrefix: "/photography",
  colorClass: "purple",
  filters: [
    {
      id: "category",
      type: "category",
      label: "Kategori",
      defaultValue: "all",
      options: [
        { label: "Semua Fotografi", value: "all" },
        { label: "Portrait", value: "portrait" },
        { label: "Landscape", value: "landscape" },
        { label: "Event", value: "event" },
      ],
    },
    {
      id: "price",
      type: "price",
      label: "Harga",
      defaultValue: [0, 100000000],
    },
  ],
  sortOptions: [
    { value: "featured", label: "Pilihan Terbaik" },
    { value: "newest", label: "Terbaru" },
    { value: "price-low", label: "Harga: Rendah ke Tinggi" },
    { value: "price-high", label: "Harga: Tinggi ke Rendah" },
    { value: "rating", label: "Penilaian Tertinggi" },
  ],
  maxPrice: 100000000,
  emptyStateText: "Tidak ada fotografi yang sesuai dengan filter",
  loadingText: "Loading fotografi...",
};
