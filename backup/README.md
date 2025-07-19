# Recurring Date Picker Component

A comprehensive, reusable recurring date picker component built with React, Next.js, and Tailwind CSS. This component replicates the functionality found in TickTick's recurring date picker with additional customization options.

## Features

### Core Functionality
- ✅ **Daily Recurrence**: Every X days
- ✅ **Weekly Recurrence**: Specific days of the week selection
- ✅ **Monthly Recurrence**: By date or weekday patterns
- ✅ **Yearly Recurrence**: Annual patterns
- ✅ **Custom Intervals**: Every X days/weeks/months/years
- ✅ **Advanced Patterns**: "Second Tuesday of every month" style patterns

### UI Features
- ✅ **Date Range Selection**: Start date with optional end date
- ✅ **Mini Calendar Preview**: Visual display of recurring dates
- ✅ **Responsive Design**: Works on desktop and mobile
- ✅ **Toggle Recurrence**: Enable/disable recurring patterns
- ✅ **Reset Functionality**: Return to default settings

### Technical Features
- ✅ **Modern State Management**: Built with Zustand
- ✅ **TypeScript**: Fully typed for better development experience
- ✅ **Modular Architecture**: Composed of reusable components
- ✅ **Testing**: Unit and integration tests included
- ✅ **Performance**: Optimized date calculations

## Tech Stack

- **Framework**: Next.js 14
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Date Utilities**: date-fns
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd react-tick-tick
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## Usage

### Basic Usage

```tsx
import RecurringDatePicker from '@/components/RecurringDatePicker';

function MyComponent() {
  const handleDatesChange = (dates: Date[]) => {
    console.log('Selected recurring dates:', dates);
  };

  return (
    <RecurringDatePicker 
      onDatesChange={handleDatesChange}
      className="my-custom-class"
    />
  );
}
```

### Advanced Usage with Store Access

```tsx
import { useDatePickerStore } from '@/store/datePickerStore';

function MyAdvancedComponent() {
  const { 
    previewDates, 
    recurrenceRule, 
    dateRange,
    setRecurrenceRule 
  } = useDatePickerStore();

  // Custom logic with direct store access
  const handleCustomPattern = () => {
    setRecurrenceRule({
      type: 'weekly',
      interval: 2,
      selectedDays: [1, 3, 5] // Mon, Wed, Fri every 2 weeks
    });
  };

  return (
    <div>
      <RecurringDatePicker />
      <button onClick={handleCustomPattern}>
        Apply Custom Pattern
      </button>
      <div>
        Selected dates: {previewDates.length}
      </div>
    </div>
  );
}
```

## Component Architecture

### Main Components

1. **RecurringDatePicker** - Main container component
2. **DateRangePicker** - Handles start/end date selection
3. **RecurrenceOptions** - Manages recurrence pattern selection
4. **MiniCalendar** - Visual preview of selected dates

### State Management

The component uses Zustand for state management with the following structure:

```typescript
interface DatePickerStore {
  dateRange: DateRange;
  recurrenceRule: RecurrenceRule;
  isEnabled: boolean;
  previewDates: Date[];
  // ... methods
}
```

### Date Utilities

Key utility functions for date calculations:

- `generateRecurringDates()` - Generates array of recurring dates
- `formatDateForDisplay()` - Formats dates for UI display
- `getWeekdayName()` - Returns weekday names
- `isNthWeekdayOfMonth()` - Checks for patterns like "second Tuesday"

## Recurrence Patterns

### Daily
- Every X days
- Simple interval-based recurrence

### Weekly  
- Select specific days of the week
- Every X weeks on selected days
- Example: "Every 2 weeks on Monday, Wednesday, Friday"

### Monthly
- **By Date**: Same date each month (e.g., 15th of every month)
- **By Weekday**: Pattern-based (e.g., "Second Tuesday of every month")
- Custom intervals (every X months)

### Yearly
- Same date every year
- Custom intervals (every X years)

## Testing

The project includes comprehensive testing:

### Unit Tests
- Date utility functions
- State management logic
- Individual component behavior

### Integration Tests
- Complete component workflows
- User interaction flows
- State updates and side effects

### Test Files
- `__tests__/utils/dateUtils.test.ts` - Date utility tests
- `__tests__/components/RecurringDatePicker.test.tsx` - Component tests

## Customization

### Styling
The component uses Tailwind CSS classes and can be customized by:

1. **CSS Variables**: Override Tailwind's color palette
2. **Custom Classes**: Pass className prop to main component
3. **Theme Extension**: Modify `tailwind.config.js`

### Functionality
Extend functionality by:

1. **Custom Patterns**: Add new recurrence types in `types/index.ts`
2. **Date Logic**: Extend `utils/dateUtils.ts`
3. **UI Components**: Create new sub-components

## Performance Considerations

- **Date Generation**: Limited to 50 preview dates by default
- **Memoization**: Components use React.memo where appropriate  
- **State Updates**: Zustand provides efficient updates
- **Calendar Rendering**: Virtualized for large date ranges

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Demo Links

- **GitHub Repository**: [Add your GitHub link]
- **Live Demo**: [Add your deployment link]
- **Video Walkthrough**: [Add your Loom video link]
