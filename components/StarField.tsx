'use client';

import { memo } from 'react';

// Pure CSS implementation - zero JavaScript overhead
// This replaces the canvas animation that was causing 29s+ of main-thread blocking
const StarField = memo(function StarField() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none opacity-60"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <div className="stars-layer-1" />
      <div className="stars-layer-2" />
      <div className="stars-layer-3" />
    </div>
  );
});

export default StarField;