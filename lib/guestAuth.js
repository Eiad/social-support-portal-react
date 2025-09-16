'use client';

/**
 * Guest Authentication System
 *
 * Generates UUID-based guest tokens for session management.
 * Tokens are created when user starts the application and
 * refreshed after successful form submission.
 */

/**
 * Generate a UUID v4
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get or create guest token
 * Creates a new token if none exists
 */
export function getGuestToken() {
  if (typeof window === 'undefined') return null;

  let token = localStorage.getItem('authToken');

  if (!token) {
    token = `guest_${generateUUID()}`;
    localStorage.setItem('authToken', token);
    localStorage.setItem('tokenCreatedAt', new Date().toISOString());

    console.log('🎫 New guest token created:', token);
  }

  return token;
}

/**
 * Refresh guest token after successful submission
 * Called when application is successfully submitted
 */
export function refreshGuestToken() {
  if (typeof window === 'undefined') return null;

  const oldToken = localStorage.getItem('authToken');
  const newToken = `guest_${generateUUID()}`;

  localStorage.setItem('authToken', newToken);
  localStorage.setItem('tokenCreatedAt', new Date().toISOString());

  console.log('🔄 Guest token refreshed:', {
    old: oldToken?.substring(0, 20) + '...',
    new: newToken?.substring(0, 20) + '...'
  });

  return newToken;
}

/**
 * Remove the guest token after the user has successfully submitted the form
 */
export function clearGuestToken() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('authToken');
  localStorage.removeItem('tokenCreatedAt');

  console.log('🗑️ Guest token cleared');
}

/**
 * Get token info for debugging
 */
export function getTokenInfo() {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('authToken');
  const createdAt = localStorage.getItem('tokenCreatedAt');

  return {
    token: token?.substring(0, 20) + '...',
    fullToken: token,
    createdAt,
    age: createdAt ? `${Math.round((Date.now() - new Date(createdAt)) / 1000)}s` : null
  };
}

/**
 * Initialize guest token system
 * Call this when app starts
 */
export function initializeGuestAuth() {
  return getGuestToken();
}