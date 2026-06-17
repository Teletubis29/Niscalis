import Hero from "@/components/sections/Hero";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Categories from "@/components/sections/Categories";
import ImageSlider from "@/components/sections/ImageSlider";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";
import { SLIDER_1_CONFIG } from "@/config/slider-configs";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <ImageSlider {...SLIDER_1_CONFIG} />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
