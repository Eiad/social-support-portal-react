/**
 * Flag Icon Component using country-flag-icons library
 *
 * Uses a centralized import map with all flags
 * More maintainable than 85+ individual import lines
 */

import React from 'react';
import * as Flags from 'country-flag-icons/react/3x2';

/**
 * FlagIcon Component
 *
 * Renders a country flag SVG icon
 *
 * @param {string} countryCode - ISO 3166-1 alpha-2 country code (e.g., 'AE', 'US')
 * @param {string|number} size - Width in pixels (height is auto-calculated at 3:2 ratio)
 * @param {string} className - Additional CSS classes
 */
export const FlagIcon = ({ countryCode, size = 20, className = "", ...props }) => {
  if (!countryCode) {
    return null;
  }

  const code = countryCode.toUpperCase();
  const FlagComponent = Flags[code];

  if (!FlagComponent) {
    // Fallback for missing flags - show a generic placeholder
    return (
      <svg
        width={size}
        height={size * 0.67} // 3:2 aspect ratio
        viewBox="0 0 60 40"
        className={`inline-block ${className}`}
        role="img"
        aria-label={`${countryCode} flag`}
        {...props}
      >
        <rect width="60" height="40" fill="#e5e7eb" rx="2" />
        <text
          x="30"
          y="25"
          textAnchor="middle"
          fontSize="16"
          fill="#9ca3af"
          fontWeight="bold"
        >
          {code}
        </text>
      </svg>
    );
  }

  return (
    <FlagComponent
      width={size}
      height={size * 0.67} // 3:2 aspect ratio
      className={`inline-block ${className}`}
      aria-label={`${countryCode} flag`}
      {...props}
    />
  );
};

export default FlagIcon;