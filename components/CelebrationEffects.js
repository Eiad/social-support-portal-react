'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';


export function triggerFormCompletion() {
  // Form completion celebration - more dramatic
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#22c55e', '#16a34a', '#15803d']
    });
    
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#22c55e', '#16a34a', '#15803d']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}


// Celebration component for form completion only
export default function CelebrationEffects({ trigger }) {
  useEffect(() => {
    if (trigger) {
      triggerFormCompletion();
    }
  }, [trigger]);

  return null; // This component doesn't render anything visible
}