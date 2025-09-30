'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { countries, searchCountries, getPopularCountries } from '@/data/countries';
import FlagIcon from '@/components/icons/FlagIcons';

export default function SearchableCountryDropdown({
  value,
  onChange,
  onBlur,
  error,
  className = '',
  placeholder,
  ...props
}) {
  const { t, language, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const searchInputRef = useRef(null);

  // Get selected country details
  const selectedCountry = value ? countries.find(c => c.code === value) : null;
  const displayName = selectedCountry
    ? (language === 'ar' ? selectedCountry.nameAr : selectedCountry.name)
    : '';

  // Update filtered countries when search query changes
  useEffect(() => {
    const results = searchCountries(searchQuery, language);
    setFilteredCountries(results);
    setHighlightedIndex(-1);
  }, [searchQuery, language]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery('');
        if (onBlur) onBlur(value);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value, onBlur]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery('');
        inputRef.current?.focus();
        break;

      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredCountries.length - 1 ? prev + 1 : 0
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : filteredCountries.length - 1
        );
        break;

      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredCountries[highlightedIndex]) {
          handleCountrySelect(filteredCountries[highlightedIndex]);
        }
        break;

      case 'Tab':
        setIsOpen(false);
        setSearchQuery('');
        break;
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex];
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [highlightedIndex]);

  const handleCountrySelect = (country) => {
    onChange(country.code);
    setIsOpen(false);
    setSearchQuery('');
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    onChange('');
    inputRef.current?.focus();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchQuery('');
    }
  };

  // Get display countries (popular first, then filtered results)
  const popularCountries = getPopularCountries();
  const allOtherCountries = countries.filter(c => !c.popular);
  const displayCountries = searchQuery
    ? filteredCountries
    : [...popularCountries, ...allOtherCountries];

  return (
    <div ref={dropdownRef} className="relative">
      {/* Main Input */}
      <div
        ref={inputRef}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={`form-input form-input-animated form-input-smooth cursor-pointer flex items-center justify-between min-h-[48px] country-dropdown-no-focus ${
          error ? 'border-red-300' : ''
        } ${className}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        role="combobox"
        {...props}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {selectedCountry ? (
            <>
              <FlagIcon countryCode={selectedCountry.code} size={20} className="flex-shrink-0" />
              <span className="truncate text-gray-900 font-medium">
                {displayName}
              </span>
            </>
          ) : (
            <span className="text-gray-500 truncate">
              {placeholder || t('countryPlaceholder')}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          {selectedCountry && (
            <button
              type="button"
              onClick={clearSelection}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Clear selection"
            >
              <X size={14} className="text-gray-400" />
            </button>
          )}
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden animate-scaleIn`}>
          {/* Search Input */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search size={16} className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('search') || 'Search countries...'}
                className={`w-full ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? 'left-2' : 'right-2'} p-1 hover:bg-gray-100 rounded-full transition-colors`}
                >
                  <X size={12} className="text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Countries List */}
          <div className="max-h-60 overflow-y-auto">
            {displayCountries.length > 0 ? (
              <ul ref={listRef} role="listbox" className="py-1">
                {!searchQuery && popularCountries.length > 0 && (
                  <li className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide bg-gray-50">
                    {t('popularCountries') || 'Popular Countries'}
                  </li>
                )}
                {displayCountries.map((country, index) => {
                  const isHighlighted = index === highlightedIndex;
                  const isSelected = country.code === value;
                  const countryName = language === 'ar' ? country.nameAr : country.name;

                  // Show "All Countries" divider after popular countries
                  const showAllCountriesDivider = !searchQuery &&
                                                  index === popularCountries.length &&
                                                  popularCountries.length > 0 &&
                                                  allOtherCountries.length > 0;

                  return (
                    <React.Fragment key={country.code}>
                      {showAllCountriesDivider && (
                        <li className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide bg-gray-50 border-t border-gray-100">
                          {t('allCountries') || 'All Countries'}
                        </li>
                      )}
                      <li
                        onClick={() => handleCountrySelect(country)}
                        className={`px-3 py-2 cursor-pointer flex items-center gap-3 transition-colors duration-150 ${
                          isHighlighted
                            ? 'bg-blue-50 text-blue-900'
                            : isSelected
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        role="option"
                        aria-selected={isSelected}
                      >
                        <FlagIcon countryCode={country.code} size={20} className="flex-shrink-0" />
                        <span className="truncate font-medium">
                          {countryName}
                        </span>
                        {searchQuery && (
                          <span className="text-xs text-gray-500 ml-auto flex-shrink-0">
                            {country.code}
                          </span>
                        )}
                      </li>
                    </React.Fragment>
                  );
                })}
              </ul>
            ) : (
              <div className="px-3 py-6 text-center text-gray-500">
                <Search size={24} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm">{t('noCountriesFound') || 'No countries found'}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {t('tryDifferentSearch') || 'Try a different search term'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}