# Contract Lifecycle Management Sales Demo Platform - Setup Prompt

## Project Overview
Create a sophisticated sales demonstration platform for a Contract Lifecycle Management (CLM) tool. This platform enables sales teams to conversationally personalize demo experiences, track prospect engagement, and generate actionable insights to close deals more effectively.

## Core Features Required

### 1. Conversational Demo Setup
- AI-powered chat interface for rapid demo environment configuration
- Industry-specific template selection (Healthcare, Technology, Manufacturing, etc.)
- Company size-based workflow configuration
- Automatic contract seeding with realistic data
- User role and permission setup based on prospect organization structure

### 2. Live Demo Workspace
- Fully functional CLM interface with contracts dashboard
- Multiple view modes: Dashboard, Contracts, Templates, Workflows, Team
- Interactive contract management with status tracking
- Search and filter capabilities
- Real-time collaboration features for prospect interaction

### 3. Advanced Analytics & Insights
- Real-time tracking of prospect demo interactions
- Feature engagement heatmaps showing time spent and interest levels
- Pain point identification based on user behavior patterns
- AI-generated follow-up recommendations
- Engagement scoring and lead qualification metrics

### 4. Prospect Management
- Detailed prospect profiles with company information
- Activity timeline tracking all demo interactions
- Lead scoring based on engagement metrics
- Contact management with meeting scheduling
- Sales notes and opportunity tracking

## Technical Requirements

### Tech Stack
- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
- **State Management**: React hooks and context (no external state library needed)

### Design System Requirements

