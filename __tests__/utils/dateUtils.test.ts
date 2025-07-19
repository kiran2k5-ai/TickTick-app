import { generateRecurringDates, formatDateForDisplay, getWeekdayName } from '../../src/utils/dateUtils';
import { DateRange, RecurrenceRule } from '../../src/types';

describe('dateUtils', () => {
  describe('generateRecurringDates', () => {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-31');
    const dateRange: DateRange = { startDate, endDate };

    it('should generate daily recurring dates', () => {
      const rule: RecurrenceRule = { type: 'daily', interval: 1 };
      const dates = generateRecurringDates(dateRange, rule, 10);
      
      expect(dates).toHaveLength(10);
      expect(dates[0]).toEqual(startDate);
      expect(dates[1]).toEqual(new Date('2024-01-02'));
    });

    it('should generate weekly recurring dates', () => {
      const rule: RecurrenceRule = { 
        type: 'weekly', 
        interval: 1,
        selectedDays: [1, 3, 5] // Monday, Wednesday, Friday
      };
      const dates = generateRecurringDates(dateRange, rule, 20);
      
      // Should only include Monday, Wednesday, Friday
      dates.forEach(date => {
        expect([1, 3, 5]).toContain(date.getDay());
      });
    });

    it('should generate monthly recurring dates by date', () => {
      const rule: RecurrenceRule = { 
        type: 'monthly', 
        interval: 1,
        monthlyPattern: 'date'
      };
      const dates = generateRecurringDates(dateRange, rule, 5);
      
      // All dates should be on the 1st of the month
      dates.forEach(date => {
        expect(date.getDate()).toBe(1);
      });
    });

    it('should generate monthly recurring dates by weekday pattern', () => {
      const rule: RecurrenceRule = { 
        type: 'monthly', 
        interval: 1,
        monthlyPattern: 'weekday',
        weekOfMonth: 1,
        dayOfWeek: 1 // First Monday
      };
      const dates = generateRecurringDates(dateRange, rule, 5);
      
      // All dates should be Mondays
      dates.forEach(date => {
        expect(date.getDay()).toBe(1);
      });
    });

    it('should respect the interval setting', () => {
      const rule: RecurrenceRule = { type: 'daily', interval: 3 };
      const dates = generateRecurringDates(dateRange, rule, 5);
      
      expect(dates[0]).toEqual(startDate);
      expect(dates[1]).toEqual(new Date('2024-01-04'));
      expect(dates[2]).toEqual(new Date('2024-01-07'));
    });
  });

  describe('formatDateForDisplay', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15');
      expect(formatDateForDisplay(date)).toBe('Jan 15, 2024');
    });
  });

  describe('getWeekdayName', () => {
    it('should return correct weekday names', () => {
      expect(getWeekdayName(0)).toBe('Sunday');
      expect(getWeekdayName(1)).toBe('Monday');
      expect(getWeekdayName(6)).toBe('Saturday');
    });
  });
});
