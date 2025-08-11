import Header from "@/components/header"
import Hero from "@/components/hero"
import NewCollection from "@/components/new-collection"
import CallToAction from "@/components/call-to-action"
import Categories from "@/components/categories"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center ">
      <div className="w-full bg-white shadow-lg overflow-hidden">
        <Header />
        <main>
          <Hero />
          <NewCollection />
          <CallToAction />
          <Categories />
        </main>
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  )
}
