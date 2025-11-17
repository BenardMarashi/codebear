'use client';

import { memo } from 'react';

interface GradientBackgroundProps {
  variant?: 'default' | 'hero' | 'section' | 'minimal';
  className?: string;
}

/**
 * GradientBackground - Beautiful flowing green aura lights (like aurora borealis)
 * Creates smooth, atmospheric gradient lighting effects throughout your site
 * 
 * Variants:
 * - hero: Bright, prominent aura lights
 * - default: Balanced aura effect
 * - section: Subtle aura glow
 * - minimal: Very subtle single aura
 */
const GradientBackground = memo(function GradientBackground({ 
  variant = 'default',
  className = '' 
}: GradientBackgroundProps) {
  
  const getAuraForVariant = () => {
    switch (variant) {
      case 'hero':
        return (
          <>
            {/* Top flowing aura */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                top: '-20%',
                left: '0',
                right: '0',
                height: '60%',
                background: 'linear-gradient(180deg, rgba(70, 166, 132, 0.15) 0%, rgba(55, 130, 104, 0.08) 40%, transparent 100%)',
                filter: 'blur(60px)',
                animation: 'auraFlow1 20s ease-in-out infinite',
                opacity: 0.8
              }}
            />
            
            {/* Right side aura sweep */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                top: '0',
                right: '-10%',
                width: '50%',
                height: '80%',
                background: 'linear-gradient(270deg, rgba(70, 166, 132, 0.12) 0%, rgba(40, 94, 75, 0.06) 50%, transparent 100%)',
                filter: 'blur(80px)',
                animation: 'auraFlow2 25s ease-in-out infinite',
                opacity: 0.7
              }}
            />
            
            {/* Bottom flowing aura */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                bottom: '-20%',
                left: '0',
                right: '0',
                height: '50%',
                background: 'linear-gradient(0deg, rgba(55, 130, 104, 0.1) 0%, rgba(70, 166, 132, 0.05) 40%, transparent 100%)',
                filter: 'blur(70px)',
                animation: 'auraFlow3 30s ease-in-out infinite',
                opacity: 0.6
              }}
            />
          </>
        );
        
      case 'section':
        return (
          <>
            {/* Subtle top aura */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                top: '-15%',
                left: '10%',
                right: '10%',
                height: '40%',
                background: 'linear-gradient(180deg, rgba(70, 166, 132, 0.08) 0%, rgba(55, 130, 104, 0.04) 50%, transparent 100%)',
                filter: 'blur(70px)',
                animation: 'auraFlow1 22s ease-in-out infinite',
                opacity: 0.7
              }}
            />
            
            {/* Subtle bottom aura */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                bottom: '-15%',
                left: '15%',
                right: '15%',
                height: '35%',
                background: 'linear-gradient(0deg, rgba(55, 130, 104, 0.06) 0%, transparent 100%)',
                filter: 'blur(60px)',
                animation: 'auraFlow2 28s ease-in-out infinite',
                opacity: 0.6
              }}
            />
          </>
        );
        
      case 'minimal':
        return (
          <div 
            className="aura-light"
            style={{
              position: 'absolute',
              top: '30%',
              left: '20%',
              right: '20%',
              height: '40%',
              background: 'linear-gradient(180deg, rgba(70, 166, 132, 0.05) 0%, transparent 100%)',
              filter: 'blur(80px)',
              animation: 'auraFlow1 25s ease-in-out infinite',
              opacity: 0.5
            }}
          />
        );
        
      default: // 'default'
        return (
          <>
            {/* Diagonal aura sweep */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '60%',
                height: '60%',
                background: 'linear-gradient(135deg, rgba(70, 166, 132, 0.1) 0%, rgba(55, 130, 104, 0.05) 50%, transparent 100%)',
                filter: 'blur(70px)',
                animation: 'auraFlow1 23s ease-in-out infinite',
                opacity: 0.7
              }}
            />
            
            {/* Center aura glow */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                right: '20%',
                height: '60%',
                background: 'radial-gradient(ellipse at center, rgba(70, 166, 132, 0.06) 0%, transparent 70%)',
                filter: 'blur(90px)',
                animation: 'auraPulse 20s ease-in-out infinite',
                opacity: 0.8
              }}
            />
            
            {/* Bottom right aura */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                bottom: '-10%',
                right: '-10%',
                width: '50%',
                height: '50%',
                background: 'linear-gradient(315deg, rgba(55, 130, 104, 0.08) 0%, transparent 70%)',
                filter: 'blur(75px)',
                animation: 'auraFlow3 27s ease-in-out infinite',
                opacity: 0.6
              }}
            />
          </>
        );
    }
  };

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {getAuraForVariant()}
    </div>
  );
});

export default GradientBackground;