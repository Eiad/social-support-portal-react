// Curated list of 80 popular countries for demo purposes
// Using country-flag-icons library for reliable cross-platform flag display
export const countries = [
  // Popular Countries (Top 10 - shown under "Popular Countries" section)
  { code: 'AE', name: 'United Arab Emirates', nameAr: 'الإمارات العربية المتحدة', popular: true },
  { code: 'SA', name: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية', popular: true },
  { code: 'QA', name: 'Qatar', nameAr: 'قطر', popular: true },
  { code: 'KW', name: 'Kuwait', nameAr: 'الكويت', popular: true },
  { code: 'BH', name: 'Bahrain', nameAr: 'البحرين', popular: true },
  { code: 'OM', name: 'Oman', nameAr: 'عُمان', popular: true },
  { code: 'EG', name: 'Egypt', nameAr: 'مصر', popular: true },
  { code: 'JO', name: 'Jordan', nameAr: 'الأردن', popular: true },
  { code: 'LB', name: 'Lebanon', nameAr: 'لبنان', popular: true },
  { code: 'IQ', name: 'Iraq', nameAr: 'العراق', popular: true },

  // All Other Countries (shown under "All Countries" section)
  { code: 'SY', name: 'Syria', nameAr: 'سوريا' },
  { code: 'YE', name: 'Yemen', nameAr: 'اليمن' },
  { code: 'PS', name: 'Palestine', nameAr: 'فلسطين' },
  { code: 'MA', name: 'Morocco', nameAr: 'المغرب' },
  { code: 'DZ', name: 'Algeria', nameAr: 'الجزائر' },
  { code: 'TN', name: 'Tunisia', nameAr: 'تونس' },
  { code: 'SD', name: 'Sudan', nameAr: 'السودان' },
  { code: 'LY', name: 'Libya', nameAr: 'ليبيا' },
  { code: 'US', name: 'United States', nameAr: 'الولايات المتحدة الأمريكية' },
  { code: 'GB', name: 'United Kingdom', nameAr: 'المملكة المتحدة' },
  { code: 'CA', name: 'Canada', nameAr: 'كندا' },
  { code: 'AU', name: 'Australia', nameAr: 'أستراليا' },
  { code: 'DE', name: 'Germany', nameAr: 'ألمانيا' },
  { code: 'FR', name: 'France', nameAr: 'فرنسا' },
  { code: 'IT', name: 'Italy', nameAr: 'إيطاليا' },
  { code: 'ES', name: 'Spain', nameAr: 'إسبانيا' },
  { code: 'NL', name: 'Netherlands', nameAr: 'هولندا' },
  { code: 'BE', name: 'Belgium', nameAr: 'بلجيكا' },
  { code: 'CH', name: 'Switzerland', nameAr: 'سويسرا' },
  { code: 'AT', name: 'Austria', nameAr: 'النمسا' },
  { code: 'SE', name: 'Sweden', nameAr: 'السويد' },
  { code: 'NO', name: 'Norway', nameAr: 'النرويج' },
  { code: 'DK', name: 'Denmark', nameAr: 'الدنمارك' },
  { code: 'FI', name: 'Finland', nameAr: 'فنلندا' },
  { code: 'IE', name: 'Ireland', nameAr: 'أيرلندا' },
  { code: 'PT', name: 'Portugal', nameAr: 'البرتغال' },
  { code: 'GR', name: 'Greece', nameAr: 'اليونان' },
  { code: 'PL', name: 'Poland', nameAr: 'بولندا' },
  { code: 'RO', name: 'Romania', nameAr: 'رومانيا' },
  { code: 'CZ', name: 'Czech Republic', nameAr: 'جمهورية التشيك' },
  { code: 'HU', name: 'Hungary', nameAr: 'المجر' },
  { code: 'RU', name: 'Russia', nameAr: 'روسيا' },
  { code: 'UA', name: 'Ukraine', nameAr: 'أوكرانيا' },
  { code: 'TR', name: 'Turkey', nameAr: 'تركيا' },
  { code: 'CN', name: 'China', nameAr: 'الصين' },
  { code: 'JP', name: 'Japan', nameAr: 'اليابان' },
  { code: 'KR', name: 'South Korea', nameAr: 'كوريا الجنوبية' },
  { code: 'IN', name: 'India', nameAr: 'الهند' },
  { code: 'PK', name: 'Pakistan', nameAr: 'باكستان' },
  { code: 'BD', name: 'Bangladesh', nameAr: 'بنغلاديش' },
  { code: 'PH', name: 'Philippines', nameAr: 'الفلبين' },
  { code: 'ID', name: 'Indonesia', nameAr: 'إندونيسيا' },
  { code: 'MY', name: 'Malaysia', nameAr: 'ماليزيا' },
  { code: 'SG', name: 'Singapore', nameAr: 'سنغافورة' },
  { code: 'TH', name: 'Thailand', nameAr: 'تايلاند' },
  { code: 'VN', name: 'Vietnam', nameAr: 'فيتنام' },
  { code: 'NZ', name: 'New Zealand', nameAr: 'نيوزيلندا' },
  { code: 'LK', name: 'Sri Lanka', nameAr: 'سريلانكا' },
  { code: 'NP', name: 'Nepal', nameAr: 'نيبال' },
  { code: 'IR', name: 'Iran', nameAr: 'إيران' },
  { code: 'AF', name: 'Afghanistan', nameAr: 'أفغانستان' },
  { code: 'ZA', name: 'South Africa', nameAr: 'جنوب أفريقيا' },
  { code: 'NG', name: 'Nigeria', nameAr: 'نيجيريا' },
  { code: 'KE', name: 'Kenya', nameAr: 'كينيا' },
  { code: 'ET', name: 'Ethiopia', nameAr: 'إثيوبيا' },
  { code: 'GH', name: 'Ghana', nameAr: 'غانا' },
  { code: 'TZ', name: 'Tanzania', nameAr: 'تنزانيا' },
  { code: 'UG', name: 'Uganda', nameAr: 'أوغندا' },
  { code: 'MX', name: 'Mexico', nameAr: 'المكسيك' },
  { code: 'BR', name: 'Brazil', nameAr: 'البرازيل' },
  { code: 'AR', name: 'Argentina', nameAr: 'الأرجنتين' },
  { code: 'CL', name: 'Chile', nameAr: 'تشيلي' },
  { code: 'CO', name: 'Colombia', nameAr: 'كولومبيا' },
  { code: 'PE', name: 'Peru', nameAr: 'بيرو' },
  { code: 'VE', name: 'Venezuela', nameAr: 'فنزويلا' },
  { code: 'HR', name: 'Croatia', nameAr: 'كرواتيا' },
  { code: 'RS', name: 'Serbia', nameAr: 'صربيا' },
  { code: 'BG', name: 'Bulgaria', nameAr: 'بلغاريا' },
  { code: 'SK', name: 'Slovakia', nameAr: 'سلوفاكيا' },
  { code: 'SI', name: 'Slovenia', nameAr: 'سلوفينيا' }
];

// Helper functions
export const getCountryByCode = (code) => {
  return countries.find(country => country.code === code);
};

export const getPopularCountries = () => {
  return countries.filter(country => country.popular);
};

export const searchCountries = (query, language = 'en') => {
  if (!query || query.trim() === '') return countries;

  const searchTerm = query.toLowerCase().trim();

  return countries.filter(country => {
    const nameField = language === 'ar' ? 'nameAr' : 'name';
    const name = country[nameField].toLowerCase();
    const code = country.code.toLowerCase();

    return name.includes(searchTerm) ||
           code.includes(searchTerm) ||
           country.name.toLowerCase().includes(searchTerm) ||
           country.nameAr.toLowerCase().includes(searchTerm);
  });
};