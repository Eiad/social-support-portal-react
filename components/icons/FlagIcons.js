/**
 * SVG Flag Icon Components
 *
 * Professional flag icons for language selection with accessibility support.
 * These replace emoji flags for better consistency across devices and platforms.
 *
 * Features:
 * - Scalable SVG format for crisp display at any size
 * - Accessible with proper titles and ARIA labels
 * - Optimized for both light and dark themes
 * - Consistent aspect ratio (4:3) following flag standards
 */

import React from 'react';

/**
 * Base Flag Component
 * Provides consistent structure and accessibility for all flag icons
 */
const FlagBase = ({ children, title, className = "", size = 20, ...props }) => (
  <svg
    width={size}
    height={size * 0.75} // 4:3 aspect ratio for flags
    viewBox="0 0 640 480"
    className={`inline-block ${className}`}
    role="img"
    aria-label={title}
    {...props}
  >
    <title>{title}</title>
    {children}
  </svg>
);

/**
 * United Kingdom Flag
 */
export const UKFlag = ({ size = 20, className = "", ...props }) => (
  <FlagBase title="United Kingdom Flag" size={size} className={className} {...props}>
    {/* Navy blue background */}
    <rect width="640" height="480" fill="#012169"/>

    {/* White St. Andrew's saltire (diagonal cross) */}
    <g stroke="#FFFFFF" strokeWidth="60" fill="none">
      <path d="M0,0 L640,480"/>
      <path d="M640,0 L0,480"/>
    </g>

    {/* Red St. Patrick's saltire (offset diagonal stripes) */}
    <g stroke="#C8102E" strokeWidth="30" fill="none">
      <path d="M0,0 L640,480"/>
      <path d="M640,0 L0,480"/>
    </g>

    {/* White St. George's cross (vertical and horizontal) */}
    <g fill="#FFFFFF">
      <rect x="240" y="0" width="160" height="480"/>
      <rect x="0" y="160" width="640" height="160"/>
    </g>

    {/* Red St. George's cross (vertical and horizontal) */}
    <g fill="#C8102E">
      <rect x="280" y="0" width="80" height="480"/>
      <rect x="0" y="200" width="640" height="80"/>
    </g>
  </FlagBase>
);

/**
 * UAE Flag
 */
export const UAEFlag = ({ size = 20, className = "", ...props }) => (
  <FlagBase title="United Arab Emirates Flag" size={size} className={className} {...props}>
    {/* Red vertical stripe (left side) */}
    <rect width="213.33" height="480" fill="#CE1126"/>

    {/* Green horizontal stripe (top) */}
    <rect x="213.33" width="426.67" height="160" fill="#009639"/>

    {/* White horizontal stripe (middle) */}
    <rect x="213.33" y="160" width="426.67" height="160" fill="#FFFFFF"/>

    {/* Black horizontal stripe (bottom) */}
    <rect x="213.33" y="320" width="426.67" height="160" fill="#000000"/>
  </FlagBase>
);

/**
 * Flag Icon Mapper
 * Maps country codes to their respective flag components
 * Makes it easy to add new flags in the future
 */
export const FlagIcon = ({ countryCode, size = 20, className = "", ...props }) => {
  const flagComponents = {
    'GB': UKFlag,
    'AE': UAEFlag,
  };

  const FlagComponent = flagComponents[countryCode?.toUpperCase()];

  if (!FlagComponent) {
    // Fallback to a generic flag icon if country code not found
    console.warn(`Flag component not found for country code: ${countryCode}`);
    return (
      <FlagBase title={`${countryCode} Flag`} size={size} className={className} {...props}>
        <rect width="640" height="480" fill="#f3f4f6"/>
        <text x="320" y="240" textAnchor="middle" fontSize="120" fill="#6b7280">?</text>
      </FlagBase>
    );
  }

  return <FlagComponent size={size} className={className} {...props} />;
};

export default FlagIcon;