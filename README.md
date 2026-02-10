# CARI St-Laurent React Application

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_SITE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_NETLIFY_SITE_NAME/deploys)

This is a React conversion of the original CARI St-Laurent HTML/CSS/JavaScript SPA. The application has been converted to a modern React architecture while preserving all original functionality and pixel-perfect appearance.

## Features

- **Pixel-perfect identical** to the original design
- **Multi-language support** (FR, EN, AR, ES, RU)
- **Hero carousel** with auto-rotation, touch gestures, keyboard navigation
- **Mobile-responsive** design with burger menu
- **Interactive service selection** with synchronized dropdown
- **Contact and appointment forms** with validation
- **AI chatbot assistant** with typing effects
- **Smooth scrolling** navigation
- **Fixed header** with scroll effects

## Project Structure

```
Proto/react-app/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── images/          # All original images
├── src/
│   ├── components/
│   │   ├── Header.js    # Navigation and language switcher
│   │   ├── Hero.js      # Hero carousel section
│   │   ├── Needs.js     # Needs assessment cards
│   │   ├── Services.js  # Services details
│   │   ├── Appointment.js # Appointment booking form
│   │   ├── Contact.js   # Contact form and info
│   │   └── Chat.js      # AI chatbot assistant
│   ├── styles/
│   │   └── main.css     # All CSS from original (unchanged)
│   ├── translations.js  # Multi-language translations
│   ├── App.js          # Main application component
│   └── index.js        # React entry point
├── package.json
└── README.md
```

## 🚀 Quick Deployment to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/pierremichaudpm/cari)

### One-Click Deployment:
1. Click the "Deploy to Netlify" button above
2. Connect your GitHub account
3. Select the repository
4. Netlify will automatically:
   - Build the React application
   - Configure SPA routing
   - Deploy to a global CDN
   - Set up HTTPS
   - Provide a custom domain

### Manual Deployment:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify in your project
netlify init

# Deploy to production
netlify deploy --prod
```

## Getting Started (Local Development)

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Local Installation

1. Navigate to the project directory:
```bash
cd Proto/react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:

**For Node.js v16 or lower:**
```bash
npm start
```

**For Node.js v17 or higher (including v20):**
```bash
NODE_OPTIONS=--openssl-legacy-provider npm start
```

4. Open your browser and visit `http://localhost:3000`

### Important Note for Local Development
- **Netlify uses Node.js v16** (configured in netlify.toml) which doesn't require the `--openssl-legacy-provider` flag
- **Local development with Node.js v20+** requires the flag due to React 17 + react-scripts 4 compatibility
- The build will work on both environments with the appropriate Node.js version

## 🌐 Netlify Configuration

This application is fully configured for Netlify deployment:

### Configuration Files:
- **`netlify.toml`** - Build settings, redirects, and headers
- **`public/_redirects`** - SPA routing for client-side navigation
- **`public/robots.txt`** - Search engine optimization
- **`public/sitemap.xml`** - SEO sitemap with multi-language support

### Netlify Features Enabled:
- ✅ **SPA Routing** - All routes redirect to index.html
- ✅ **Security Headers** - CSP, HSTS, XSS protection
- ✅ **Asset Caching** - Optimized static asset delivery
- ✅ **HTTPS** - Automatic SSL certificates
- ✅ **Global CDN** - Fast worldwide delivery
- ✅ **Environment Variables** - Secure configuration
- ✅ **Form Handling** - Built-in form submissions
- ✅ **Analytics** - Integrated with Netlify Analytics

### Environment Variables:
Set these in Netlify Dashboard → Site settings → Environment variables:
```bash
NODE_ENV=production
REACT_APP_API_URL=https://your-api-endpoint.com
REACT_APP_GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

## Key Implementation Details

### State Management
- Uses React hooks (`useState`, `useEffect`, `useRef`)
- Centralized state in App component for language, carousel, forms, chat
- Props drilling for component communication

### Language System
- Translations stored in `src/translations.js`
- Real-time language switching without page reload
- Language detection in chatbot responses

### Carousel Features
- Auto-rotation every 5 seconds
- Pause on hover
- Touch swipe gestures
- Keyboard arrow navigation
- Range slider control
- Dot indicators

### Form Handling
- Form validation with React state
- Success messages in selected language
- Service selection synchronization between cards and dropdown

### Chatbot
- Intelligent response system with keyword detection
- Typing effect simulation
- Multi-language support
- Quick suggestion buttons

## Preserved Original Features

- **Exact same CSS** - All styles copied verbatim from original
- **Same class names** - For styling consistency
- **Same images** - All images preserved
- **Same functionality** - All interactions work identically
- **Same user experience** - No changes to flow or behavior

## 📦 Build & Deployment

### Build for Production

```bash
# Standard build
npm run build

# Build for Netlify deployment
npm run build

# Deploy to Netlify (using CLI)
npm run deploy
```

### Netlify Deployment Options:

**Option 1: Git-based Deployment (Recommended)**
1. Connect your GitHub repository to Netlify
2. Netlify automatically deploys on every push
3. Preview deployments for pull requests

**Option 2: Manual Deployment**
```bash
# Build and deploy
npm run build
netlify deploy --dir=build --prod
```

**Option 3: Drag & Drop**
1. Run `npm run build`
2. Drag the `build` folder to Netlify Drop
3. Get a live URL instantly

### Deployment URLs:
- **Production**: `https://cari-st-laurent.netlify.app`
- **Preview**: `https://deploy-preview-XX--cari-st-laurent.netlify.app`
- **Branch**: `https://branch-name--cari-st-laurent.netlify.app`

This creates an optimized production build in the `build` folder.

## 🔧 Advanced Netlify Features

### Form Handling:
Netlify can process form submissions without backend code:
1. Add `data-netlify="true"` to your forms
2. Netlify automatically:
   - Validates submissions
   - Sends email notifications
   - Stores submissions in dashboard
   - Provides spam filtering

### Serverless Functions:
Create API endpoints in `netlify/functions/`:
```javascript
// netlify/functions/hello.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from CARI API!" })
  };
};
```

### Environment-Specific Builds:
```toml
# netlify.toml
[context.production.environment]
  REACT_APP_API_URL = "https://api.cari-st-laurent.com"

[context.deploy-preview.environment]
  REACT_APP_API_URL = "https://staging-api.cari-st-laurent.com"

[context.branch-deploy.environment]
  REACT_APP_API_URL = "https://dev-api.cari-st-laurent.com"
```

### Custom Domains:
1. Go to Netlify Dashboard → Domain settings
2. Add your custom domain (cari-st-laurent.org)
3. Netlify automatically configures DNS and SSL

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Deployment Notes

### Netlify-Specific Notes:
1. **Build Time**: ~2-3 minutes for initial build, ~1 minute for subsequent builds
2. **Build Limits**: 300 build minutes/month on free tier
3. **Bandwidth**: 100GB/month on free tier
4. **Forms**: 100 submissions/month on free tier
5. **Functions**: 125k invocations/month on free tier

### Optimization Tips:
1. Enable **Asset Optimization** in Netlify dashboard
2. Use **Image CDN** for automatic image optimization
3. Configure **Cache headers** for static assets
4. Enable **Prerendering** for better SEO
5. Set up **Branch deploys** for testing

### Monitoring:
- **Netlify Analytics**: Built-in traffic analytics
- **Web Vitals**: Performance monitoring
- **Form Analytics**: Submission tracking
- **Function Logs**: Serverless function monitoring

### Troubleshooting:
```bash
# Check build logs
netlify logs

# Debug build issues
netlify build --debug

# Check site status
netlify status
```

## Notes

- No external UI libraries used - pure React and CSS
- All animations and transitions preserved
- Mobile responsiveness maintained
- Accessibility considerations included (ARIA labels, keyboard navigation)

## License

This project is for CARI St-Laurent organization use.# Build timestamp: Mon Feb  2 13:17:45 EST 2026
# Force rebuild
