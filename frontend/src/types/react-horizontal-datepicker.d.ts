declare module "react-horizontal-datepicker" {
  import { ComponentType } from "react";

  interface DatePickerProps {
    getSelectedDay?: (date: Date) => void;
    endDate?: number;
    selectDate?: Date;
    labelFormat?: string;
    color?: string;
    marked?: Date[];
    className?: string;
  }

  const DatePicker: ComponentType<DatePickerProps>;
  export default DatePicker;
}
