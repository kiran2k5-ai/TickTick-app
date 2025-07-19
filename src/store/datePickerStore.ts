import { create } from 'zustand';
import { RecurringDatePickerState, DateRange, RecurrenceRule } from '../types';
import { generateRecurringDates } from '../utils/dateUtils';

interface DatePickerStore extends RecurringDatePickerState {
  setDateRange: (dateRange: DateRange) => void;
  setRecurrenceRule: (rule: RecurrenceRule) => void;
  setIsEnabled: (enabled: boolean) => void;
  updatePreviewDates: () => void;
  reset: () => void;
}

const initialState: RecurringDatePickerState = {
  dateRange: {
    startDate: new Date(),
    endDate: undefined,
  },
  recurrenceRule: {
    type: 'daily',
    interval: 1,
  },
  isEnabled: true,
  previewDates: [],
};

export const useDatePickerStore = create<DatePickerStore>((set, get) => ({
  ...initialState,
  
  setDateRange: (dateRange: DateRange) => {
    set({ dateRange });
    get().updatePreviewDates();
  },
  
  setRecurrenceRule: (recurrenceRule: RecurrenceRule) => {
    set({ recurrenceRule });
    get().updatePreviewDates();
  },
  
  setIsEnabled: (isEnabled: boolean) => {
    set({ isEnabled });
    if (isEnabled) {
      get().updatePreviewDates();
    } else {
      set({ previewDates: [] });
    }
  },
  
  updatePreviewDates: () => {
    const { dateRange, recurrenceRule, isEnabled } = get();
    if (!isEnabled) {
      set({ previewDates: [] });
      return;
    }
    
    const previewDates = generateRecurringDates(dateRange, recurrenceRule, 50); // Limit to 50 dates for preview
    set({ previewDates });
  },
  
  reset: () => {
    set(initialState);
  },
}));
