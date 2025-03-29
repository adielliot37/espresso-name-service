import ToggleTabs from '../components/ToggleTabs'
import AnimatedTitle from '../components/AnimatedTitle'

export default function Home() {
  return (
    <div className="soft-animated-bg min-h-screen flex flex-col items-center justify-center text-center px-4 py-12">
      <AnimatedTitle text="☕ Espresso Name Service" />
      <appkit-button class="mb-6 scale-110 hover:scale-105 transition-transform" />
      <div className="w-full max-w-2xl flex justify-center">
        <ToggleTabs />
      </div>
    </div>
  )
}