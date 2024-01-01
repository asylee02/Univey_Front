import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";
import "tailwindcss/tailwind.css";
import ko from 'date-fns/locale/ko';
import CalendarIcon from '../icons/CalendarIcon';

const CustomDatePicker = ({ selectedDate, handleChange, isRequired, validationStatus, handleValidation }) => {

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday (0) or Saturday (6)
  };

  const isSameMonth = (date, currentDate) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const CustomInput = React.forwardRef(({ value, onClick, onBlur }, ref) => (
    <div className="relative flex items-center w-full">
      <input
        ref={ref}
        className={`pb-2 w-full ${
          (!value && !validationStatus) ? "border-2 rounded border-red-400 pt-2 pl-1" : "border-b-2 border-survey_border_color"
        } focus:outline-none ${value ? 'text-text_color' : ''}`}
        type="text"
        value={value}
        placeholder="YY/MM/DD"
        readOnly
        onClick={onClick}
        onBlur={onBlur}
      />
      <div className={`absolute right-0 mr-2 mb-1 cursor-pointer ${!value && !validationStatus ? 'top-1.6' : ''}`} onClick={onClick}>
        <CalendarIcon />
      </div>
    </div>
  ));

  return (
    <div className="relative w-full mb-1 md:mb-2">
      <DatePicker
        dayClassName={(date) =>
          isWeekend(date)
            ? "text-calendar_weekend"
            : isSameMonth(date, new Date())
            ? isToday(date)
              ? "text-white"
              : "text-text_color"
            : "text-gray-400"
        }
        weekClassName="bg-text_color"
        dateFormat="yyyy-MM-dd"
        placeholderText="YY/MM/DD"
        shouldCloseOnSelect
        minDate={new Date()}
        maxDate={null}
        selected={selectedDate ? new Date(selectedDate) : null}
        required={isRequired}
        calendarStartDay={1}
        onChange={(date) => {
          const isDateValid = date && !isNaN(date.getTime());
          const formattedDate = isDateValid ? formatDate(date) : null;
          handleChange(formattedDate);

          handleValidation(5, isDateValid);
        }}
        customInput={<CustomInput />}

        renderCustomHeader={({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
          <div className="bg-main_color text-white p-2 flex items-center justify-center">
            <button
              className="mr-2"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              {"<"}
            </button>
            <div className="flex text-center">{date.toLocaleDateString("en-US", { month: "numeric" })}월</div>
            <button
              className="ml-2"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              {">"}
            </button>
          </div>
        )}
        calendarContainer={({ className, children }) => (
          <div className={`bg-white ${className}`}>
            {children}
          </div>
        )}
        locale={ko}
      />
    </div>
  );
};

export default CustomDatePicker;
