import HeroSection from "@/components/HomeComponents/HeroSection2";
import HomeAbout from "@/components/HomeComponents/HomeAbout";
import HomeFAQ from "@/components/HomeComponents/HomeFAQ";
import HomeHeroCinematic from "@/components/HomeComponents/HomeHeroCinematic";
import HomeLatest from "@/components/HomeComponents/HomeLatest";
import HomeProducts from "@/components/HomeComponents/HomeProducts";
import HomeTestimonials from "@/components/HomeComponents/HomeTestimonials";
import HomeWhy from "@/components/HomeComponents/HomeWhy";

export default function Home() {
  return (
    <>
      {/* <HomeHeroCinematic /> */}
      <HeroSection />
      <HomeAbout />
      <HomeProducts />
      <HomeLatest limit={8} />
      <HomeWhy />
      <HomeTestimonials />
      <HomeFAQ />
    </>
  );
}
