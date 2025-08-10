// Example usage of AdvancedHorizontalDatePicker with Tailwind CSS overrides

import AdvancedHorizontalDatePicker from "./AdvancedHorizontalDatePicker";

// Example 1: Basic usage with custom container styling
const BasicExample = () => {
  return (
    <AdvancedHorizontalDatePicker
      className="my-8"
      styles={{
        container: "bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4",
        header: "mb-4 border-b border-gray-200 dark:border-gray-700 pb-3",
      }}
    />
  );
};

// Example 2: Completely custom styled date picker
const CustomStyledExample = () => {
  return (
    <AdvancedHorizontalDatePicker
      styles={{
        // Container styling
        container:
          "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 rounded-xl shadow-2xl p-6",

        // Header styling
        header:
          "flex flex-col sm:flex-row justify-between items-center mb-6 space-y-3 sm:space-y-0",
        currentDateDisplay: "text-center sm:text-left",
        todayButton:
          "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5",

        // Scroll container
        scrollContainer:
          "flex gap-3 overflow-x-auto py-4 px-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600",

        // Date items
        dateItem:
          "min-w-[80px] h-24 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-600",
        selectedDateItem:
          "bg-gradient-to-br from-blue-500 to-purple-600 text-white border-blue-500 shadow-lg scale-105",
        todayDateItem: "border-orange-400 bg-orange-50 dark:bg-orange-900/20",
        disabledDateItem: "opacity-40 cursor-not-allowed grayscale",

        // Date content
        dateContent:
          "h-full flex flex-col justify-center items-center space-y-1",
        weekday: "text-xs font-medium uppercase tracking-wide opacity-70",
        dayNumber: "text-2xl font-bold",
        month: "text-xs font-medium uppercase tracking-wide opacity-70",

        // Event indicators
        eventIndicators: "flex gap-1 mt-1",
        eventDot: "w-1.5 h-1.5 bg-green-400 rounded-full",
      }}
      showEvents={true}
      events={{
        "2025-08-10": ["Meeting", "Workout"],
        "2025-08-12": ["Conference Call", "Dentist", "Gym"],
      }}
    />
  );
};

// Example 3: Minimal styling override
const MinimalExample = () => {
  return (
    <AdvancedHorizontalDatePicker
      className="w-full max-w-4xl mx-auto"
      styles={{
        container: "bg-transparent",
        header: "hidden", // Hide the header completely
        scrollContainer: "justify-center",
        dateItem:
          "mx-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
        selectedDateItem: "bg-indigo-500 text-white",
      }}
    />
  );
};

// Example 4: Mobile-first responsive design
const ResponsiveExample = () => {
  return (
    <AdvancedHorizontalDatePicker
      styles={{
        container: "w-full",
        header:
          "flex flex-col space-y-2 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 mb-4",
        currentDateDisplay: "text-center sm:text-left order-2 sm:order-1",
        todayButton:
          "order-1 sm:order-2 self-center sm:self-auto px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600",
        scrollContainer: "gap-2 sm:gap-3 px-4 sm:px-0",
        dateItem:
          "min-w-[60px] sm:min-w-[70px] h-16 sm:h-20 text-sm sm:text-base",
        dayNumber: "text-lg sm:text-xl font-semibold",
      }}
    />
  );
};

export { BasicExample, CustomStyledExample, MinimalExample, ResponsiveExample };
