'use client';

import { memo } from 'react';

/**
 * StarField Component - Beautiful animated starfield with green accent stars
 * Now with proper CSS animations that actually work!
 */
const StarField = memo(function StarField() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 0.7 }}
      aria-hidden="true"
    >
      {/* Three layers of stars with different sizes and speeds */}
      <div className="stars-layer-1" />
      <div className="stars-layer-2" />
      <div className="stars-layer-3" />
    </div>
  );
});

export default StarField;