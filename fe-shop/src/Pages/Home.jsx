import {
  HeroSection,
  FeaturePrompt,
  Footer,
  HomeProducts,
  Newsletter,
  ProductsGallery,
  StatSection,
} from "../Pages/index";

function Home() {
  return (
    <div>
      <HeroSection />
      <StatSection />
      <FeaturePrompt />
      <ProductsGallery />
      <HomeProducts />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;