import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AIAssistModal from '@/components/AIAssistModal';
import { LanguageProvider } from '@/contexts/LanguageContext';

// Mock the Skeleton component
jest.mock('@/components/Skeleton', () => ({
  AILoadingSkeleton: ({ message }) => <div data-testid="loading-skeleton">{message}</div>
}));

const renderWithLanguageProvider = (component, lang = 'en') => {
  return render(
    <LanguageProvider lang={lang}>
      {component}
    </LanguageProvider>
  );
};

describe('AIAssistModal Component', () => {
  const mockOnApply = jest.fn();
  const mockOnRegenerate = jest.fn();
  const mockOnDiscard = jest.fn();
  const testSuggestion = 'This is a professional content suggestion for your application.';

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock body style for scroll lock
    document.body.style = {};
  });

  afterEach(() => {
    // Clean up body style
    document.body.style.overflow = 'unset';
  });

  it('renders loading state correctly', () => {
    renderWithLanguageProvider(
      <AIAssistModal
        suggestion=""
        onApply={mockOnApply}
        onRegenerate={mockOnRegenerate}
        onDiscard={mockOnDiscard}
        isLoading={true}
      />
    );

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    expect(screen.getByText('Crafting professional content...')).toBeInTheDocument();
  });

  it('renders loading state in Arabic correctly', () => {
    renderWithLanguageProvider(
      <AIAssistModal
        suggestion=""
        onApply={mockOnApply}
        onRegenerate={mockOnRegenerate}
        onDiscard={mockOnDiscard}
        isLoading={true}
      />,
      'ar'
    );

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    expect(screen.getByText('جاري صياغة محتوى احترافي...')).toBeInTheDocument();
  });

  it('renders suggestion modal correctly in English', () => {
    renderWithLanguageProvider(
      <AIAssistModal
        suggestion={testSuggestion}
        onApply={mockOnApply}
        onRegenerate={mockOnRegenerate}
        onDiscard={mockOnDiscard}
        isLoading={false}
      />
    );

    expect(screen.getByText('Professional Content Suggestion')).toBeInTheDocument();
    expect(screen.getByText("We've crafted professional and compelling content for your application:")).toBeInTheDocument();
    expect(screen.getByText(testSuggestion)).toBeInTheDocument();
    expect(screen.getByText('Apply Text')).toBeInTheDocument();
    expect(screen.getByText('Regenerate')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('renders suggestion modal correctly in Arabic', () => {
    renderWithLanguageProvider(
      <AIAssistModal
        suggestion={testSuggestion}
        onApply={mockOnApply}
        onRegenerate={mockOnRegenerate}
        onDiscard={mockOnDiscard}
        isLoading={false}
      />,
      'ar'
    );

    expect(screen.getByText('المحتوى الاحترافي المقترح')).toBeInTheDocument();
    expect(screen.getByText('قمنا بصياغة محتوى احترافي ومقنع لطلبك:')).toBeInTheDocument();
    expect(screen.getByText(testSuggestion)).toBeInTheDocument();
    expect(screen.getByText('تطبيق النص')).toBeInTheDocument();
    expect(screen.getByText('إعادة إنشاء')).toBeInTheDocument();
    expect(screen.getByText('إلغاء')).toBeInTheDocument();
  });

  it('calls onApply when Apply button is clicked', () => {
    renderWithLanguageProvider(
      <AIAssistModal
        suggestion={testSuggestion}
        onApply={mockOnApply}
        onRegenerate={mockOnRegenerate}
        onDiscard={mockOnDiscard}
        isLoading={false}
      />
    );

    const applyButton = screen.getByText('Apply Text');
    fireEvent.click(applyButton);

    expect(mockOnApply).toHaveBeenCalledTimes(1);
  });

  it('calls onRegenerate when Regenerate button is clicked', () => {
    renderWithLanguageProvider(
      <AIAssistModal
        suggestion={testSuggestion}
        onApply={mockOnApply}
        onRegenerate={mockOnRegenerate}
        onDiscard={mockOnDiscard}
        isLoading={false}
      />
    );

    const regenerateButton = screen.getByText('Regenerate');
    fireEvent.click(regenerateButton);

    expect(mockOnRegenerate).toHaveBeenCalledTimes(1);
  });

  it('calls onDiscard when Cancel button is clicked', () => {
    renderWithLanguageProvider(
      <AIAssistModal
        suggestion={testSuggestion}
        onApply={mockOnApply}
        onRegenerate={mockOnRegenerate}
        onDiscard={mockOnDiscard}
        isLoading={false}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnDiscard).toHaveBeenCalledTimes(1);
  });

  it('locks body scroll when mounted', () => {
    renderWithLanguageProvider(
      <AIAssistModal
        suggestion={testSuggestion}
        onApply={mockOnApply}
        onRegenerate={mockOnRegenerate}
        onDiscard={mockOnDiscard}
        isLoading={false}
      />
    );

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('unlocks body scroll when unmounted', () => {
    const { unmount } = renderWithLanguageProvider(
      <AIAssistModal
        suggestion={testSuggestion}
        onApply={mockOnApply}
        onRegenerate={mockOnRegenerate}
        onDiscard={mockOnDiscard}
        isLoading={false}
      />
    );

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('unset');
  });

  it('displays suggestion text with proper formatting', () => {
    const multilineSuggestion = 'Line 1\n\nLine 2\nLine 3';

    renderWithLanguageProvider(
      <AIAssistModal
        suggestion={multilineSuggestion}
        onApply={mockOnApply}
        onRegenerate={mockOnRegenerate}
        onDiscard={mockOnDiscard}
        isLoading={false}
      />
    );

    // Find the p element that contains the suggestion text
    const suggestionElement = screen.getByText((content, element) => {
      return element.tagName === 'P' && element.textContent === multilineSuggestion;
    });
    expect(suggestionElement).toHaveClass('whitespace-pre-wrap');
  });

  it('renders with proper responsive classes', () => {
    renderWithLanguageProvider(
      <AIAssistModal
        suggestion={testSuggestion}
        onApply={mockOnApply}
        onRegenerate={mockOnRegenerate}
        onDiscard={mockOnDiscard}
        isLoading={false}
      />
    );

    const modal = screen.getByText('Professional Content Suggestion').closest('.bg-white');
    expect(modal).toHaveClass('max-w-2xl', 'max-h-[85vh]', 'sm:max-h-[70vh]');
  });

  it('has proper accessibility attributes', () => {
    renderWithLanguageProvider(
      <AIAssistModal
        suggestion={testSuggestion}
        onApply={mockOnApply}
        onRegenerate={mockOnRegenerate}
        onDiscard={mockOnDiscard}
        isLoading={false}
      />
    );

    // Find buttons by their parent element which has the classes
    const applyButton = screen.getByText('Apply Text').closest('button');
    const regenerateButton = screen.getByText('Regenerate').closest('button');

    expect(applyButton).toHaveClass('focus:outline-none', 'focus:ring-2');
    expect(regenerateButton).toHaveClass('focus:outline-none', 'focus:ring-2');
  });
});