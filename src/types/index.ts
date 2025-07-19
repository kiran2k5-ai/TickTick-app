export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RecurrenceRule {
  type: RecurrenceType;
  interval: number;
  selectedDays?: number[];
  monthlyPattern?: 'date' | 'weekday';
  weekOfMonth?: number;
  dayOfWeek?: number;
}

export interface DateRange {
  startDate: Date;
  endDate?: Date;
}

export interface RecurringDatePickerState {
  dateRange: DateRange;
  recurrenceRule: RecurrenceRule;
  isEnabled: boolean;
  previewDates: Date[];
}