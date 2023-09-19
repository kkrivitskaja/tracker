import Link from 'next/link'

export default async function Home() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-black">
      <div className="w-full max-w-[600px] mx-auto text-white">
        <h2 className="text-6xl mb-4">Welcome to MoodTracker</h2>
        <p className="text-2xl text-white/60 mb-6">Track your mood.</p>
        <div>
          <Link href="/">
            <button className="bg-blue-600 p-4 py-2 rounded-lg text-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
