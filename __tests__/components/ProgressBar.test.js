import { render, screen } from '@testing-library/react';
import ModernProgressBar from '@/components/ModernProgressBar';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { FormProvider } from '@/contexts/FormContext';

const renderWithProviders = (component) => {
  return render(
    <LanguageProvider>
      <FormProvider>
        {component}
      </FormProvider>
    </LanguageProvider>
  );
};

describe('ModernProgressBar', () => {
  it('renders progress bar with correct step information', () => {
    renderWithProviders(<ModernProgressBar currentStep={2} totalSteps={4} />);

    // Check step header shows current step
    expect(screen.getByText(/Step\s+2\s+of\s+4/)).toBeInTheDocument();

    // Verify the progress bar renders (components use icons instead of numbers)
    expect(screen.getByText('Family & Financial Details')).toBeInTheDocument();
  });

  it('shows step labels correctly', () => {
    renderWithProviders(<ModernProgressBar currentStep={1} totalSteps={4} />);

    // Check that step labels are present - using getAllBy to handle duplicates
    expect(screen.getAllByText(/Personal Information/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Family & Finance/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/My Situation/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Review & Send/i).length).toBeGreaterThan(0);
  });

  it('shows current step information in header', () => {
    renderWithProviders(<ModernProgressBar currentStep={3} totalSteps={4} />);

    // The header should show the current step
    expect(screen.getByText(/Step\s+3\s+of\s+4/)).toBeInTheDocument();
    expect(screen.getByText(/Situation Description/i)).toBeInTheDocument();
  });
});