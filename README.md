# Gov Social Support Portal

**Executive Summary:** A modern, accessible government social support portal featuring a 4-step form wizard with **AI-powered writing assistance**, complete **bilingual support** (English/Arabic **RTL**), and comprehensive **accessibility compliance**. Built with **Next.js 15 and React 1**9, delivering beyond requirements with interactive **onboarding, email confirmation flows, and professional UX design**.

## Live Demo

Experience the application in both languages:

<div align="center">

| **🇬🇧 English Version** | **🇦🇪 Arabic Version** |
|:---:|:---:|
| **[Try English Demo →](https://social-support-portal-react.vercel.app/en)** | **[← جرب النسخة العربية ](https://social-support-portal-react.vercel.app/ar)** |
| *Full LTR experience with AI assistance* | *Complete RTL layout with Arabic support* |


</div>

## Features Overview

### Core Application Features
- **4-Step Form Wizard**: Personal Information → Family & Financial → Situation Descriptions → Review & Submit
- **AI Writing Assistance**: OpenAI GPT integration with professional content generation
- **Email Confirmation Flow**: Multi-phase submission process with visual feedback
- **Interactive Onboarding**: 6-step guided tour for new users
- **Progress Tracking**: Clickable progress indicators with backward navigation
- **Celebration Effects**: Confetti animations for milestone achievements

### Advanced User Experience
- **Elegant Theme Design**: Modern black and dark-grey color palette
- **Smooth Animations**: CSS transitions, loading states, and micro-interactions
- **Responsive Design**: Mobile-first approach supporting all device sizes
- **Touch Optimizations**: Mobile-friendly buttons and gesture support
- **Loading States**: Skeleton screens and progress indicators
- **Error Handling**: Graceful error recovery with user-friendly messages

### Internationalization & Accessibility
- **Bilingual Support**: Complete English and Arabic (RTL) translations
- **RTL Layout**: Proper right-to-left text direction and icon orientation
- **WCAG Compliance**: High contrast ratios and keyboard navigation
- **Screen Reader Support**: ARIA labels, roles, and semantic structure
- **Accessibility First**: Focus management and assistive technology support

### Technical Excellence
- **Next.js 15.5.3**: Latest App Router with React 19.1.1
- **State Management**: Context API with localStorage persistence
- **Form Validation**: React Hook Form with comprehensive error handling
- **Performance**: Code splitting, lazy loading, and optimized rendering
- **Modern CSS**: Tailwind CSS with custom animations and responsive design

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OpenAI API key (provided in `.env` file)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd social-support-portal
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
The `.env` file is already created with the OpenAI API key:
```
NEXT_OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Case Study Requirements Fulfillment

### Multi-step Form Wizard
| Step | Section | Fields | AI Assistance |
|------|---------|--------|---------------|
| 1 | Personal Information | Name, National ID, Date of Birth, Gender, Address, City, State, Country, Phone, Email | No |
| 2 | Family & Financial Info | Marital Status, Dependents, Employment Status, Monthly Income, Housing Status | No |
| 3 | Situation Descriptions | Current Financial Situation, Employment Circumstances, Reason for Applying | Yes (Help Me Write) |
| 4 | Review & Submit | Complete form review with edit capabilities | Email confirmation flow |

### AI Integration Features
- **"Help Me Write" Button**: Available for all three text areas in Step 3
- **Professional Content Generation**: Context-aware suggestions for Gov Social Supports
- **Modal Interface**: Clean popup with Accept, Regenerate, and Discard options
- **Error Handling**: Graceful API timeout and failure management
- **Body Scroll Lock**: Prevents background scrolling during modal interaction

### Responsive Design Implementation
- **Mobile-First Approach**: Optimized for phones, tablets, and desktops
- **Flexible Layouts**: Grid systems that adapt to screen sizes
- **Touch-Friendly**: Optimized button sizes and interaction areas
- **Viewport Optimization**: Proper scaling and zoom handling

### Accessibility Excellence
- **ARIA Implementation**: Comprehensive labels, roles, and descriptions
- **Keyboard Navigation**: Full application navigation without mouse
- **Screen Reader Support**: Optimized for assistive technologies
- **Focus Management**: Proper focus trapping and indication
- **High Contrast**: WCAG compliant color combinations
- **Semantic HTML**: Proper heading hierarchy and form structure

### Advanced Features Beyond Requirements
- **Bilingual Support**: English and Arabic with RTL layout
- **Interactive Onboarding**: User-guided tour system
- **Email Confirmation Simulation**: Professional submission flow
- **Progress Persistence**: Auto-save functionality
- **Celebration Animations**: Confetti effects for positive reinforcement
- **Dark Theme**: Professional government portal aesthetic

## AI Integration Details

### OpenAI GPT Implementation
- **Endpoint**: OpenAI Chat Completions API (`https://api.openai.com/v1/chat/completions`)
- **Model**: GPT-3.5-turbo (configurable)
- **Context-Aware Prompts**: Tailored suggestions for Gov Social Supports

### User Experience Flow
1. **Trigger**: Click "Help Me Write" button in Step 3 text areas
2. **Loading State**: Professional loading modal with progress indication
3. **Content Generation**: AI creates contextual, professional suggestions
4. **User Options**:
   - **Apply Text**: Accept the AI-generated content
   - **Regenerate**: Generate a new suggestion
   - **Cancel**: Dismiss modal and continue manually

### Technical Implementation
```javascript
// Example API integration
const response = await fetch('/api/ai-assist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: `Help write professional ${fieldType} for Gov Social Support`,
    context: userFormData
  })
});
```

### Error Handling & UX
- **Timeout Management**: Graceful handling of slow API responses
- **Failure Recovery**: User-friendly error messages with retry options
- **Loading States**: Skeleton screens and progress indicators
- **Accessibility**: Screen reader announcements for AI interactions

## Internationalization

**Complete bilingual support (English/Arabic) with:**
- RTL layout with proper text direction and icon flipping
- Live language switching without data loss
- Full translation coverage: forms, errors, buttons, tours, AI assistant
- Cultural considerations: Arabic typography, layout mirroring, color semantics

## Testing

### Test Suite Overview
Comprehensive Jest testing with **100% pass rate**:
- **7 Test Suites** - All passing
- **50 Tests** - Core functionality covered
- **1 Skipped** - Email validation (future enhancement)

### Running Tests
```bash
npm test                              # Watch mode
npm test -- --watchAll=false         # Run once
npm test -- --coverage               # With coverage report
```

### Test Coverage
| Test Suite | Tests | What's Tested |
|------------|-------|---------------|
| **FormContext** | 6 tests | State management, navigation, localStorage |
| **ProgressBar** | 3 tests | Step display, progress tracking |
| **Step1 Component** | 4 tests | Form validation, field rendering |
| **API Routes** | 3 tests | Endpoints, error handling |
| **Email Overlay** | 11 tests | Email flow, UI interactions |
| **AI Modal** | 12 tests | AI integration, bilingual support |
| **Onboarding** | 11 tests | Tour navigation, RTL support |

### Key Testing Features
- **React Testing Library** - Modern component testing
- **Mock Implementation** - localStorage, timers, API calls
- **Accessibility Testing** - ARIA labels, keyboard navigation
- **Internationalization** - English/Arabic RTL testing
- **Error Scenarios** - Timeout handling, failure recovery

## Technical Architecture

### Core Technologies
- **Framework**: Next.js 15.5.3 (App Router)
- **UI Library**: React 19.1.1
- **Styling**: Tailwind CSS with custom animations
- **Form Handling**: React Hook Form with validation
- **State Management**: React Context API
- **Animations**: Canvas-confetti, CSS transitions
- **Icons**: Lucide React
- **AI Integration**: OpenAI GPT-3.5-turbo

### Project Structure
```
social-support-portal/
├── app/
│   ├── [lang]/                      # Route-based internationalization
│   │   ├── app-details/             # Application documentation page
│   │   │   ├── page.js              # App details route
│   │   │   └── AppDetailsContent.js # Documentation content
│   │   ├── layout.js                # Language-specific layout
│   │   └── page.js                  # Main application page
│   ├── api/
│   │   ├── ai-assist/               # OpenAI integration endpoint
│   │   │   └── route.js             # AI assistance API route
│   │   └── submit-application/      # Form submission endpoint
│   │       └── route.js             # Application submission route
│   ├── components/
│   │   └── StructuredData.js        # SEO structured data
│   ├── globals.css                  # Tailwind CSS with custom styles
│   ├── layout.js                    # Root layout with providers
│   ├── page.js                      # Root redirect page
│   ├── favicon.ico                  # Application favicon
│   └── sitemap.js                   # Dynamic sitemap generation
├── components/
│   ├── FormSteps/                   # Multi-step form components
│   │   ├── Step1.js                 # Personal information with country selector
│   │   ├── Step2.js                 # Family & financial data
│   │   ├── Step3.js                 # Situation descriptions (AI-enabled)
│   │   └── Step4.js                 # Review & submit with email confirmation
│   ├── icons/                       # Custom icon components
│   │   └── FlagIcons.js             # Country flag SVG icons
│   ├── AIAssistModal.js             # AI writing assistance modal
│   ├── ApplicationForm.js           # Main form wrapper component
│   ├── CelebrationEffects.js        # Confetti animations
│   ├── EmailSendingOverlay.js       # Email confirmation flow UI
│   ├── ErrorBoundary.js             # Global error boundary
│   ├── FAQ.js                       # Frequently asked questions
│   ├── Footer.js                    # Application footer with contact info
│   ├── FormErrorBoundary.js         # Form-specific error boundary
│   ├── GuestAuthInitializer.js      # Guest authentication setup
│   ├── LanguageSwitchLoader.js*     # Language switching animation overlay
│   ├── LanguageToggle.js            # Language switching dropdown
│   ├── LogoIcon.js*                 # Reusable logo component
│   ├── ModernProgressBar.js         # Enhanced progress tracking
│   ├── Onboarding.js                # Interactive 6-step user tour
│   ├── ProgressBar.js               # Legacy progress component
│   ├── SearchableCountryDropdown.js # Country selection with search
│   ├── Skeleton.js                  # Loading skeleton screens
│   ├── Tooltip.js                   # Tooltip component with animations
│   └── ZoomableImage.js             # Image zoom functionality
├── contexts/
│   ├── FormContext.js               # Form state, validation & navigation
│   └── LanguageContext.js           # Complete i18n translations (EN/AR)
├── data/
│   └── countries.js                 # Country list with codes and flags
├── lib/
│   ├── apiClient.js                 # Axios instance with interceptors
│   └── guestAuth.js                 # Guest authentication utilities
├── __tests__/                       # Comprehensive test suite
│   ├── api/                         # API route tests
│   │   └── submit-application.test.js
│   ├── components/                  # Component unit tests
│   │   ├── FormSteps/               # Form step component tests
│   │   │   └── Step1.test.js
│   │   ├── AIAssistModal.test.js
│   │   ├── EmailSendingOverlay.test.js
│   │   ├── Onboarding.test.js
│   │   └── ProgressBar.test.js
│   └── contexts/                    # Context tests
│       └── FormContext.test.js
├── public/                          # Static assets
│   ├── assets/
│   │   └── project-structure.png    # Architecture diagram
│   ├── manifest.json                # PWA manifest
│   ├── robots.txt                   # SEO robots file
│   └── *.svg                        # Various SVG assets
├── .env                             # Environment variables (API keys)
├── .gitignore                       # Git ignore rules
├── eslint.config.mjs                # ESLint configuration
├── jest.config.js                   # Jest testing configuration
├── jest.setup.js                    # Jest setup and mocks
├── jsconfig.json                    # JavaScript path configuration
├── next.config.mjs                  # Next.js configuration
├── package.json                     # Dependencies and scripts
├── postcss.config.mjs               # PostCSS configuration
└── README.md                        # Project documentation

* Components marked with asterisk are newly added for language switching animation
```

### State Management Strategy
- **Form Context**: Centralized form data, validation, and step navigation
- **Language Context**: Translation strings, RTL settings, and locale management
- **Local Storage**: Progress persistence and user preferences
- **Session Storage**: Temporary UI state (celebration flags, etc.)

<details>
<summary><strong>Technical Implementation Details</strong></summary>

### Responsive Design
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Accessibility Features
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Error announcements
- High contrast support
- Screen reader optimized

### Security Considerations
- Input validation and sanitization
- API key stored in environment variables
- Rate limiting on API endpoints (production)
- HTTPS enforcement (production)
- XSS protection

### API Endpoints

**POST `/api/ai-assist`**
- Request: `{ prompt, currentText }`
- Response: `{ suggestion }`

**POST `/api/submit-application`**
- Request: Complete form data object
- Response: `{ success, applicationNumber, message }`

### Performance Optimizations
- Lazy loading of components
- Debounced localStorage saves
- Optimized re-renders with React Hook Form
- Image optimization with Next.js Image
- Code splitting per route

</details>

<details>
<summary><strong>Development & Architecture Notes</strong></summary>

### Running in Production Mode
```bash
npm run build
npm start
```

### Environment Variables
- `NEXT_OPENAI_API_KEY`: OpenAI API key for text assistance

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Architecture Decisions
1. **Next.js App Router**: Modern routing with server components support
2. **Context API vs Redux**: Simpler state management for this scope
3. **React Hook Form**: Better performance with uncontrolled components
4. **Tailwind CSS**: Rapid UI development with utility classes
5. **localStorage**: Simple persistence without backend complexity

</details>

## Beyond Requirements

**Key Enhancements:**
- **AI Integration**: Context-aware GPT assistance with regenerate/accept/discard options
- **Bilingual Excellence**: Full English/Arabic RTL with cultural considerations
- **Accessibility First**: WCAG 2.1 AA compliance + screen reader optimization
- **Interactive UX**: Guided onboarding, email flows, celebration effects

**Technical Highlights:**
- Modern stack: React 19 + Next.js 15 with App Router
- Smart persistence: Context API + localStorage integration
- Performance optimized: Lazy loading, code splitting, optimized re-renders
- Quality assured: 51 test cases with 100% pass rate

**Future Roadmap:**
- Backend integration, file uploads, analytics dashboard
- Progressive Web App capabilities and enhanced security
- **Multi-tenant Support**: Different portals for different government agencies

## License

This project is created for interview/demonstration purposes for Northbay Solutions team.

## Support

For questions or issues, please contact me.

---

Built with ❤️ for Northbay Solutions team
