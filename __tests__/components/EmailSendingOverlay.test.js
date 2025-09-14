import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmailSendingOverlay from '@/components/EmailSendingOverlay';
import { LanguageProvider } from '@/contexts/LanguageContext';
import * as CelebrationEffects from '@/components/CelebrationEffects';

// Mock the celebration effects
jest.mock('@/components/CelebrationEffects', () => ({
  triggerFormCompletion: jest.fn()
}));

const mockTranslations = {
  submittingApplication: 'Submitting Application',
  processingInfo: 'Processing your information...',
  sendingConfirmation: 'Sending Confirmation',
  sendingToEmail: 'Sending confirmation to your email...',
  emailSentSuccess: 'Email Sent Successfully!',
  confirmationSent: 'Confirmation has been sent to your inbox',
  applicationSubmittedSuccess: 'Application Submitted Successfully!',
  applicationSuccessDesc: 'Your application has been successfully submitted.',
  sendingTo: 'Sending to:',
  applicationNumber: 'Your application number is'
};

const renderWithLanguageProvider = (component, lang = 'en') => {
  return render(
    <LanguageProvider lang={lang}>
      {component}
    </LanguageProvider>
  );
};

describe('EmailSendingOverlay Component', () => {
  const mockOnComplete = jest.fn();
  const testEmail = 'test@example.com';
  const testAppNumber = 'APP-123456';

  beforeEach(() => {
    jest.clearAllMocks();
    CelebrationEffects.triggerFormCompletion.mockClear();
  });

  it('renders submitting phase correctly', () => {
    renderWithLanguageProvider(
      <EmailSendingOverlay
        email={testEmail}
        phase="submitting"
        onComplete={mockOnComplete}
        applicationNumber={testAppNumber}
      />
    );

    expect(screen.getByText(mockTranslations.submittingApplication)).toBeInTheDocument();
    expect(screen.getByText(mockTranslations.processingInfo)).toBeInTheDocument();
    expect(screen.queryByText(testEmail)).not.toBeInTheDocument();
  });

  it('renders sending phase correctly', () => {
    renderWithLanguageProvider(
      <EmailSendingOverlay
        email={testEmail}
        phase="sending"
        onComplete={mockOnComplete}
        applicationNumber={testAppNumber}
      />
    );

    expect(screen.getByText(mockTranslations.sendingConfirmation)).toBeInTheDocument();
    expect(screen.getByText(mockTranslations.sendingToEmail)).toBeInTheDocument();
    expect(screen.getByText(testEmail)).toBeInTheDocument();
  });

  it('renders sent phase correctly', () => {
    renderWithLanguageProvider(
      <EmailSendingOverlay
        email={testEmail}
        phase="sent"
        onComplete={mockOnComplete}
        applicationNumber={testAppNumber}
      />
    );

    expect(screen.getByText(mockTranslations.emailSentSuccess)).toBeInTheDocument();
    expect(screen.getByText(mockTranslations.confirmationSent)).toBeInTheDocument();
    expect(screen.getByText(testEmail)).toBeInTheDocument();
  });

  it('renders success phase correctly', () => {
    renderWithLanguageProvider(
      <EmailSendingOverlay
        email={testEmail}
        phase="success"
        onComplete={mockOnComplete}
        applicationNumber={testAppNumber}
      />
    );

    expect(screen.getByText(mockTranslations.applicationSubmittedSuccess)).toBeInTheDocument();
    expect(screen.getByText(mockTranslations.applicationSuccessDesc)).toBeInTheDocument();
    expect(screen.getByText(testAppNumber)).toBeInTheDocument();
    expect(screen.getByText(mockTranslations.applicationNumber)).toBeInTheDocument();
  });

  it('shows close button only in success phase', () => {
    const { rerender } = renderWithLanguageProvider(
      <EmailSendingOverlay
        email={testEmail}
        phase="submitting"
        onComplete={mockOnComplete}
        applicationNumber={testAppNumber}
      />
    );

    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();

    rerender(
      <LanguageProvider lang="en">
        <EmailSendingOverlay
          email={testEmail}
          phase="success"
          onComplete={mockOnComplete}
          applicationNumber={testAppNumber}
        />
      </LanguageProvider>
    );

    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('calls onComplete when close button is clicked in success phase', () => {
    renderWithLanguageProvider(
      <EmailSendingOverlay
        email={testEmail}
        phase="success"
        onComplete={mockOnComplete}
        applicationNumber={testAppNumber}
      />
    );

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(mockOnComplete).toHaveBeenCalled();
  });

  it('triggers celebration effects in success phase', async () => {
    renderWithLanguageProvider(
      <EmailSendingOverlay
        email={testEmail}
        phase="success"
        onComplete={mockOnComplete}
        applicationNumber={testAppNumber}
      />
    );

    await waitFor(() => {
      expect(CelebrationEffects.triggerFormCompletion).toHaveBeenCalled();
    }, { timeout: 1000 });
  });

  it('updates phase correctly when prop changes', () => {
    const { rerender } = renderWithLanguageProvider(
      <EmailSendingOverlay
        email={testEmail}
        phase="submitting"
        onComplete={mockOnComplete}
        applicationNumber={testAppNumber}
      />
    );

    expect(screen.getByText(mockTranslations.submittingApplication)).toBeInTheDocument();

    rerender(
      <LanguageProvider lang="en">
        <EmailSendingOverlay
          email={testEmail}
          phase="sending"
          onComplete={mockOnComplete}
          applicationNumber={testAppNumber}
        />
      </LanguageProvider>
    );

    expect(screen.getByText(mockTranslations.sendingConfirmation)).toBeInTheDocument();
  });

  it('shows progress dots with correct states', () => {
    renderWithLanguageProvider(
      <EmailSendingOverlay
        email={testEmail}
        phase="sending"
        onComplete={mockOnComplete}
        applicationNumber={testAppNumber}
      />
    );

    const progressDots = document.querySelectorAll('.rounded-full');
    const visibleDots = Array.from(progressDots).filter(dot =>
      dot.classList.contains('w-2') || dot.classList.contains('w-8')
    );

    expect(visibleDots).toHaveLength(4);
  });

  it('handles missing email gracefully', () => {
    renderWithLanguageProvider(
      <EmailSendingOverlay
        email=""
        phase="sending"
        onComplete={mockOnComplete}
        applicationNumber={testAppNumber}
      />
    );

    expect(screen.getByText(mockTranslations.sendingConfirmation)).toBeInTheDocument();
    expect(screen.queryByText(mockTranslations.sendingTo)).not.toBeInTheDocument();
  });

  it('handles missing application number gracefully', () => {
    renderWithLanguageProvider(
      <EmailSendingOverlay
        email={testEmail}
        phase="success"
        onComplete={mockOnComplete}
        applicationNumber=""
      />
    );

    expect(screen.getByText(mockTranslations.applicationSubmittedSuccess)).toBeInTheDocument();
    expect(screen.queryByText(mockTranslations.applicationNumber)).not.toBeInTheDocument();
  });
});