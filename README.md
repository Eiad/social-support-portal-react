# Social Support Application Portal

A modern, accessible, multi-language government social support application portal with AI-powered assistance for form completion.

## 🌟 Features

- **Multi-Step Form Wizard**: 3-step application process with progress tracking
- **AI Assistance**: OpenAI GPT-3.5 integration to help users write descriptive text fields
- **Multi-Language Support**: Full support for English and Arabic (RTL)
- **Responsive Design**: Mobile-first approach, works on all devices
- **Accessibility**: ARIA labels, keyboard navigation, screen reader friendly
- **Progress Persistence**: Auto-save form data to localStorage
- **Form Validation**: Comprehensive validation with helpful error messages
- **Mock API**: Simulated backend with realistic 3-second processing delay

## 🚀 Quick Start

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
NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📋 Form Structure

### Step 1: Personal Information
- Full Name
- National ID
- Date of Birth
- Gender
- Address
- City, State, Country
- Phone Number
- Email Address

### Step 2: Family & Financial Information
- Marital Status
- Number of Dependents
- Employment Status
- Monthly Income
- Housing Status

### Step 3: Situation Descriptions (with AI Assistance)
- Current Financial Situation
- Employment Circumstances
- Reason for Applying

## 🤖 AI Integration

The application integrates OpenAI's GPT-3.5-turbo model to assist users in writing descriptive text fields in Step 3:

1. Click the "✨ Help Me Write" button next to any textarea
2. The AI generates a contextual suggestion based on the field
3. Users can:
   - **Accept**: Use the suggestion as-is
   - **Edit**: Modify the suggestion before using
   - **Discard**: Reject and write their own text

## 🌐 Language Support

Toggle between English and Arabic using the language button in the top-right corner:
- Full RTL support for Arabic
- All form labels and messages translated
- Seamless switching without data loss

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

Test files include:
- Component tests (ProgressBar, Form Steps)
- Context tests (FormContext, LanguageContext)
- API route tests
- Integration tests

## 🏗️ Project Structure

```
social-support-portal/
├── app/
│   ├── api/
│   │   ├── ai-assist/         # OpenAI integration endpoint
│   │   └── submit-application/ # Form submission endpoint
│   ├── page.js                 # Main application page
│   └── layout.js               # Root layout
├── components/
│   ├── FormSteps/              # Step components (Step1, Step2, Step3)
│   ├── ApplicationForm.js      # Main form container
│   ├── ProgressBar.js          # Progress indicator
│   ├── LanguageToggle.js       # Language switcher
│   └── AIAssistModal.js        # AI suggestion modal
├── contexts/
│   ├── FormContext.js          # Form state management
│   └── LanguageContext.js      # Internationalization
├── __tests__/                  # Test files
├── public/                     # Static assets
└── styles/                     # Global styles
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **State Management**: React Context API
- **API Calls**: Native Fetch API
- **Testing**: Jest + React Testing Library
- **AI Integration**: OpenAI GPT-3.5-turbo

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Error announcements
- High contrast support
- Screen reader optimized

## 🔒 Security Considerations

- Input validation and sanitization
- API key stored in environment variables
- Rate limiting on API endpoints (production)
- HTTPS enforcement (production)
- XSS protection

## 🚦 API Endpoints

### POST `/api/ai-assist`
Generates AI-powered text suggestions
- Request: `{ prompt, currentText }`
- Response: `{ suggestion }`

### POST `/api/submit-application`
Submits the completed application
- Request: Complete form data object
- Response: `{ success, applicationNumber, message }`

## 📈 Performance Optimizations

- Lazy loading of components
- Debounced localStorage saves
- Optimized re-renders with React Hook Form
- Image optimization with Next.js Image
- Code splitting per route

## 🔧 Development Notes

### Running in Production Mode
```bash
npm run build
npm start
```

### Environment Variables
- `NEXT_PUBLIC_OPENAI_API_KEY`: OpenAI API key for text assistance

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Architecture Decisions

1. **Next.js App Router**: Modern routing with server components support
2. **Context API vs Redux**: Simpler state management for this scope
3. **React Hook Form**: Better performance with uncontrolled components
4. **Tailwind CSS**: Rapid UI development with utility classes
5. **localStorage**: Simple persistence without backend complexity

## 🎯 Future Improvements

- Add file upload capability for supporting documents
- Implement real backend with database
- Add email notifications
- Enhanced error recovery
- More comprehensive test coverage
- Add analytics tracking
- Implement print functionality
- Add admin dashboard for application review

## 📄 License

This project is created for interview/demonstration purposes.

## 👥 Support

For questions or issues, please contact the development team.

---

Built with ❤️ for accessible government services
