import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface DateState {
  selectedDates: Date[]
  isClient: boolean
  // Actions
  setSelectedDates: (dates: Date[]) => void
  setIsClient: (isClient: boolean) => void
  addDate: (date: Date) => void
  removeDate: (date: Date) => void
  clearDates: () => void
  // Computed values
  getSortedDates: () => Date[]
}

export const useDateStore = create<DateState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        selectedDates: [],
        isClient: false,
        
        // Actions
        setSelectedDates: (dates) => 
          set({ selectedDates: dates }, false, 'setSelectedDates'),
        
        setIsClient: (isClient) => 
          set({ isClient }, false, 'setIsClient'),
        
        addDate: (date) => 
          set((state) => ({ 
            selectedDates: [...state.selectedDates, date] 
          }), false, 'addDate'),
        
        removeDate: (date) => 
          set((state) => ({ 
            selectedDates: state.selectedDates.filter(d => d.getTime() !== date.getTime()) 
          }), false, 'removeDate'),
        
        clearDates: () => 
          set({ selectedDates: [] }, false, 'clearDates'),
        
        // Computed values
        getSortedDates: () => {
          const { selectedDates } = get()
          return [...selectedDates].sort((a, b) => a.getTime() - b.getTime())
        }
      }),
      {
        name: 'recurring-dates-storage', // localStorage key
        // Custom serialization for Date objects
        serialize: (state) => JSON.stringify({
          ...state,
          state: {
            ...state.state,
            selectedDates: state.state.selectedDates.map(d => d.toISOString())
          }
        }),
        deserialize: (str) => {
          const parsed = JSON.parse(str)
          return {
            ...parsed,
            state: {
              ...parsed.state,
              selectedDates: parsed.state.selectedDates.map((d: string) => new Date(d))
            }
          }
        }
      }
    ),
    { name: 'date-storage' }
  )
)