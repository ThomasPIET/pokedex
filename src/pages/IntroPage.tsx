"use client"
import { Particles } from "@/components/magicui/particles";
import { useState, useEffect } from "react"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export const IntroPage = () => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen">

      <div className="absolute inset-0 z-0">
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={"#000000"}
        refresh
      />      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="mb-4 text-center">
          <div className="mb-4">
            <TypingAnimation
              duration={60}
              className="text-3xl md:text-6xl font-bold text-slate-800 dark:text-slate-100"
            >
              Welcome to the Pokedex
            </TypingAnimation>
          </div>

          <div className="h-12">
            <TypingAnimation
              duration={60}
              delay={2300}
              className="text-lg md:text-3xl text-slate-700 dark:text-slate-300"
            >
              Feel free to explore the app!
            </TypingAnimation>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: showButton ? 1 : 0,
            scale: showButton ? 1 : 0.9,
            y: showButton ? 0 : 10,
          }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <Button className="px-6 py-6 text-lg font-medium transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl">
            <Link to="/" className="flex items-center gap-2">
              Go to Pokedex
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl opacity-60"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-indigo-100 dark:bg-indigo-900/20 blur-3xl opacity-60"></div>
      </div>
    </main>
  )
}
