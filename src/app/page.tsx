import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/home/Hero'
import { Stats } from '@/components/home/Stats'
import { Testimonials } from '@/components/home/Testimonials'
import { Founder } from '@/components/home/Founder'
import { Method } from '@/components/home/Method'
import { WhoFor } from '@/components/home/WhoFor'
import { FinalCall } from '@/components/home/FinalCall'

export default function HomePage() {
  return (
    <main className="bg-void text-star">
      <NavBar />
      <Hero />
      <Stats />
      <Testimonials />
      <Founder />
      <Method />
      <WhoFor />
      <FinalCall />
      <Footer />
    </main>
  )
}
