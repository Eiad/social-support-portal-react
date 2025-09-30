/**
 * Flag Icon Component using country-flag-icons library
 *
 * Professional SVG flag icons with tree-shaking support
 * Only imports the flags we actually use in our curated country list
 */

import React from 'react';

// Import React SVG components from country-flag-icons
import AE from 'country-flag-icons/react/3x2/AE';
import SA from 'country-flag-icons/react/3x2/SA';
import QA from 'country-flag-icons/react/3x2/QA';
import KW from 'country-flag-icons/react/3x2/KW';
import BH from 'country-flag-icons/react/3x2/BH';
import OM from 'country-flag-icons/react/3x2/OM';
import EG from 'country-flag-icons/react/3x2/EG';
import JO from 'country-flag-icons/react/3x2/JO';
import LB from 'country-flag-icons/react/3x2/LB';
import IQ from 'country-flag-icons/react/3x2/IQ';
import SY from 'country-flag-icons/react/3x2/SY';
import YE from 'country-flag-icons/react/3x2/YE';
import PS from 'country-flag-icons/react/3x2/PS';
import MA from 'country-flag-icons/react/3x2/MA';
import DZ from 'country-flag-icons/react/3x2/DZ';
import TN from 'country-flag-icons/react/3x2/TN';
import SD from 'country-flag-icons/react/3x2/SD';
import LY from 'country-flag-icons/react/3x2/LY';
import US from 'country-flag-icons/react/3x2/US';
import GB from 'country-flag-icons/react/3x2/GB';
import CA from 'country-flag-icons/react/3x2/CA';
import AU from 'country-flag-icons/react/3x2/AU';
import DE from 'country-flag-icons/react/3x2/DE';
import FR from 'country-flag-icons/react/3x2/FR';
import IT from 'country-flag-icons/react/3x2/IT';
import ES from 'country-flag-icons/react/3x2/ES';
import NL from 'country-flag-icons/react/3x2/NL';
import BE from 'country-flag-icons/react/3x2/BE';
import CH from 'country-flag-icons/react/3x2/CH';
import AT from 'country-flag-icons/react/3x2/AT';
import SE from 'country-flag-icons/react/3x2/SE';
import NO from 'country-flag-icons/react/3x2/NO';
import DK from 'country-flag-icons/react/3x2/DK';
import FI from 'country-flag-icons/react/3x2/FI';
import IE from 'country-flag-icons/react/3x2/IE';
import PT from 'country-flag-icons/react/3x2/PT';
import GR from 'country-flag-icons/react/3x2/GR';
import PL from 'country-flag-icons/react/3x2/PL';
import RO from 'country-flag-icons/react/3x2/RO';
import CZ from 'country-flag-icons/react/3x2/CZ';
import HU from 'country-flag-icons/react/3x2/HU';
import RU from 'country-flag-icons/react/3x2/RU';
import UA from 'country-flag-icons/react/3x2/UA';
import TR from 'country-flag-icons/react/3x2/TR';
import CN from 'country-flag-icons/react/3x2/CN';
import JP from 'country-flag-icons/react/3x2/JP';
import KR from 'country-flag-icons/react/3x2/KR';
import IN from 'country-flag-icons/react/3x2/IN';
import PK from 'country-flag-icons/react/3x2/PK';
import BD from 'country-flag-icons/react/3x2/BD';
import PH from 'country-flag-icons/react/3x2/PH';
import ID from 'country-flag-icons/react/3x2/ID';
import MY from 'country-flag-icons/react/3x2/MY';
import SG from 'country-flag-icons/react/3x2/SG';
import TH from 'country-flag-icons/react/3x2/TH';
import VN from 'country-flag-icons/react/3x2/VN';
import NZ from 'country-flag-icons/react/3x2/NZ';
import LK from 'country-flag-icons/react/3x2/LK';
import NP from 'country-flag-icons/react/3x2/NP';
import IR from 'country-flag-icons/react/3x2/IR';
import AF from 'country-flag-icons/react/3x2/AF';
import ZA from 'country-flag-icons/react/3x2/ZA';
import NG from 'country-flag-icons/react/3x2/NG';
import KE from 'country-flag-icons/react/3x2/KE';
import ET from 'country-flag-icons/react/3x2/ET';
import GH from 'country-flag-icons/react/3x2/GH';
import TZ from 'country-flag-icons/react/3x2/TZ';
import UG from 'country-flag-icons/react/3x2/UG';
import MX from 'country-flag-icons/react/3x2/MX';
import BR from 'country-flag-icons/react/3x2/BR';
import AR from 'country-flag-icons/react/3x2/AR';
import CL from 'country-flag-icons/react/3x2/CL';
import CO from 'country-flag-icons/react/3x2/CO';
import PE from 'country-flag-icons/react/3x2/PE';
import VE from 'country-flag-icons/react/3x2/VE';
import HR from 'country-flag-icons/react/3x2/HR';
import RS from 'country-flag-icons/react/3x2/RS';
import BG from 'country-flag-icons/react/3x2/BG';
import SK from 'country-flag-icons/react/3x2/SK';
import SI from 'country-flag-icons/react/3x2/SI';

/**
 * Flag component mapper
 * Maps ISO 3166-1 alpha-2 country codes to their flag components
 */
const flagComponents = {
  AE, SA, QA, KW, BH, OM, EG, JO, LB, IQ, SY, YE, PS, MA, DZ, TN, SD, LY,
  US, GB, CA, AU, DE, FR, IT, ES, NL, BE, CH, AT, SE, NO, DK, FI, IE, PT, GR,
  PL, RO, CZ, HU, RU, UA, TR,
  CN, JP, KR, IN, PK, BD, PH, ID, MY, SG, TH, VN, NZ, LK, NP, IR, AF,
  ZA, NG, KE, ET, GH, TZ, UG,
  MX, BR, AR, CL, CO, PE, VE,
  HR, RS, BG, SK, SI
};

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
  const FlagComponent = flagComponents[countryCode?.toUpperCase()];

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
          {countryCode?.toUpperCase() || '?'}
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