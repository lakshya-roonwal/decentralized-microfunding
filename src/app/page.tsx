"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Code, Palette, Users, Coins } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [username, setUsername] = useState('')

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Code className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">MicroFund</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {/* TODO : CHANGE IF ALREADY AUTHENTICATED */}
          <Link className={buttonVariants({ variant: "outline" })} href={"sign-in"}>Log In</Link>
          <Link className={buttonVariants({ variant: "default" })} href={"sign-up"}>Sign Up</Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <motion.div
            className="container px-4 md:px-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Empower Your Code, Fund Your Vision
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Create your personalized page, showcase your projects, and receive microfunding through crypto. Built by developers, for developers.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <motion.div>
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </motion.div>
                <Button className="w-full" size="lg">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <motion.div
            className="container px-4 md:px-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <motion.div className="flex flex-col items-center space-y-4 text-center" whileHover={{ scale: 1.05 }}>
                <Palette className="h-10 w-10 text-primary" />
                <h2 className="text-2xl font-bold">Customizable Themes</h2>
                <p className="text-muted-foreground">Create a unique page that reflects your style with our customizable themes.</p>
              </motion.div>
              <motion.div className="flex flex-col items-center space-y-4 text-center" whileHover={{ scale: 1.05 }}>
                <Users className="h-10 w-10 text-primary" />
                <h2 className="text-2xl font-bold">Community-Driven</h2>
                <p className="text-muted-foreground">Connect with like-minded developers and supporters in our thriving community.</p>
              </motion.div>
              <motion.div className="flex flex-col items-center space-y-4 text-center" whileHover={{ scale: 1.05 }}>
                <Coins className="h-10 w-10 text-primary" />
                <h2 className="text-2xl font-bold">Crypto Payments</h2>
                <p className="text-muted-foreground">Receive funding easily and securely through various cryptocurrencies.</p>
              </motion.div>
            </div>
          </motion.div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <motion.div
            className="container px-4 md:px-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Choose Your Style</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {['Dark', 'Light', 'Neon'].map((theme) => (
                <motion.div
                  key={theme}
                  className="relative overflow-hidden rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${
                    theme === 'Dark' ? 'from-gray-900 to-gray-600' :
                    theme === 'Light' ? 'from-blue-100 to-blue-300' :
                    'from-purple-400 to-pink-500'
                  }`}></div>
                  <div className="relative p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{theme} Theme</h3>
                    <p className="text-white/80">Perfect for {theme.toLowerCase()} mode enthusiasts</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <motion.div
            className="container px-4 md:px-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Funded?</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join our community of developers and start receiving microfunding for your projects today.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg">Create Your Page</Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2023 MicroFund. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}