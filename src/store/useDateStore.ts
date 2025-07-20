import { create } from 'zustand'

interface DateState {
  selectedDates: Date[]
  isClient: boolean
  setSelectedDates: (dates: Date[]) => void
  setIsClient: (isClient: boolean) => void
  clearDates: () => void
}

export const useDateStore = create<DateState>()((set) => ({
  // Initial state
  selectedDates: [],
  isClient: false,
  
  // Actions
  setSelectedDates: (dates) => 
    set({ selectedDates: dates }),
  
  setIsClient: (isClient) => 
    set({ isClient }),
  
  clearDates: () => 
    set({ selectedDates: [] }),
}))