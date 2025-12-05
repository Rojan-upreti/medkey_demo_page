import { motion } from 'framer-motion'

interface NavigationProps {
  scrolled: boolean
}

export default function Navigation({ scrolled }: NavigationProps) {
  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 1)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        boxShadow: scrolled ? '0 1px 0 rgba(0, 0, 0, 0.05)' : 'none',
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.a
              href="#"
              className="text-xl font-semibold text-gray-900"
              whileHover={{ opacity: 0.7 }}
            >
              MedKey
            </motion.a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Pricing
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <motion.a
              href="#login"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium hidden md:block"
              whileHover={{ opacity: 0.7 }}
            >
              Sign In
            </motion.a>
            <motion.a
              href="#get-started"
              className="bg-apple-blue text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-apple-blueDark transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