#### Apple-Inspired Aesthetics
- Clean, minimal interface with subtle gradients
- Refined typography with proper hierarchy (max 3 font weights)
- Sophisticated color palette:
  - Primary: Blue gradient (#3B82F6 to #1E40AF)
  - Secondary: Slate grays (#F8FAFC to #0F172A)
  - Accent: Green (#10B981), Yellow (#F59E0B), Red (#EF4444)
  - Success/Warning/Error states with proper contrast ratios

#### Layout & Spacing
- 8px spacing system throughout
- Card-based layouts with subtle shadows and rounded corners (12px border radius)
- Proper white space utilization for reduced cognitive load
- Responsive breakpoints: mobile (640px), tablet (768px), desktop (1024px+)

#### Micro-interactions
- Smooth hover states on all interactive elements
- Loading animations with skeleton screens
- Subtle transitions (200-300ms duration)
- Progressive disclosure for complex features
- Contextual tooltips and feedback

### Component Architecture

#### File Structure
```
src/
├── components/
│   ├── Sidebar.tsx              # Main navigation
│   ├── ConversationalSetup.tsx  # AI chat interface
│   ├── DemoWorkspace.tsx        # CLM demo environment
│   ├── InsightsDashboard.tsx    # Analytics and insights
│   └── ProspectProfile.tsx      # Prospect management
├── types/
│   └── index.ts                 # TypeScript definitions
├── utils/
│   └── helpers.ts               # Utility functions
├── App.tsx                      # Main application
├── main.tsx                     # Entry point
└── index.css                    # Global styles
```

#### Component Requirements

##### Sidebar Component
- Fixed navigation with 4 main sections
- Active state highlighting with blue accent
- Company branding area with logo
- User profile section at bottom
- Smooth transitions between views

##### Conversational Setup Component
- Chat interface with message history
- Typing indicators and smooth scrolling
- Quick action buttons for common setups
- Industry-specific configuration options
- Real-time demo environment generation

##### Demo Workspace Component
- Tabbed interface (Dashboard, Contracts, Templates, Workflows, Team)
- Interactive contract cards with status indicators
- Search and filter functionality
- Statistics cards with trend indicators
- Realistic contract data with proper status workflows

##### Insights Dashboard Component
- Engagement metrics with visual charts
- Feature heatmap showing interaction patterns
- Time distribution analytics
- Pain point identification with recommendations
- Prospect comparison capabilities

##### Prospect Profile Component
- Detailed company information display
- Activity timeline with interaction history
- Lead scoring visualization
- Contact management interface
- Meeting scheduling integration

### Data Models

#### Prospect Interface
```typescript
interface Prospect {
  id: string;
  name: string;
  industry: string;
  size: string;
  status: 'hot_lead' | 'qualified' | 'demo_scheduled';
  lastContact: string;
  nextMeeting?: string;
  email: string;
  phone: string;
  score: number;
  contracts: number;
  engagement: number;
  avatar: string;
  notes: string[];
  activities: Activity[];
}
```

#### Contract Interface
```typescript
interface Contract {
  id: number;
  title: string;
  status: 'pending_review' | 'in_negotiation' | 'ready_to_sign' | 'completed';
  value: string;
  deadline: string;
  assignee: string;
  stage: string;
}
```

#### Demo Configuration Interface
```typescript
interface DemoConfig {
  industry: string;
  companySize: string;
  companyName: string;
  contracts: number;
  users: number;
  templates: string[];
}
```

### Specific Implementation Details

#### Conversational AI Simulation
- Implement realistic conversation flow with industry-specific responses
- Include typing delays and natural conversation patterns
- Support for quick actions and template responses
- Context-aware suggestions based on previous inputs

#### Real-time Analytics Tracking
- Track user interactions with timestamp logging
- Calculate engagement scores based on time spent and features accessed
- Generate heatmaps showing feature popularity
- Identify drop-off points and areas of high interest

#### Responsive Design Requirements
- Mobile-first approach with progressive enhancement
- Collapsible sidebar for mobile devices
- Touch-friendly interface elements
- Optimized layouts for demo presentations

### Sample Data Requirements

#### Contract Templates by Industry
- **Healthcare**: HIPAA compliance agreements, medical device contracts, vendor agreements
- **Technology**: SaaS agreements, partnership deals, IP licensing, development contracts
- **Manufacturing**: Supplier agreements, quality contracts, distribution deals, procurement contracts

#### Realistic Contract Statuses
- Pending legal review with assigned team members
- Active negotiations with progress indicators
- Ready for signature with approval workflows
- Completed contracts with execution dates

#### User Personas
- Legal team members with review permissions
- Department heads with approval authority
- C-level executives with signing rights
- Procurement teams with vendor management access

## Implementation Instructions

### Step 1: Project Setup
1. Create new Vite + React + TypeScript project
2. Install and configure Tailwind CSS
3. Add Lucide React for icons
4. Set up proper TypeScript configuration

### Step 2: Component Development
1. Start with Sidebar navigation component
2. Implement ConversationalSetup with chat interface
3. Build DemoWorkspace with tabbed interface
4. Create InsightsDashboard with analytics
5. Develop ProspectProfile with detailed views

### Step 3: Styling & Polish
1. Implement design system with Tailwind utilities
2. Add micro-interactions and hover states
3. Ensure responsive behavior across devices
4. Test accessibility and keyboard navigation

### Step 4: Data Integration
1. Create realistic sample data for all components
2. Implement state management between components
3. Add proper TypeScript types throughout
4. Test all user flows and interactions

## Success Criteria

### Functional Requirements
- ✅ Conversational setup completes in under 2 minutes
- ✅ Demo workspace loads with realistic, industry-specific data
- ✅ Analytics track and display meaningful engagement metrics
- ✅ Prospect profiles show comprehensive interaction history
- ✅ All components are fully responsive and accessible

### Design Requirements
- ✅ Apple-level design quality with attention to detail
- ✅ Smooth animations and micro-interactions throughout
- ✅ Professional color scheme with proper contrast ratios
- ✅ Consistent spacing and typography hierarchy
- ✅ Production-ready visual polish

### Performance Requirements
- ✅ Fast initial load time (< 3 seconds)
- ✅ Smooth transitions between views
- ✅ Responsive interactions with minimal lag
- ✅ Optimized for demo presentation scenarios

## Additional Considerations

### Extensibility
- Modular component architecture for easy feature additions
- Configurable industry templates and workflows
- Pluggable analytics and tracking capabilities
- API-ready structure for future backend integration

### Sales Team Usability
- Intuitive interface requiring minimal training
- Quick setup process for time-sensitive demos
- Clear visual indicators for prospect engagement
- Actionable insights for follow-up conversations

### Demo Presentation Optimization
- Full-screen mode for client presentations
- Keyboard shortcuts for smooth navigation
- Pre-configured scenarios for common use cases
- Professional appearance suitable for C-level meetings

---

**Note**: This platform should feel like a premium, enterprise-grade solution that reflects the sophistication of the CLM tool being demonstrated. Every interaction should reinforce the value proposition and build confidence in the underlying product capabilities.