import Header from "../../components/header"
import Footer from "../../components/footer"
import CategoryHero from "../../components/category-hero"
import Catalog from "../../components/catalog"
import ScrollToTop from "../../components/scroll-to-top"

export default function KidsPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full bg-white shadow-lg overflow-hidden">
        <Header />
        <main>
          <CategoryHero
            title="KIDS' COLLECTION"
            description="Comfort-first designs in soft hues and playful cuts for every adventure."
            buttonText="Explore Kids"
            imageSrc="/kids.jpg"
          />
          <Catalog heading="Products from Kids' collection" />
        </main>
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  )
}
