'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FormContext = createContext();

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState('forward');
  const [isInitialized, setIsInitialized] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1 - Personal Information
    name: '',
    nationalId: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: '',
    // Step 2 - Family & Financial Info
    maritalStatus: '',
    dependents: '',
    employmentStatus: '',
    monthlyIncome: '',
    housingStatus: '',
    // Step 3 - Situation Descriptions
    currentSituation: '',
    employmentCircumstances: '',
    reasonForApplying: ''
  });

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('socialSupportFormData');
    const savedStep = localStorage.getItem('socialSupportFormStep');
    const wasSubmitted = localStorage.getItem('applicationSubmitted');

    // If application was submitted, reset everything
    if (wasSubmitted) {
      localStorage.removeItem('socialSupportFormData');
      localStorage.removeItem('socialSupportFormStep');
      localStorage.removeItem('applicationSubmitted');
      setIsInitialized(true);
      return; // Don't load saved data, keep fresh state
    }

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }

    // Mark as initialized after loading data
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever formData or currentStep changes (only after initialization)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('socialSupportFormData', JSON.stringify(formData));
      localStorage.setItem('socialSupportFormStep', currentStep.toString());
    }
  }, [formData, currentStep, isInitialized]);

  /**
   * Update individual field data with immediate save
   * This function is called when user leaves a field (onBlur)
   * Saves immediately to prevent data loss
   */
  const updateFieldData = useCallback((fieldName, fieldValue) => {
    // Only update if value actually changed
    if (formData[fieldName] !== fieldValue) {
      setFormData(prevData => ({
        ...prevData,
        [fieldName]: fieldValue
      }));
    }
  }, [formData]);

  const updateFormData = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    const newStep = Math.min(currentStep + 1, 4);
    if (newStep !== currentStep) {
      setIsTransitioning(true);
      setTransitionDirection('forward');
      
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Add a small delay to start the transition
      setTimeout(() => {
        setCurrentStep(newStep);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 200);
    }
  };

  const prevStep = () => {
    const newStep = Math.max(currentStep - 1, 1);
    if (newStep !== currentStep) {
      setIsTransitioning(true);
      setTransitionDirection('backward');
      
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Add a small delay to start the transition
      setTimeout(() => {
        setCurrentStep(newStep);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 200);
    }
  };

  const goToStep = (step) => {
    const targetStep = Math.max(1, Math.min(step, 4));
    if (targetStep !== currentStep) {
      setIsTransitioning(true);
      setTransitionDirection(targetStep > currentStep ? 'forward' : 'backward');
      
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      setTimeout(() => {
        setCurrentStep(targetStep);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 200);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      nationalId: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      city: '',
      state: '',
      country: '',
      phone: '',
      email: '',
      maritalStatus: '',
      dependents: '',
      employmentStatus: '',
      monthlyIncome: '',
      housingStatus: '',
      currentSituation: '',
      employmentCircumstances: '',
      reasonForApplying: ''
    });
    setCurrentStep(1);
    localStorage.removeItem('socialSupportFormData');
    localStorage.removeItem('socialSupportFormStep');
  };

  const value = {
    isTransitioning,
    transitionDirection,
    currentStep,
    setCurrentStep,
    formData,
    updateFormData,
    updateFieldData, // New function for individual field auto-save
    nextStep,
    prevStep,
    goToStep,
    resetForm
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};