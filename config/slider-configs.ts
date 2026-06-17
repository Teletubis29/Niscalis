export interface SlideItem {
  id: number;
  image: string;
  link: string;
  alt: string;
}

export interface SliderConfig {
  slides: SlideItem[];
  title?: string;
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

// Slider 1 - Koleksi Terbaru
export const SLIDER_1_CONFIG: SliderConfig = {
//   title: "Koleksi Terbaru",
  autoSlide: true,
  autoSlideInterval: 5000,
  slides: [
    {
      id: 1,
      image: "https://static.vecteezy.com/system/resources/thumbnails/004/299/835/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg",
      link: "/shopping",
      alt: "Shopping With Niscalis",
    },
    {
      id: 2,
      image: "https://img.magnific.com/psd-gratis/templat-banner-web-properti-rumah-properti_106176-854.jpg",
      link: "/properties",
      alt: "Fashion Collection",
    },
  ],
};
