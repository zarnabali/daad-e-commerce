import Header from "../../components/header"
import Footer from "../../components/footer"
import CategoryHero from "../../components/category-hero"
import Catalog from "../../components/catalog"
import ScrollToTop from "../../components/scroll-to-top"

export default function MenPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full bg-white shadow-lg overflow-hidden">
        <Header />
        <main>
          <CategoryHero
            title="MEN'S COLLECTION"
            description="Tailored essentials and modern silhouettes designed for everyday sophistication."
            buttonText="Explore Men"
            imageSrc="/images/mens3.jpg"
          />
          <Catalog heading="Products from Men's collection" />
        </main>
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  )
}
