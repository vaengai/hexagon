// Type definitions for AdvancedHorizontalDatePicker component
// You can import these types for better TypeScript support

export interface DatePickerStyles {
  /** Container wrapper styles */
  container?: string;

  /** Header section styles */
  header?: string;

  /** Current date display area styles */
  currentDateDisplay?: string;

  /** Today button styles */
  todayButton?: string;

  /** Horizontal scroll container styles */
  scrollContainer?: string;

  /** Base date item styles */
  dateItem?: string;

  /** Selected date item styles (overrides dateItem) */
  selectedDateItem?: string;

  /** Today's date item styles (overrides dateItem) */
  todayDateItem?: string;

  /** Disabled date item styles (overrides dateItem) */
  disabledDateItem?: string;

  /** Date content wrapper styles */
  dateContent?: string;

  /** Weekday text styles */
  weekday?: string;

  /** Day number styles */
  dayNumber?: string;

  /** Month text styles */
  month?: string;

  /** Event indicators container styles */
  eventIndicators?: string;

  /** Individual event dot styles */
  eventDot?: string;
}

export interface AdvancedHorizontalDatePickerProps {
  /** Callback when a date is selected */
  onDateSelect?: (date: Date) => void;

  /** Currently selected date */
  selectedDate?: Date;

  /** Minimum selectable date */
  minDate?: Date;

  /** Maximum selectable date */
  maxDate?: Date;

  /** Array of disabled date strings in 'YYYY-MM-DD' format */
  disabledDates?: string[];

  /** Whether to show the "Today" button */
  showToday?: boolean;

  /** Whether to show event indicators */
  showEvents?: boolean;

  /** Events object with date strings as keys and event arrays as values */
  events?: { [key: string]: string[] };

  /** Additional CSS classes for the root container */
  className?: string;

  /** Tailwind CSS class overrides for different parts of the component */
  styles?: DatePickerStyles;
}

// Preset style configurations you can use
export const presetStyles = {
  /** Modern gradient theme */
  modern: {
    container:
      "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 rounded-xl shadow-2xl p-6",
    header: "flex justify-between items-center mb-6",
    todayButton:
      "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-200",
    dateItem:
      "bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200",
    selectedDateItem:
      "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-105",
  },

  /** Minimal clean theme */
  minimal: {
    container: "bg-transparent",
    header: "mb-4",
    todayButton:
      "text-sm bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1",
    dateItem:
      "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg",
    selectedDateItem: "bg-indigo-500 text-white",
  },

  /** Card-based theme */
  card: {
    container:
      "bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700",
    header: "border-b border-gray-200 dark:border-gray-700 pb-3 mb-4",
    dateItem:
      "border border-gray-200 dark:border-gray-600 rounded-lg hover:border-gray-300 dark:hover:border-gray-500",
    selectedDateItem: "border-blue-500 bg-blue-500 text-white",
  },
} as const;

export type PresetStyleKeys = keyof typeof presetStyles;
