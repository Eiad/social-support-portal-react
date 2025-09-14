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

    // Check that step numbers are shown (except completed ones show checkmarks)
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('shows step labels correctly', () => {
    renderWithProviders(<ModernProgressBar currentStep={1} totalSteps={4} />);

    // Check that step labels are present - using getAllBy to handle duplicates
    expect(screen.getAllByText(/Personal Information/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Family & Finance/i)).toBeInTheDocument();
    expect(screen.getByText(/Situation Descriptions/i)).toBeInTheDocument();
    expect(screen.getByText(/Review and Submit/i)).toBeInTheDocument();
  });

  it('shows current step information in header', () => {
    renderWithProviders(<ModernProgressBar currentStep={3} totalSteps={4} />);

    // The header should show the current step
    expect(screen.getByText(/Step\s+3\s+of\s+4/)).toBeInTheDocument();
    expect(screen.getAllByText(/Situation Descriptions/i).length).toBeGreaterThan(0);
  });
});