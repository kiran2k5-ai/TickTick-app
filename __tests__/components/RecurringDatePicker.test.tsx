import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecurringDatePicker from '../../src/components/RecurringDatePicker/RecurringDatePicker';
import { useDatePickerStore } from '../../src/store/datePickerStore';

// Mock the Zustand store
jest.mock('../../src/store/datePickerStore');

// Mock date-fns to have consistent dates in tests
jest.mock('date-fns', () => {
    const originalModule = jest.requireActual('date-fns');
    return {
        ...originalModule,
        // Override any date functions that might cause inconsistency
        format: jest.fn().mockImplementation((date, formatStr) => {
            if (formatStr === 'yyyy-MM-dd') {
                return date.toISOString().split('T')[0];
            }
            return originalModule.format(date, formatStr);
        }),
        startOfDay: jest.fn().mockImplementation((date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())),
        addDays: jest.fn().mockImplementation((date, amount) => {
            const result = new Date(date);
            result.setDate(result.getDate() + amount);
            return result;
        }),
    };
});

const mockUseDatePickerStore = useDatePickerStore as jest.MockedFunction<typeof useDatePickerStore>;

describe('RecurringDatePicker', () => {
    const mockStoreActions = {
        setDateRange: jest.fn(),
        setRecurrenceRule: jest.fn(),
        setIsEnabled: jest.fn(),
        updatePreviewDates: jest.fn(),
        reset: jest.fn(),
    };

    const mockStoreState = {
        dateRange: {
            startDate: new Date('2024-01-01'),
            endDate: undefined,
        },
        recurrenceRule: {
            type: 'daily' as const,
            interval: 1,
        },
        isEnabled: true,
        previewDates: [],
        ...mockStoreActions,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        // Reset all mock functions
        Object.values(mockStoreActions).forEach(mockFn => mockFn.mockClear());
        mockUseDatePickerStore.mockReturnValue(mockStoreState);
    });

    it('renders without crashing', () => {
        render(<RecurringDatePicker />);
        expect(screen.getByText('Recurring Date Picker')).toBeInTheDocument();
    });

    it('shows date range picker', () => {
        render(<RecurringDatePicker />);
        expect(screen.getByText('Date Range')).toBeInTheDocument();
        expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
    });

    it('shows recurrence options when enabled', () => {
        render(<RecurringDatePicker />);
        expect(screen.getByText('Recurrence Pattern')).toBeInTheDocument();
        expect(screen.getByText('Daily')).toBeInTheDocument();
        expect(screen.getByText('Weekly')).toBeInTheDocument();
        expect(screen.getByText('Monthly')).toBeInTheDocument();
        expect(screen.getByText('Yearly')).toBeInTheDocument();
    });

    it('allows toggling recurrence on/off', async () => {
        render(<RecurringDatePicker />);
        
        const enableCheckbox = screen.getByLabelText('Enable Recurrence');
        expect(enableCheckbox).toBeChecked();
        
        fireEvent.click(enableCheckbox);
        expect(mockStoreActions.setIsEnabled).toHaveBeenCalledWith(false);
        
        fireEvent.click(enableCheckbox);
        expect(mockStoreActions.setIsEnabled).toHaveBeenCalledWith(true);
    });

    it('allows changing recurrence type', async () => {
        render(<RecurringDatePicker />);
        
        const weeklyButton = screen.getByRole('button', { name: 'Weekly' });
        fireEvent.click(weeklyButton);
        
        expect(mockStoreActions.setRecurrenceRule).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'weekly' })
        );
    });

    it('shows preview calendar', () => {
        render(<RecurringDatePicker />);
        expect(screen.getByText('Preview Calendar')).toBeInTheDocument();
    });

    it('calls onDatesChange when dates are updated', async () => {
        const mockOnDatesChange = jest.fn();
        
        // Mock store with some preview dates
        mockUseDatePickerStore.mockReturnValue({
            ...mockStoreState,
            previewDates: [new Date('2024-01-01'), new Date('2024-01-02')]
        });
        
        render(<RecurringDatePicker onDatesChange={mockOnDatesChange} />);
        
        await waitFor(() => {
            expect(mockOnDatesChange).toHaveBeenCalledWith([
                new Date('2024-01-01'), 
                new Date('2024-01-02')
            ]);
        });
    });

    it('allows resetting to default state', async () => {
        render(<RecurringDatePicker />);
        
        // Find and click reset button
        const resetButton = screen.getByTitle('Reset to default');
        fireEvent.click(resetButton);
        
        expect(mockStoreActions.reset).toHaveBeenCalled();
    });

    it('handles date range changes', async () => {
        render(<RecurringDatePicker />);
        
        const startDateInput = screen.getByLabelText(/start date/i);
        fireEvent.change(startDateInput, { target: { value: '2024-02-01' } });
        
        expect(mockStoreActions.setDateRange).toHaveBeenCalledWith(
            expect.objectContaining({
                startDate: new Date('2024-02-01')
            })
        );
    });

    it('shows monthly pattern options when monthly is selected', async () => {
        // Mock store with monthly recurrence type
        mockUseDatePickerStore.mockReturnValue({
            ...mockStoreState,
            recurrenceRule: {
                type: 'monthly',
                interval: 1,
                monthlyPattern: 'date'
            }
        });
        
        render(<RecurringDatePicker />);
        
        await waitFor(() => {
            expect(screen.getByText('Repeat by')).toBeInTheDocument();
            expect(screen.getByText('Day of month')).toBeInTheDocument();
            expect(screen.getByText('Day of week')).toBeInTheDocument();
        });
    });

    it('disables recurrence options when recurrence is disabled', () => {
        mockUseDatePickerStore.mockReturnValue({
            ...mockStoreState,
            isEnabled: false
        });
        
        render(<RecurringDatePicker />);
        
        const enableCheckbox = screen.getByLabelText('Enable Recurrence');
        expect(enableCheckbox).not.toBeChecked();
        
        // Recurrence options should not be visible when disabled
        expect(screen.queryByText('Recurrence Pattern')).not.toBeInTheDocument();
    });

    it('applies custom className prop', () => {
        const { container } = render(<RecurringDatePicker className="custom-class" />);
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('does not call onDatesChange when prop is not provided', () => {
        const mockOnDatesChange = jest.fn();
        mockUseDatePickerStore.mockReturnValue({
            ...mockStoreState,
            previewDates: [new Date('2024-01-01')]
        });
        
        render(<RecurringDatePicker />);
        expect(mockOnDatesChange).not.toHaveBeenCalled();
    });

    it('displays preview dates section when enabled and dates exist', () => {
        mockUseDatePickerStore.mockReturnValue({
            ...mockStoreState,
            previewDates: [new Date('2024-01-01'), new Date('2024-01-02')]
        });
        
        render(<RecurringDatePicker />);
        
        expect(screen.getByText('Preview (2 dates)')).toBeInTheDocument();
        expect(screen.getByText('1/1/2024')).toBeInTheDocument();
        expect(screen.getByText('1/2/2024')).toBeInTheDocument();
    });

    it('hides preview dates section when recurrence is disabled', () => {
        mockUseDatePickerStore.mockReturnValue({
            ...mockStoreState,
            isEnabled: false,
            previewDates: [new Date('2024-01-01')]
        });
        
        render(<RecurringDatePicker />);
        
        expect(screen.queryByText(/Preview \(\d+ dates\)/)).not.toBeInTheDocument();
    });

    it('hides preview dates section when no dates exist', () => {
        mockUseDatePickerStore.mockReturnValue({
            ...mockStoreState,
            previewDates: []
        });
        
        render(<RecurringDatePicker />);
        
        expect(screen.queryByText(/Preview \(\d+ dates\)/)).not.toBeInTheDocument();
    });

    it('shows truncated preview when more than 20 dates exist', () => {
        const manyDates = Array.from({ length: 25 }, (_, i) => new Date(2024, 0, i + 1));
        
        mockUseDatePickerStore.mockReturnValue({
            ...mockStoreState,
            previewDates: manyDates
        });
        
        render(<RecurringDatePicker />);
        
        expect(screen.getByText('Preview (25 dates)')).toBeInTheDocument();
        expect(screen.getByText('+5 more')).toBeInTheDocument();
    });

    it('handles yearly recurrence type selection', async () => {
        render(<RecurringDatePicker />);
        
        const yearlyButton = screen.getByRole('button', { name: 'Yearly' });
        fireEvent.click(yearlyButton);
        
        expect(mockStoreActions.setRecurrenceRule).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'yearly' })
        );
    });

    it('updates onDatesChange when preview dates change', async () => {
        const mockOnDatesChange = jest.fn();
        
        const { rerender } = render(<RecurringDatePicker onDatesChange={mockOnDatesChange} />);
        
        // Update preview dates
        mockUseDatePickerStore.mockReturnValue({
            ...mockStoreState,
            previewDates: [new Date('2024-01-01'), new Date('2024-01-08')]
        });
        
        rerender(<RecurringDatePicker onDatesChange={mockOnDatesChange} />);
        
        await waitFor(() => {
            expect(mockOnDatesChange).toHaveBeenCalledWith([
                new Date('2024-01-01'), 
                new Date('2024-01-08')
            ]);
        });
    });

    it('renders reset button with correct attributes', () => {
        render(<RecurringDatePicker />);
        
        const resetButton = screen.getByTitle('Reset to default');
        expect(resetButton).toBeInTheDocument();
        expect(resetButton.tagName).toBe('BUTTON');
    });

    it('shows correct layout with grid classes', () => {
        const { container } = render(<RecurringDatePicker />);
        
        const gridContainer = container.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2');
        expect(gridContainer).toBeInTheDocument();
    });

    it('renders enable recurrence checkbox with correct state', () => {
        mockUseDatePickerStore.mockReturnValue({
            ...mockStoreState,
            isEnabled: false
        });
        
        render(<RecurringDatePicker />);
        
        const checkbox = screen.getByLabelText('Enable Recurrence');
        expect(checkbox).not.toBeChecked();
        expect(checkbox).toHaveProperty('type', 'checkbox');
    });
});
