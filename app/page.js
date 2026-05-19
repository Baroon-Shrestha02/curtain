import HomeAbout from "@/components/HomeComponents/HomeAbout";
import HomeHero from "@/components/HomeComponents/HomeHero";
import HomeProducts from "@/components/HomeComponents/HomeProducts";
import HomeTestimonials from "@/components/HomeComponents/HomeTestimonials";
import HomeWhy from "@/components/HomeComponents/HomeWhy";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <HomeProducts />
      <HomeWhy />
      <HomeTestimonials />
    </>
  );
}
