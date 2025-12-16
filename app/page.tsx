'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mic, FileAudio, Brain, CheckCircle, Zap, Users, TrendingUp, Shield } from 'lucide-react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-blue-900/30 backdrop-blur-sm bg-slate-950/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              MeetingMind
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="hidden sm:block text-blue-300 hover:text-blue-200 transition-colors font-medium"
            >
              Features
            </Link>
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-2.5 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105"
            >
              Try It Now
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 py-24 md:py-32 relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="inline-block mb-6"
              >
                <span className="bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-semibold px-4 py-2 rounded-full">
                  🚀 AI-Powered Meeting Intelligence
                </span>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                  Transform Meetings Into
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Actionable Insights
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl mb-10 text-blue-200/80 max-w-2xl mx-auto leading-relaxed"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Automatically transcribe, analyze, and extract key information from your meetings in seconds with AI.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link
                  href="/dashboard"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:scale-105 flex items-center gap-2"
                >
                  Get Started Free
                  <Zap className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/dashboard"
                  className="bg-slate-800/50 border border-blue-500/30 hover:bg-slate-800/80 text-blue-200 font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 backdrop-blur-sm"
                >
                  View Demo
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[
                  { value: "10x", label: "Faster Analysis" },
                  { value: "95%", label: "Accuracy" },
                  { value: "1000+", label: "Meetings Analyzed" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-blue-300/70 mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-slate-950/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                How It Works
              </h2>
              <p className="text-xl text-blue-300/70 max-w-2xl mx-auto">
                Three simple steps to transform your meetings
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: FileAudio,
                  title: "Upload Audio",
                  description: "Upload your meeting recording or paste a transcript. Supports multiple audio formats.",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Brain,
                  title: "AI Analysis",
                  description: "Our advanced AI processes and extracts tasks, decisions, insights, and action items.",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  icon: CheckCircle,
                  title: "Get Insights",
                  description: "Review organized summaries, export to Word, and share with your team instantly.",
                  color: "from-cyan-500 to-blue-500"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: 0.3 + (0.1 * index) }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                       style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 h-full">
                    <div className={`bg-gradient-to-r ${step.color} p-3 rounded-xl w-fit mb-6 shadow-lg`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-blue-100 mb-1">
                      {index + 1}.
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
                    <p className="text-blue-300/80 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Why MeetingMind?
              </h2>
              <p className="text-xl text-blue-300/70 max-w-2xl mx-auto">
                Built for modern teams who value their time
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Analyze an hour-long meeting in under 30 seconds with our optimized AI pipeline.",
                  gradient: "from-yellow-500 to-orange-500"
                },
                {
                  icon: TrendingUp,
                  title: "Boost Productivity",
                  description: "Focus on what matters. Let AI handle the tedious note-taking and summarization.",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  icon: Brain,
                  title: "Smart Extraction",
                  description: "Automatically identifies tasks, decisions, risks, deadlines, and follow-ups.",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: Users,
                  title: "Team Collaboration",
                  description: "Share insights, export to Word, and keep everyone on the same page.",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Shield,
                  title: "Secure & Private",
                  description: "Your data is encrypted and stored securely. We never share your information.",
                  gradient: "from-indigo-500 to-purple-500"
                },
                {
                  icon: CheckCircle,
                  title: "Never Miss Details",
                  description: "Capture every important point with precise AI-powered transcription and analysis.",
                  gradient: "from-cyan-500 to-blue-500"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: 0.3 + (0.05 * index) }}
                >
                  <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 h-full group-hover:scale-[1.02]">
                    <div className="flex items-start gap-4">
                      <div className={`bg-gradient-to-r ${benefit.gradient} p-3 rounded-xl shadow-lg flex-shrink-0`}>
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
                        <p className="text-blue-300/80 leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div
              className="max-w-4xl mx-auto text-center bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm p-12 rounded-3xl border border-blue-500/30 shadow-2xl"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Transform Your Meetings?
              </h2>
              <p className="text-xl text-blue-200/80 mb-8 max-w-2xl mx-auto">
                Join hundreds of teams already using MeetingMind to save time and increase productivity.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
              >
                Start Analyzing Now
                <Zap className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950/80 backdrop-blur-sm border-t border-blue-900/30 py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                MeetingMind
              </span>
            </div>
            <p className="text-blue-300/60 text-sm">
              &copy; 2024 MeetingMind. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-blue-300/60">
              <Link href="/dashboard" className="hover:text-blue-300 transition-colors">Privacy</Link>
              <Link href="/dashboard" className="hover:text-blue-300 transition-colors">Terms</Link>
              <Link href="/dashboard" className="hover:text-blue-300 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
