import React, { useState, useRef, useEffect } from "react";
import "./AdvancedHorizontalDatePicker.css";
import { cn } from "@/lib/utils";

interface DatePickerStyles {
  container?: string;
  header?: string;
  currentDateDisplay?: string;
  todayButton?: string;
  scrollContainer?: string;
  dateItem?: string;
  selectedDateItem?: string;
  todayDateItem?: string;
  disabledDateItem?: string;
  dateContent?: string;
  weekday?: string;
  dayNumber?: string;
  month?: string;
  eventIndicators?: string;
  eventDot?: string;
}

interface AdvancedHorizontalDatePickerProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: string[];
  showToday?: boolean;
  showEvents?: boolean;
  events?: { [key: string]: string[] }; // { '2025-08-09': ['event1', 'event2'] }
  className?: string;
  styles?: DatePickerStyles;
}

const AdvancedHorizontalDatePicker: React.FC<
  AdvancedHorizontalDatePickerProps
> = ({
  onDateSelect,
  selectedDate = new Date(),
  minDate,
  maxDate,
  disabledDates = [],
  showToday = true,
  showEvents = false,
  events = {},
  className = "",
  styles = {},
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(selectedDate);
  const [visibleDates, setVisibleDates] = useState<Date[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate 30 days around current date
  useEffect(() => {
    const dates: Date[] = [];
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 15);

    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    setVisibleDates(dates);
  }, [currentDate]);

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    setCurrentDate(date);
    onDateSelect?.(date);
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;

    const dateString = date.toISOString().split("T")[0];
    return disabledDates.includes(dateString);
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date): boolean => {
    return date.toDateString() === currentDate.toDateString();
  };

  const hasEvents = (date: Date): boolean => {
    const dateString = date.toISOString().split("T")[0];
    return events[dateString] && events[dateString].length > 0;
  };

  const scrollToToday = () => {
    const today = new Date();
    setCurrentDate(today);

    // Scroll to today's date
    setTimeout(() => {
      const todayElement = containerRef.current?.querySelector(".today");
      if (todayElement) {
        todayElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }, 100);
  };

  return (
    <div
      className={cn(
        "advanced-horizontal-date-picker",
        styles.container,
        className
      )}
    >
      {/* Header */}
      <div className={cn("picker-header", styles.header)}>
        <div className={cn("current-date-display", styles.currentDateDisplay)}>
          <h3>
            {currentDate.toLocaleDateString("en", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h3>
        </div>

        {showToday && (
          <button
            className={cn("today-button", styles.todayButton)}
            onClick={scrollToToday}
          >
            Today
          </button>
        )}
      </div>

      {/* Dates Container */}
      <div
        className={cn("dates-scroll-container", styles.scrollContainer)}
        ref={containerRef}
      >
        {visibleDates.map((date, index) => {
          const dateString = date.toISOString().split("T")[0];
          const dayEvents = events[dateString] || [];

          const getDateItemClasses = () => {
            const baseClass = "advanced-date-item";
            const customClass = styles.dateItem || "";

            if (isSelected(date)) {
              return cn(
                baseClass,
                "selected",
                styles.selectedDateItem,
                customClass
              );
            }
            if (isToday(date)) {
              return cn(baseClass, "today", styles.todayDateItem, customClass);
            }
            if (isDateDisabled(date)) {
              return cn(
                baseClass,
                "disabled",
                styles.disabledDateItem,
                customClass
              );
            }
            if (hasEvents(date)) {
              return cn(baseClass, "has-events", customClass);
            }
            return cn(baseClass, customClass);
          };

          return (
            <div
              key={index}
              className={getDateItemClasses()}
              onClick={() => handleDateClick(date)}
            >
              <div className={cn("date-content", styles.dateContent)}>
                <div className={cn("weekday", styles.weekday)}>
                  {date.toLocaleDateString("en", { weekday: "short" })}
                </div>

                <div className={cn("day-number", styles.dayNumber)}>
                  {date.getDate()}
                </div>

                <div className={cn("month", styles.month)}>
                  {date.toLocaleDateString("en", { month: "short" })}
                </div>

                {/* Event indicators */}
                {showEvents && hasEvents(date) && (
                  <div
                    className={cn("event-indicators", styles.eventIndicators)}
                  >
                    {dayEvents.slice(0, 3).map((_, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={cn("event-dot", styles.eventDot)}
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="more-events">
                        +{dayEvents.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdvancedHorizontalDatePicker;
