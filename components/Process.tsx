'use client';

import React from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

// MacOS Window Component - Compact version
const MacWindow = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative rounded-lg overflow-hidden border ${className}`}
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(12px)',
      borderColor: 'rgba(255, 255, 255, 0.1)'
    }}
  >
    {/* MacOS Title Bar - Smaller */}
    <div className="h-6 flex items-center px-2.5 gap-1.5"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    >
      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
    </div>
    {/* Window Content - Reduced padding */}
    <div className="p-4">
      {children}
    </div>
  </div>
);

// Enhanced Bar Chart Component with more animations
const AnimatedBarChart = () => {
  const bars = [
    { height: 75, color: 'bg-[#285E4B]/70', delay: 0 },
    { height: 45, color: 'bg-[#378268]/60', delay: 0.15 },
    { height: 85, color: 'bg-[#378268]/70', delay: 0.3 },
    { height: 55, color: 'bg-[#46A684]/60', delay: 0.45 },
  ];

  return (
    <div className="space-y-3">
      {/* Bar Chart */}
      <div className="flex items-end justify-between h-14 gap-1.5">
        {bars.map((bar, index) => (
          <div key={index} className="flex-1 flex flex-col justify-end">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: [`${bar.height * 0.3}%`, `${bar.height}%`, `${bar.height * 0.6}%`, `${bar.height}%`],
                opacity: [0, 1, 0.8, 1]
              }}
              transition={{
                duration: 2,
                delay: bar.delay,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
              className={`w-full ${bar.color} rounded-t`}
            />
          </div>
        ))}
      </div>
      
      {/* Animated text lines below chart */}
      <div className="space-y-1.5">
        {[60, 80, 70].map((width, i) => (
          <motion.div
            key={i}
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: `${width}%`,
              opacity: [0, 0.7, 0.7, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut"
            }}
            className="h-1 bg-white/10 rounded"
          />
        ))}
      </div>
    </div>
  );
};

// Enhanced Target/Gauge Component with more rings and animations
const TargetGauge = () => {
  return (
    <div className="relative w-16 h-16">
      {/* Multiple animated circles */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.1, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 border-2 border-[#378268]/30 rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.2, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2
        }}
        className="absolute inset-1 border-2 border-[#378268]/40 rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.8, 0.3, 0.8],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4
        }}
        className="absolute inset-2 border-2 border-[#46A684]/50 rounded-full"
      />
      
      {/* Rotating arc */}
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0"
      >
        <div className="w-full h-full border-2 border-transparent border-t-[#285E4B] rounded-full" />
      </motion.div>
      
      {/* Center pulsing dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [1, 0.6, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-2.5 h-2.5 bg-[#285E4B] rounded-full shadow-lg shadow-[#285E4B]/50"
        />
      </div>
      
      {/* Small orbiting dots */}
      {[0, 120, 240].map((angle, i) => (
        <motion.div
          key={i}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.3
          }}
          className="absolute inset-0"
        >
          <div 
            className="absolute w-1 h-1 bg-[#46A684] rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) translateY(-24px)`
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced Code Animation Component
const CodeAnimation = () => {
  const codeLines = [
    { text: 'Sampling(ayers.Layer):', color: 'text-[#46A684]', width: 85 },
    { text: '"""Uses mean, log_var to sample z..."""', color: 'text-gray-500', width: 95 },
    { text: '', color: '', width: 0 },
    { text: 'call(self, inputs):', color: 'text-blue-400', width: 70 },
    { text: '  mean, log_var = inputs', color: 'text-gray-300', width: 80 },
    { text: '  batch = tf.shape(mean)[0]', color: 'text-gray-300', width: 85 },
    { text: '  dim = tf.shape(mean)[1]', color: 'text-gray-300', width: 82 },
  ];

  return (
    <div className="space-y-2 py-2 font-mono text-[10px]">
      {codeLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ 
            opacity: [0, 1, 1, 0.7],
            x: [-10, 0]
          }}
          transition={{ 
            duration: 0.6,
            delay: i * 0.15,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="flex items-center gap-2"
        >
          {line.width > 0 && (
            <>
              <motion.div
                animate={{
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="text-[#378268]"
              >
                {'>'}
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ 
                  width: `${line.width}%`
                }}
                transition={{ 
                  duration: 0.8,
                  delay: i * 0.15 + 0.2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeOut"
                }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className={line.color}>{line.text}</span>
              </motion.div>
              {/* Blinking cursor at the end */}
              {i === codeLines.length - 1 && (
                <motion.div
                  animate={{
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatDelay: 0
                  }}
                  className="w-1 h-3 bg-[#378268]"
                />
              )}
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Status Panel Component - Compact
const StatusPanel = () => {
  const statuses = [
    { label: 'Security', icon: '🛡️' },
    { label: 'Efficiency', icon: '⚡' },
    { label: 'Speed', icon: '🚀' },
    { label: 'Accuracy', icon: '🎯' }
  ];

  return (
    <div className="space-y-2">
      {statuses.map((status, index) => (
        <motion.div
          key={status.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, repeat: Infinity, repeatDelay: 3 }}
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${
            index === 1 ? 'bg-white/20' : 'bg-white/5'
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center bg-white/10 rounded">
            <span className="text-[10px]">{status.icon}</span>
          </div>
          <span className="text-white/70">{status.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Updating Status Component - Smaller
const UpdatingStatus = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-12 h-12"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(40, 94, 75, 0.3)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgb(40, 94, 75)"
            strokeWidth="8"
            strokeDasharray="70 210"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
      <p className="text-xs text-white/70">Updating...</p>
    </div>
  );
};

const ProcessCard = ({ step, index, isInView }: any) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative group"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="rounded-3xl p-8 h-full flex flex-col relative overflow-hidden border"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Background Glow Animation - Only on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 z-0"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.5 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                background: 'radial-gradient(circle at center, rgba(40, 94, 75, 0.2) 0%, transparent 60%)',
              }}
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 flex flex-col h-full space-y-6">
          {/* Animated Window - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
          >
            {step.component}
          </motion.div>

          {/* Title and Description */}
          <div className="flex-grow">
            <h3 
              className="text-2xl font-bold mb-4 transition-colors"
              style={{
                color: isHovered ? '#46A684' : '#FFFFFF',
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              {step.title}
            </h3>
            <p 
              className="leading-relaxed font-light"
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              {step.description}
            </p>
          </div>
        </div>
      </motion.div>

      {index < 2 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.6 }}
          className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#285E4B]/50 to-[#378268]/50 origin-left"
        />
      )}
    </motion.div>
  );
};

export default function Process() {
  const t = useTranslations('Process');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const steps = [
    {
      number: '01',
      title: 'Discovery & Analysis',
      description: 'We dive deep into your needs, exploring ideas and defining strategies for long-term success.',
      component: (
        <MacWindow className="h-[180px]">
          <div className="flex gap-3 h-full items-center">
            <div className="flex-1">
              <AnimatedBarChart />
            </div>
            <div className="flex items-center justify-center">
              <TargetGauge />
            </div>
          </div>
        </MacWindow>
      )
    },
    {
      number: '02',
      title: 'Development & Test',
      description: 'We craft tailored solutions for your goals and rigorously test them for top-notch reliability.',
      component: (
        <MacWindow className="h-[180px]">
          <CodeAnimation />
        </MacWindow>
      )
    },
    {
      number: '03',
      title: 'Launch & Maintain',
      description: 'We deploy your solution seamlessly and ensure its continued performance with ongoing care.',
      component: (
        <MacWindow className="h-[180px]">
          <div className="grid grid-cols-2 gap-3 h-full">
            <StatusPanel />
            <div className="flex items-center justify-center">
              <UpdatingStatus />
            </div>
          </div>
        </MacWindow>
      )
    }
  ];

  return (
    <section 
      ref={ref} 
      id="process" 
      className="py-20 sm:py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#0D0D0D' }}
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-5 py-2 text-sm font-bold uppercase tracking-[0.2em] mb-6 rounded-lg"
            style={{
              color: '#285E4B',
              fontFamily: "'Outfit', sans-serif",
              backgroundColor: 'rgba(40, 94, 75, 0.1)',
              border: '1px solid rgba(40, 94, 75, 0.2)'
            }}
          >
            {t('badge')}
          </motion.span>
          <h2 
            id="process-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{
              color: '#FFFFFF',
              letterSpacing: '-0.04em',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            {t('title')} <span style={{
              background: 'linear-gradient(135deg, #285E4B 0%, #193A2E 50%, #46A684 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>{t('titleHighlight')}</span>
          </h2>
          <p 
            className="text-xl sm:text-2xl max-w-3xl mx-auto font-light leading-8"
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <ProcessCard
              key={index}
              step={step}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link href="#contact">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #285E4B 0%, #193A2E 100%)',
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              {t('cta')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}