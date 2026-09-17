import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/home/Hero'
import { Testimonials } from '@/components/home/Testimonials'
import { Cases } from '@/components/home/Cases'
import { Method } from '@/components/home/Method'
import { Credentials } from '@/components/home/Credentials'
import { WhoFor } from '@/components/home/WhoFor'
import { FinalCall } from '@/components/home/FinalCall'

export default function HomePage() {
  return (
    <main className="bg-void text-star">
      <NavBar theme="dark" />
      <Hero />
      <Testimonials />
      <Cases />
      <Method />
      <Credentials />
      <WhoFor />
      <FinalCall />
      <Footer theme="dark" />
    </main>
  )
}
