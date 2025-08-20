import React, { useState } from "react";

const CalendarApp = () => {
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // 算出某年某月有幾天，0=「前一個月的最後一天」，再用 .getDate() 取出那一天的日期數字

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  console.log(firstDayOfMonth);

  return (
    <div className="calendar-app">
      <div className="calendar">
        <h1 className="heading">Calendar</h1>
        <div className="navigate-date">
          <h2 className="month">May,</h2>
          <h2 className="year">2025</h2>
          <div className="buttons">
            <i className="bx bx-chevron-left"></i>
            <i className="bx bx-chevron-right"></i>
          </div>
        </div>

        {/*
        在 JavaScript 裡，.map() 的 callback 會帶三個參數：
        array.map((value, index, array) => { ... })
        value 👉 陣列當前元素的值
        index 👉 當前元素的索引（0,1,2...）
        array 👉 原始陣列（很少用） 
        */}

        <div className="weekdays">
          {dayOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="days">
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span key={day + 1}>{day + 1}</span>
          ))}
        </div>
      </div>
      <div className="events">
        <div className="event-popup">
          <div className="time-input">
            <div className="event-popup-time">Time</div>
            <input
              type="number"
              name="hours"
              min={0}
              max={24}
              className="hours"
            />
            <input
              type="number"
              name="minutes"
              min={0}
              max={60}
              className="minutes"
            />
          </div>
          <textarea placeholder="Enter Event Text(Maximum 60 Characters)"></textarea>
          <button className="event-popup-btn">Add Event</button>
          <button className="close-event-popup">
            <i className="bx bx-x"></i>
          </button>
        </div>
        <div className="event">
          <div className="event-date-wrapper">
            <div className="event-date">May 15,2024</div>
            <div className="event-time">10:00</div>
          </div>
          <div className="event-text">Meeeting with John</div>
          <div className="event-buttons">
            <i className="bx bxs-edit-alt"></i>
            <i className="bx  bx-message-x"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;
