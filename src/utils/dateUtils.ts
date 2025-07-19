import { addDays, addWeeks, addMonths, addYears, format, isSameDay, getDay, startOfMonth, getDate, setDate, getISOWeek } from 'date-fns';
import { DateRange, RecurrenceRule } from '../types';

export function generateRecurringDates(
  dateRange: DateRange,
  rule: RecurrenceRule,
  maxDates: number = 100
): Date[] {
  const dates: Date[] = [];
  let currentDate = new Date(dateRange.startDate);
  const endDate = dateRange.endDate || addYears(dateRange.startDate, 2);
  
  while (dates.length < maxDates && currentDate <= endDate) {
    if (shouldIncludeDate(currentDate, rule, dateRange.startDate)) {
      dates.push(new Date(currentDate));
    }
    
    currentDate = getNextDate(currentDate, rule);
    
    // Prevent infinite loops
    if (currentDate > addYears(dateRange.startDate, 5)) break;
  }
  
  return dates;
}

function shouldIncludeDate(date: Date, rule: RecurrenceRule, startDate: Date): boolean {
  switch (rule.type) {
    case 'daily':
      return true;
      
    case 'weekly':
      if (rule.selectedDays && rule.selectedDays.length > 0) {
        return rule.selectedDays.includes(getDay(date));
      }
      return getDay(date) === getDay(startDate);
      
    case 'monthly':
      if (rule.monthlyPattern === 'weekday' && rule.weekOfMonth && rule.dayOfWeek !== undefined) {
        return isNthWeekdayOfMonth(date, rule.weekOfMonth, rule.dayOfWeek);
      }
      return getDate(date) === getDate(startDate);
      
    case 'yearly':
      return (
        date.getMonth() === startDate.getMonth() &&
        getDate(date) === getDate(startDate)
      );
      
    default:
      return false;
  }
}

function getNextDate(currentDate: Date, rule: RecurrenceRule): Date {
  switch (rule.type) {
    case 'daily':
      return addDays(currentDate, rule.interval);
    case 'weekly':
      return addWeeks(currentDate, rule.interval);
    case 'monthly':
      return addMonths(currentDate, rule.interval);
    case 'yearly':
      return addYears(currentDate, rule.interval);
    default:
      return addDays(currentDate, 1);
  }
}

function isNthWeekdayOfMonth(date: Date, weekOfMonth: number, dayOfWeek: number): boolean {
  if (getDay(date) !== dayOfWeek) return false;
  
  const firstDayOfMonth = startOfMonth(date);
  const firstWeekdayOfMonth = addDays(firstDayOfMonth, (dayOfWeek - getDay(firstDayOfMonth) + 7) % 7);
  const nthWeekday = addWeeks(firstWeekdayOfMonth, weekOfMonth - 1);
  
  return isSameDay(date, nthWeekday) && date.getMonth() === nthWeekday.getMonth();
}

export function formatDateForDisplay(date: Date): string {
  return format(date, 'MMM dd, yyyy');
}

export function getWeekdayName(dayIndex: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex];
}

export function getOrdinalSuffix(num: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const value = num % 100;
  return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
}
