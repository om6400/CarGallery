import Hero from '@/components/layout/hero';
import Categories from '@/components/sections/categories';
import FeaturedImages from '@/components/sections/featured';
import About from '@/components/sections/about';

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedImages />
      <About />
    </>
  );
}