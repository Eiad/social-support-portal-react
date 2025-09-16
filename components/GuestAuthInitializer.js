'use client';

import { useEffect } from 'react';
import { initializeGuestAuth } from '@/lib/guestAuth';

/**
 * Guest Authentication Initializer
 *
 * Initializes guest token system when the app loads.
 * Runs only on client-side to avoid SSR issues.
 */
export default function GuestAuthInitializer() {
  useEffect(() => {
    // Initialize guest token system
    const token = initializeGuestAuth();

    if (process.env.NODE_ENV === 'development') {
      console.log('🎫 Guest auth system initialized');
    }
  }, []);

  // This component doesn't render anything
  return null;
}