import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Step1 from '@/components/FormSteps/Step1';
import { FormProvider } from '@/contexts/FormContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

const renderWithProviders = (component) => {
  return render(
    <LanguageProvider>
      <FormProvider>
        {component}
      </FormProvider>
    </LanguageProvider>
  );
};

describe('Step1 - Personal Information', () => {
  it('renders all required form fields', () => {
    renderWithProviders(<Step1 />);
    
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/National ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    renderWithProviders(<Step1 />);
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      const errorMessages = screen.getAllByText(/This field is required/i);
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  it('validates email format', async () => {
    renderWithProviders(<Step1 />);
    
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
  });

  it('validates phone number format', async () => {
    renderWithProviders(<Step1 />);
    
    const phoneInput = screen.getByLabelText(/Phone/i);
    fireEvent.change(phoneInput, { target: { value: '123' } });
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Invalid phone number/i)).toBeInTheDocument();
    });
  });

  it('fills form with valid data and proceeds to next step', async () => {
    const { container } = renderWithProviders(<Step1 />);
    
    // Fill in all required fields
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/National ID/i), { target: { value: '123456789' } });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });
    fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText(/State/i), { target: { value: 'NY' } });
    fireEvent.change(screen.getByLabelText(/Country/i), { target: { value: 'USA' } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '555-123-4567' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    
    // Should not show any errors
    await waitFor(() => {
      expect(screen.queryByText(/This field is required/i)).not.toBeInTheDocument();
    });
  });
});