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

  /*
  Date相關meyhods:
  const now = new Date();
  now.getFullYear();  // 年份，例如 2025
  now.getMonth();     // 月份 (0-11，0=一月，所以要+1才是正常月份)
  now.getDate();      // 日期 (1-31)
  now.getDay();       // 星期幾 (0-6，0=星期日)
  now.getHours();     // 小時 (0-23)
  now.getMinutes();   // 分鐘 (0-59)
  now.getSeconds();   // 秒 (0-59)
  now.getMilliseconds(); // 毫秒 (0-999)
  */

  // React 的 Hook，const [狀態值, 修改狀態的方法] = useState(初始值);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth()); //  取得月份(0-11，0=一月)
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear()); // 取得四位數的年份
  const [selectedDay, setSelectedDay] = useState(currentDate); // 預設選擇今天
  const [showEventPopup, setShowEventPopup] = useState(false); // 控制事件彈窗顯示與否
  const [events, setEvents] = useState([]); // 儲存事件的陣列
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" }); // 儲存事件時間的物件
  const [eventText, setEventText] = useState(""); // 儲存事件文字的字串

  // 計算當前月份的天數
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // 算出某年某月有幾天，0=「前一個月的最後一天」，再用 .getDate() 取出那一天的日期數字

  // 計算當前月份的第一天是星期幾，0=星期日，1=星期一，依此類推
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // 切換上一個月份
  const prevMonth = () => {
    // 如果當前月份是1月(0)，則切換到12月(11)，並且年份減1
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  // 切換下一個月份
  const nextMonth = () => {
    // 如果當前月份是12月(11)，則切換到1月(0)，並且年份加1
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  // 點擊日期的處理函式
  const handleDateClick = (day) => {
    const clickDate = new Date(currentYear, currentMonth, day);
    const today = new Date();
    // 如果點擊的日期大於或等於今天，則選擇該日期並顯示事件彈窗
    if (clickDate >= today || isSameDay(clickDate, today)) {
      setSelectedDay(clickDate);
      setShowEventPopup(true); // 顯示事件彈窗
      setEventTime({ hours: "00", minutes: "00" }); // 重設時間(歸零)
      setEventText(""); // 重設事件文字(清空)
    }
  };

  const isSameDay = (data1, data2) => {
    return (
      data1.getDate() === data2.getDate() &&
      data1.getMonth() === data2.getMonth() &&
      data1.getFullYear() === data2.getFullYear()
    );
  };

  const handleEventSubmit = () => {
    const newEvent = {
      date: selectedDay,
      // padStart(2, "0") 用來補足兩位數，不足的話在前面補0
      time: `${eventTime.hours.padStart(2, "0")}:${eventTime.minutes.padStart(
        2,
        "0"
      )}`,
      text: eventText,
    };

    setEvents([...events, newEvent]); // 使用展開運算子(...)來新增事件到陣列
    setEventTime({ hours: "00", minutes: "00" }); // 重設時間(歸零)
    setEventText(""); // 重設事件文字(清空)
    setShowEventPopup(false); // 隱藏事件彈窗
  };

  return (
    <div className="calendar-app">
      <div className="calendar">
        <h1 className="heading">Calendar</h1>
        <div className="navigate-date">
          <h2 className="month">{monthOfYear[currentMonth]}</h2>
          <h2 className="year">{currentYear}</h2>
          <div className="buttons">
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
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
          {/*
            // 建立一個長度 = firstDayOfMonth 的陣列  .keys() 產生索引 [0,1,2,...]
            // .map() 依索引產生空白 <span>  用來在日曆前補空格，讓1號對齊正確星期
          */}
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            // ...展開運算子（spread） 把迭代器產生的值「攤平」成真正的陣列
            <span key={`empty-${index}`} />
          ))}
          {/* 產生 1 號到當月最後一天的 <span></span> */}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              key={day + 1}
              // day + 1 === currentDate.getDate()        // 今天是幾號
              // currentMonth === currentDate.getMonth()  // 當前顯示的月是否等於今天的月
              // currentYear === currentDate.getFullYear() // 當前顯示的年是否等於今天的年
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "current-day"
                  : ""
              }
              onClick={() => handleDateClick(day + 1)} // day 從 0 開始，所以要 +1
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>
      <div className="events">
        {showEventPopup && (
          <div className="event-popup">
            <div className="time-input">
              <div className="event-popup-time">Time</div>
              <input
                type="number"
                name="hours"
                min={0}
                max={24}
                className="hours"
                value={eventTime.hours}
                onChange={
                  (e) => setEventTime({ ...eventTime, hours: e.target.value })
                  // ...eventTime 先保留原本的其他屬性（如 minutes），再覆蓋你要改的那個值。
                }
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={60}
                className="minutes"
                value={eventTime.minutes}
                onChange={(e) =>
                  setEventTime({ ...eventTime, minutes: e.target.value })
                }
              />
            </div>
            <textarea
              placeholder="Enter Event Text(Maximum 60 Characters)"
              value={eventText}
              onChange={(e) => {
                if (e.target.value.length <= 60) setEventText(e.target.value);
              }}
            ></textarea>
            <button className="event-popup-btn" onClick={handleEventSubmit}>
              Add Event
            </button>
            <button
              className="close-event-popup"
              onClick={() => setShowEventPopup(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
        )}
        {events.map((event, index) => (
          <div className="event" key={index}>
            <div className="event-date-wrapper">
              <div className="event-date">{`${
                monthOfYear[event.date.getMonth()]
              } ${event.date.getDate()}, ${event.date.getFullYear()}`}</div>
              <div className="event-time">{event.time}</div>
            </div>
            <div className="event-text">{event.text}</div>
            <div className="event-buttons">
              <i className="bx bxs-edit-alt"></i>
              <i className="bx bx-message-x"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarApp;
