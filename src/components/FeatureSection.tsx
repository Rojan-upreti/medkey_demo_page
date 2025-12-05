import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import IdentityFeature from './features/IdentityFeature'
import FHIRFeature from './features/FHIRFeature'
import FetchFeature from './features/FetchFeature'
import ViewFeature from './features/ViewFeature'
import ShareFeature from './features/ShareFeature'

interface Feature {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  reverse: boolean
}

interface FeatureSectionProps {
  feature: Feature
}

const featureComponents: Record<string, React.ComponentType> = {
  identity: IdentityFeature,
  fhir: FHIRFeature,
  fetch: FetchFeature,
  view: ViewFeature,
  share: ShareFeature,
}

export default function FeatureSection({ feature }: FeatureSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const FeatureComponent = featureComponents[feature.image]

  return (
    <section
      ref={ref}
      className={`py-32 px-6 lg:px-12 ${feature.id % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex flex-col ${
            feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
          } items-center gap-16 lg:gap-24`}
        >
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: feature.reverse ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="max-w-lg">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-apple-blue text-sm font-semibold uppercase tracking-wider mb-3"
              >
                {feature.subtitle}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 tracking-tight"
              >
                {feature.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-gray-600 leading-relaxed"
              >
                {feature.description}
              </motion.p>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-apple-xl border border-gray-100 p-8 overflow-hidden">
                {FeatureComponent && <FeatureComponent />}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

