import Header from "../../components/header"
import Footer from "../../components/footer"
import CategoryHero from "../../components/category-hero"
import Catalog from "../../components/catalog"

export default function WomenPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full bg-white shadow-lg overflow-hidden">
        <Header />
        <main>
          <CategoryHero
            title="WOMEN'S COLLECTION"
            description="Elevated staples and timeless pieces crafted to empower every moment."
            buttonText="Explore Women"
            imageSrc="/women.jpg"
          />
          <Catalog heading="Products from Women's collection" />
        </main>
        <Footer />
      </div>
    </div>
  )
}
