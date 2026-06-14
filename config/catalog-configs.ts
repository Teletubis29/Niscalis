export interface FilterConfig {
  id: string;
  type: "category" | "price" | "custom" | "search";
  label: string;
  defaultValue?: any;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
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
  // backgroundImage: "https://media.istockphoto.com/id/1067203316/id/foto/wanita-memegang-keranjang-belanja-dengan-latar-belakang-lorong-supermarket-blur-abstrak.jpg?s=2048x2048&w=is&k=20&c=PkZK0e17YraJfrntSl0bOzvtSZRW82IMP8jsFRANJSQ=",
  backgroundImage: "https://media.istockphoto.com/id/2230023160/id/foto/pengusaha-yang-bekerja-di-komputer-untuk-dijual-atau-distribusi-produk.jpg?s=2048x2048&w=is&k=20&c=i_9KreZdKOukqaOSCK9IojYLdTXdFG_2ZEsfUeRMKLo=",
  filters: [
    {
      id: "search",
      type: "search",
      label: "Search Products",
      defaultValue: "",
      placeholder: "Search product",
    },
    {
      id: "category",
      type: "category",
      label: "Category",
      defaultValue: "all",
      // Categories will be dynamically fetched from database
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
  emptyStateText: "No Products match the filter",
  loadingText: "Loading products...",
};

// PROPERTY CONFIG
export const PROPERTY_CONFIG: CatalogConfig = {
  apiEndpoint: "/api/properties",
  pageTitle: "Property with NISCALIS",
  pageDescription: "Find your dream property with NISCALIS - the best real estate platform in Indonesia",
  headerColor: "bg-blue-600",
  headerTextColor: "text-blue-50",
  detailPathPrefix: "/properties",
  colorClass: "blue",
  backgroundImage: "https://media.istockphoto.com/id/1486160447/id/foto/closeup-baru-bangunan-apartemen-modern-latar-belakang-dengan-ruang-fotokopi.jpg?s=2048x2048&w=is&k=20&c=wH1171InEtvsijA5ulIeaxFiDgvV-m_HlItSXDVkIJA=",
  filters: [
    {
      id: "search",
      type: "search",
      label: "Search Properties",
      defaultValue: "",
      placeholder: "Search property",
    },
    {
      id: "propertyType",
      type: "category",
      label: "Transaction Type",
      defaultValue: "all",
      options: [
        { label: "All", value: "all" },
        { label: "For Sale", value: "Sale" },
        { label: "For Rent", value: "Rent" },
        // { label: "Buy", value: "buy" },
      ],
    },
    {
      id: "category",
      type: "category",
      label: "Property Type",
      defaultValue: "all",
      // Categories will be dynamically fetched from database
    },
      {
      id: "areas",
      type: "category",
      label: "Areas",
      defaultValue: "all",
      options: [
        { label: "All Areas", value: "all" },
        { label: "Jakarta", value: "jakarta" },
        { label: "Bekasi", value: "bekasi" },
        { label: "Depok", value: "depok" },
        { label: "Tangerang", value: "tangerang" },
        { label: "Bogor", value: "bogor" },
        { label: "Bandung", value: "bandung" },
        { label: "Cirebon", value: "cirebon" },
        { label: "Tasikmalaya", value: "tasikmalaya" },
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
  emptyStateText: "No properties match the filter",
  loadingText: "Loading properties...",
};

// PHOTOGRAPHY CONFIG (untuk referensi di masa depan)
export const PHOTOGRAPHY_CONFIG: CatalogConfig = {
  apiEndpoint: "/api/photography",
  pageTitle: "Photography with NISCALIS",
  pageDescription: "Explore our collection of professional photography",
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
