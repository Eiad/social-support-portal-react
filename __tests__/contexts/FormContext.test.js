import { renderHook, act } from '@testing-library/react';
import { FormProvider, useFormContext } from '@/contexts/FormContext';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', { value: jest.fn() });

describe('FormContext', () => {
  const wrapper = ({ children }) => <FormProvider>{children}</FormProvider>;

  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
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
      jest.advanceTimersByTime(300); // Advance past the setTimeout delays
    });
    expect(result.current.currentStep).toBe(2);

    act(() => {
      result.current.nextStep();
      jest.advanceTimersByTime(300);
    });
    expect(result.current.currentStep).toBe(3);

    act(() => {
      result.current.nextStep();
      jest.advanceTimersByTime(300);
    });
    expect(result.current.currentStep).toBe(4);

    // Should not go beyond step 4
    act(() => {
      result.current.nextStep();
      jest.advanceTimersByTime(300);
    });
    expect(result.current.currentStep).toBe(4);

    act(() => {
      result.current.prevStep();
      jest.advanceTimersByTime(300);
    });
    expect(result.current.currentStep).toBe(3);

    act(() => {
      result.current.prevStep();
      jest.advanceTimersByTime(300);
    });
    expect(result.current.currentStep).toBe(2);

    act(() => {
      result.current.prevStep();
      jest.advanceTimersByTime(300);
    });
    expect(result.current.currentStep).toBe(1);

    // Should not go below step 1
    act(() => {
      result.current.prevStep();
      jest.advanceTimersByTime(300);
    });
    expect(result.current.currentStep).toBe(1);
  });

  it('saves data to localStorage', () => {
    const { result } = renderHook(() => useFormContext(), { wrapper });

    act(() => {
      result.current.updateFormData({ name: 'John Doe' });
      result.current.setCurrentStep(2);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'socialSupportFormData',
      expect.stringContaining('John Doe')
    );
    expect(localStorageMock.setItem).toHaveBeenCalledWith('socialSupportFormStep', '2');
  });

  it('loads saved data from localStorage on mount', () => {
    const savedData = {
      name: 'Saved Name',
      email: 'saved@example.com'
    };

    localStorageMock.getItem.mockImplementation((key) => {
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
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('socialSupportFormData');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('socialSupportFormStep');
  });
});