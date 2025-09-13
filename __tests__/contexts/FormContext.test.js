import { renderHook, act } from '@testing-library/react';
import { FormProvider, useFormContext } from '@/contexts/FormContext';

describe('FormContext', () => {
  const wrapper = ({ children }) => <FormProvider>{children}</FormProvider>;

  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useFormContext(), { wrapper });
    
    expect(result.current.currentStep).toBe(1);
    expect(result.current.formData.name).toBe('');
    expect(result.current.formData.email).toBe('');
  });

  it('updates form data correctly', () => {
    const { result } = renderHook(() => useFormContext(), { wrapper });
    
    act(() => {
      result.current.updateFormData({ name: 'John Doe', email: 'john@example.com' });
    });
    
    expect(result.current.formData.name).toBe('John Doe');
    expect(result.current.formData.email).toBe('john@example.com');
  });

  it('navigates through steps correctly', () => {
    const { result } = renderHook(() => useFormContext(), { wrapper });
    
    expect(result.current.currentStep).toBe(1);
    
    act(() => {
      result.current.nextStep();
    });
    expect(result.current.currentStep).toBe(2);
    
    act(() => {
      result.current.nextStep();
    });
    expect(result.current.currentStep).toBe(3);
    
    // Should not go beyond step 3
    act(() => {
      result.current.nextStep();
    });
    expect(result.current.currentStep).toBe(3);
    
    act(() => {
      result.current.prevStep();
    });
    expect(result.current.currentStep).toBe(2);
    
    act(() => {
      result.current.prevStep();
    });
    expect(result.current.currentStep).toBe(1);
    
    // Should not go below step 1
    act(() => {
      result.current.prevStep();
    });
    expect(result.current.currentStep).toBe(1);
  });

  it('saves data to localStorage', () => {
    const { result } = renderHook(() => useFormContext(), { wrapper });
    
    act(() => {
      result.current.updateFormData({ name: 'John Doe' });
      result.current.setCurrentStep(2);
    });
    
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'socialSupportFormData',
      expect.stringContaining('John Doe')
    );
    expect(localStorage.setItem).toHaveBeenCalledWith('socialSupportFormStep', '2');
  });

  it('loads saved data from localStorage on mount', () => {
    const savedData = {
      name: 'Saved Name',
      email: 'saved@example.com'
    };
    
    localStorage.getItem.mockImplementation((key) => {
      if (key === 'socialSupportFormData') return JSON.stringify(savedData);
      if (key === 'socialSupportFormStep') return '2';
      return null;
    });
    
    const { result } = renderHook(() => useFormContext(), { wrapper });
    
    expect(result.current.formData.name).toBe('Saved Name');
    expect(result.current.formData.email).toBe('saved@example.com');
    expect(result.current.currentStep).toBe(2);
  });

  it('resets form data and step', () => {
    const { result } = renderHook(() => useFormContext(), { wrapper });
    
    act(() => {
      result.current.updateFormData({ name: 'John Doe' });
      result.current.setCurrentStep(3);
    });
    
    expect(result.current.formData.name).toBe('John Doe');
    expect(result.current.currentStep).toBe(3);
    
    act(() => {
      result.current.resetForm();
    });
    
    expect(result.current.formData.name).toBe('');
    expect(result.current.currentStep).toBe(1);
    expect(localStorage.removeItem).toHaveBeenCalledWith('socialSupportFormData');
    expect(localStorage.removeItem).toHaveBeenCalledWith('socialSupportFormStep');
  });
});