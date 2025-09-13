'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export function triggerStepCompletion() {
  // Step completion celebration - gentle and professional
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.7 },
    colors: ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd']
  });
}

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

export function triggerProgressMilestone(step) {
  // Milestone celebration with step-specific colors
  const colors = {
    1: ['#2563eb', '#3b82f6'], // Blue for step 1
    2: ['#7c3aed', '#8b5cf6'], // Purple for step 2
    3: ['#dc2626', '#ef4444']  // Red for step 3
  };

  confetti({
    particleCount: 30,
    spread: 45,
    origin: { y: 0.8 },
    colors: colors[step] || ['#2563eb', '#3b82f6'],
    shapes: ['circle'],
    scalar: 0.8
  });
}

// Celebration component for step progress
export default function CelebrationEffects({ trigger, type, step }) {
  useEffect(() => {
    if (trigger) {
      switch (type) {
        case 'step':
          triggerStepCompletion();
          break;
        case 'form':
          triggerFormCompletion();
          break;
        case 'milestone':
          triggerProgressMilestone(step);
          break;
        default:
          triggerStepCompletion();
      }
    }
  }, [trigger, type, step]);

  return null; // This component doesn't render anything visible
}