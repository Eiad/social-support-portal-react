import { render, screen } from '@testing-library/react';
import ProgressBar from '@/components/ProgressBar';
import { LanguageProvider } from '@/contexts/LanguageContext';

const renderWithLanguage = (component) => {
  return render(
    <LanguageProvider>
      {component}
    </LanguageProvider>
  );
};

describe('ProgressBar', () => {
  it('renders progress bar with correct step information', () => {
    renderWithLanguage(<ProgressBar currentStep={2} totalSteps={3} />);
    
    expect(screen.getByText(/Step 2/i)).toBeInTheDocument();
    expect(screen.getByText(/of 3/i)).toBeInTheDocument();
    expect(screen.getByText('67%')).toBeInTheDocument();
  });

  it('displays correct progress percentage', () => {
    renderWithLanguage(<ProgressBar currentStep={1} totalSteps={3} />);
    expect(screen.getByText('33%')).toBeInTheDocument();
  });

  it('highlights completed and current steps', () => {
    renderWithLanguage(<ProgressBar currentStep={2} totalSteps={3} />);
    
    const personalInfo = screen.getByText(/Personal Information/i);
    const familyInfo = screen.getByText(/Family & Financial Information/i);
    const situation = screen.getByText(/Situation Descriptions/i);
    
    expect(personalInfo).toHaveClass('text-blue-600');
    expect(familyInfo).toHaveClass('text-blue-600');
    expect(situation).toHaveClass('text-gray-400');
  });

  it('has correct ARIA attributes', () => {
    renderWithLanguage(<ProgressBar currentStep={2} totalSteps={3} />);
    
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '2');
    expect(progressbar).toHaveAttribute('aria-valuemin', '1');
    expect(progressbar).toHaveAttribute('aria-valuemax', '3');
  });
});