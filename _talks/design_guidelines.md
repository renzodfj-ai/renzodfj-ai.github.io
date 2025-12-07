# S&P 500 Prediction Platform - Design Guidelines

## Design Approach

**Selected Approach**: Design System + Financial Application Patterns

Drawing inspiration from modern fintech applications (Robinhood, Interactive Brokers, Trading View) combined with Material Design principles for information-dense interfaces. The design prioritizes data clarity, quick decision-making, and professional trustworthiness.

**Core Principles**:
- Data-first hierarchy: metrics and predictions take visual priority
- Clarity over decoration: minimal distractions from core information
- Financial color semantics: green for bullish/up, red for bearish/down
- Professional credibility: clean, modern interface that inspires confidence

---

## Typography

**Font Families**:
- Primary: 'Inter' (Google Fonts) - for UI elements, labels, body text
- Data/Numbers: 'Roboto Mono' (Google Fonts) - for financial figures, predictions, metrics

**Type Scale**:
- Hero Numbers (predictions, current price): text-4xl to text-5xl, font-bold
- Section Headers: text-2xl, font-semibold
- Metric Labels: text-sm, font-medium, uppercase tracking
- Body Text: text-base
- Secondary Info: text-sm
- Data Tables: text-sm, font-mono

---

## Layout System

**Spacing Units**: Use Tailwind units of 2, 4, 6, 8, 12, 16 for consistent rhythm
- Component padding: p-6 to p-8
- Section gaps: gap-8 to gap-12
- Card spacing: space-y-4
- Grid gaps: gap-6

**Container Strategy**:
- Max width: max-w-7xl for main application wrapper
- Dashboard grid: 12-column CSS Grid for flexible metric cards
- Responsive breakpoints: Single column mobile, 2-column tablet (md:), 3-column desktop (lg:)

---

## Component Library

### Navigation
**Top Navigation Bar**:
- Fixed header with application logo/title
- Real-time S&P 500 ticker display (current price + % change)
- User actions (refresh data, settings icon)
- Height: h-16, backdrop blur effect

### Dashboard Cards
**Metric Cards** (Current Market Data):
- Display: Open, High, Low, Close, Volume
- Structure: Label (uppercase, small) + Large numeric value
- Card style: Subtle border, slight elevation on hover
- Responsive grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-5

**Prediction Card** (Primary CTA):
- Prominent placement: Takes 2/3 width on desktop
- Contains input form for manual predictions
- Large prediction result display
- Confidence meter/probability bar
- Background treatment to distinguish from data cards

### Data Visualization
**Primary Chart**:
- Line chart showing historical S&P 500 Close prices
- Height: h-96 on desktop, h-64 on mobile
- Interactive tooltips on hover
- Time range selector (1W, 1M, 3M, 1Y, All)
- Use Chart.js or Recharts library

**Prediction Indicator**:
- Large icon: Up arrow (green) or Down arrow (red)
- Percentage/probability display
- Animated state transition when new prediction loads

### Forms
**Prediction Input Form**:
- Input fields for: Open, High, Low, Close, Volume
- Clear labels with helper text
- Number inputs with step values
- Submit button: Primary CTA style, full-width on mobile
- Real-time validation indicators

**Recent Predictions Table**:
- Columns: Date, Prediction (Up/Down), Confidence, Actual Result
- Row highlighting: Correct predictions (subtle green tint), Incorrect (subtle red tint)
- Pagination for historical data
- Sticky header on scroll

### Buttons & Actions
- Primary: "Get Prediction" - bold, medium size
- Secondary: "Load Sample Data", "Reset Form"
- Icon buttons: Refresh, Settings (outline style)
- Financial semantic buttons: Green for bullish actions, red for bearish (use sparingly)

---

## Page Structure

**Main Application View** (Single-page dashboard):
1. **Header Section** (fixed top)
   - App branding + live ticker

2. **Hero Stats Bar** (below header)
   - Current market snapshot in horizontal card strip

3. **Main Content Grid** (3-column desktop, stacked mobile):
   - Left Column (2/3 width):
     - Historical price chart (primary visual)
     - Prediction history table
   - Right Column (1/3 width):
     - Prediction input form
     - Live prediction result card
     - Model accuracy metrics

4. **Footer**
   - Data source attribution, last updated timestamp

---

## Visual Treatments

**Card Elevation**: Subtle shadows (shadow-sm default, shadow-md on hover)
**Borders**: Single pixel, low-contrast borders for card separation
**Rounded Corners**: rounded-lg for cards, rounded-md for inputs
**Financial Indicators**: 
- Positive (up): Green text/icons (#10B981 or Tailwind green-500)
- Negative (down): Red text/icons (#EF4444 or Tailwind red-500)
- Neutral: Slate/gray tones

**Loading States**: Skeleton screens for chart, shimmer effect for data cards
**Empty States**: Centered icon + descriptive text when no predictions exist

---

## Accessibility

- All form inputs have associated labels (visible or aria-label)
- Color not sole indicator (use icons + text for up/down predictions)
- Keyboard navigation for all interactive elements
- Focus indicators on all inputs and buttons
- Alt text for data visualization (describe chart content)
- ARIA live regions for prediction results

---

## Icons

**Library**: Heroicons (CDN)
- Trending Up/Down icons for predictions
- Chart Line icon for visualization section
- Refresh icon for data reload
- Settings/cog icon for configuration
- Calendar icon for date pickers

---

## Animations

**Minimal, purposeful animations only**:
- Smooth transitions on card hover (transition-all duration-200)
- Prediction result fade-in when new prediction loads
- Loading spinner during API calls
- Chart data transition when time range changes
- No scroll-triggered animations or parallax effects

---

## Images

**No hero image required** - This is a data application, not a marketing site. Visual focus should be on charts and metrics.

If background treatment is needed:
- Subtle gradient overlay in header
- Abstract geometric pattern (low opacity) in empty states only

---

## Responsive Behavior

**Mobile (< 768px)**:
- Stack all components vertically
- Chart: Full-width, reduced height (h-64)
- Metric cards: 2-column grid
- Prediction form: Full-width inputs
- Table: Horizontal scroll with sticky first column

**Tablet (768px - 1024px)**:
- 2-column layout: Chart left, form right
- Metric cards: 3-column grid

**Desktop (> 1024px)**:
- 3-column asymmetric grid as described above
- Chart expands to full visual prominence