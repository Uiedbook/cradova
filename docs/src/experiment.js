class dayTime {
  constructor(dayObject) {
    if (typeof dayObject === "undefined") {
      const month = Date().split(" ")[1];
      const day = Date().split(" ")[2];
      const year = Date().split(" ")[3];
      const time = Date().split(" ")[4];
      this.year = year;
      this.month = month;
      1;
      this.day = day;
      this.time = time;
      if ((Date().split(" ")[3] * 1) % 4 === 0) {
        mArray[1].feb = 29;
      }
    } else if (
      typeof dayObject !== "string" ||
      dayObject.length < 55 ||
      dayObject.length > 65
    ) {
      throw new Error(
        "the given day must be a string of format that Date() returns"
      );
    }

    const month = dayObject.split(" ")[1];
    const day = dayObject.split(" ")[2];
    const year = dayObject.split(" ")[3];
    const time = dayObject.split(" ")[4];
    this.year = year * 1;
    this.month = month;
    this.day = day * 1;
    this.hour = time.split(":")[0] * 1;
    this.minute = time.split(":")[1] * 1;
    this.second = time.split(":")[2] * 1;
    this.time = time;
    if ((dayObject.split(" ")[3] * 1) % 4 === 0) {
      this.isLeapYear = true;
    }
  }
}

export function timeResolver(_1stTime = Date()) {
  return {
    constractTime(_2ndTime) {
      _1stTime = new dayTime(_1stTime);
      _2ndTime = new dayTime(_2ndTime);
      let year = _1stTime.year - _2ndTime.year + "";
      if (year.includes("-")) {
        year = year.slice(1, year.length);
      }
      year = year * 1;

      let daysInMonth1,
        daysInMonth2,
        day = 0,
        month = 0;
      const mArray = [
        { jan: 31 },
        { feb: 28 },
        { mar: 31 },
        { apr: 30 },
        { may: 31 },
        { jun: 30 },
        { jul: 31 },
        { aug: 31 },
        { sep: 30 },
        { oct: 30 },
        { nov: 31 },
        { dec: 31 },
      ];

      function getDaysForwards(ind, time) {
        let days = 0,
          pastDays = time.day,
          m = mArray.slice(0, ind + 1);
        for (let i = 0; i < m.length; i++) {
          if (i === m.length - 1) {
            days += pastDays;
          } else {
            for (const [k, v] of Object.entries(m[i])) {
              days += v;
            }
          }
        }
        return time.isLeapYear === true ? days + 1 : days;
      }

      function getDaysBackwards(ind, time) {
        let days = 0,
          pastDays = time.day,
          m = mArray.slice(ind, mArray.length);
        for (let i = 0; i < m.length; i++) {
          if (i === m.length - 1) {
            days += pastDays;
          } else {
            for (const [k, v] of Object.entries(m[i])) {
              days += v;
            }
          }
        }
        return time.isLeapYear === true ? days + 1 : days;
      }
      if (year < 1) {
        for (let i = 0; i < mArray.length; i++) {
          const mo = mArray[i];
          for (const m in mo) {
            if (_1stTime.month.toLowerCase() === m) {
              daysInMonth1 = getDaysForwards(i, _1stTime);
            }

            if (_2ndTime.month.toLowerCase() === m) {
              daysInMonth2 = getDaysForwards(i, _2ndTime);
            }
          }
        }
        month = ((daysInMonth1 - daysInMonth2) / 30 + "").split(".")[0];
        day = (daysInMonth1 - daysInMonth2) % 30;
      } else if (year === 1) {
        for (let i = 0; i < mArray.length; i++) {
          const mo = mArray[i];
          for (const m in mo) {
            if (_1stTime.month.toLowerCase() === m) {
              daysInMonth1 = getDaysBackwards(i, _1stTime);
            }

            if (_2ndTime.month.toLowerCase() === m) {
              daysInMonth2 = getDaysForwards(i, _2ndTime);
            }
          }
        }
        year = 0;
        month = ((daysInMonth1 + daysInMonth2) / 30 + "").split(".")[0];
        day = (daysInMonth1 + daysInMonth2) % 30;
      } else if (year > 1) {
        for (let i = 0; i < mArray.length; i++) {
          const mo = mArray[i];
          for (const m in mo) {
            if (_1stTime.month.toLowerCase() === m) {
              daysInMonth1 = getDaysBackwards(i, _1stTime);
            }

            if (_2ndTime.month.toLowerCase() === m) {
              daysInMonth2 = getDaysForwards(i, _2ndTime);
            }
          }
        }
        year = year - 1;
        month = ((daysInMonth1 + daysInMonth2) / 30 + "").split(".")[0];
        day = (daysInMonth1 + daysInMonth2) % 30;
      }
      month += "";
      if (month.includes("-")) {
        month = month.slice(1, month.length) * 1;
      } else {
        month = month * 1;
      }
      if (month > 11) {
        year += (month / 12 + "").split(".")[0] * 1;
        month %= month;
      }
      day += "";
      if (day.includes("-")) {
        day = day.slice(1, day.length) * 1;
      } else {
        day = day * 1;
      }
      if (day === 1 && month === 0) {
        day = 0;
      }
      let hour = _1stTime.hour - _2ndTime.hour + "";
      if (hour.includes("-")) {
        hour = hour.slice(1, hour.length) * 1;
      } else {
        hour = hour * 1;
      }

      let minute = _1stTime.minute - _2ndTime.minute + "";
      if (minute.includes("-")) {
        minute = minute.slice(1, minute.length) * 1;
      } else {
        minute *= 1;
      }

      if (minute > 59) {
        hour += (minute / 59 + "").split(".")[0] * 1;
        minute = minute % 59;
      }
      _2ndTime.second = 59 - _2ndTime.second;
      let second = _1stTime.second + _2ndTime.second + "";
      if (second.includes("-")) {
        second = second.slice(1, second.length) * 1;
      } else {
        second *= 1;
      }
      if (second > 59) {
        minute += (second / 59 + "").split(".")[0] * 1;
        second = second % 59;
      }
      if (hour > 23) {
        day += (hour / 24 + "").split(".")[0] * 1;
        hour = hour % 24;
      }
      return {
        year,
        month,
        day,
        hour,
        minute,
        second,
      };
    },
  };
}
