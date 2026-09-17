import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/home/Hero'
import { WarpIntro } from '@/components/home/WarpIntro'
import { LogoBand } from '@/components/home/LogoBand'
import { Stats } from '@/components/home/Stats'
import { Testimonials } from '@/components/home/Testimonials'
import { Founder } from '@/components/home/Founder'
import { Method } from '@/components/home/Method'
import { WhoFor } from '@/components/home/WhoFor'
import { FinalCall } from '@/components/home/FinalCall'

export default function HomePage() {
  return (
    <main className="bg-void text-star">
      <WarpIntro />
      <NavBar />
      <Hero />
      <LogoBand />
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
