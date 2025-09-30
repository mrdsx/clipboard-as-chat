const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

type TimeWithOffsetResult = {
  hoursWithOffset: number;
  daysOffset: number;
  minutesOffset: number;
};

function getTimeWithOffset(
  date: Date,
  showLocalTime: boolean,
): TimeWithOffsetResult {
  if (!showLocalTime) {
    return {
      hoursWithOffset: date.getHours(),
      daysOffset: 0,
      minutesOffset: 0,
    };
  }

  const dt = new Date();
  const dateOffsetInMinutes = dt.getTimezoneOffset();
  const dateOffsetInHours = Math.floor(dateOffsetInMinutes / -MINUTES_IN_HOUR);

  const hoursWithOffset = date.getHours() + dateOffsetInHours;
  const minutesWithOffset = Math.abs(dateOffsetInMinutes) % MINUTES_IN_HOUR;

  if (hoursWithOffset < HOURS_IN_DAY) {
    return {
      hoursWithOffset: hoursWithOffset,
      daysOffset: 0,
      minutesOffset: minutesWithOffset,
    };
  }
  return {
    hoursWithOffset: hoursWithOffset - HOURS_IN_DAY,
    daysOffset: 1,
    minutesOffset: minutesWithOffset,
  };
}

function getMessageCreationTime(date: Date, showLocalTime: boolean): string {
  const { hoursWithOffset, daysOffset, minutesOffset } = getTimeWithOffset(
    date,
    showLocalTime,
  );

  let daysWithOffset = date.getDate() + daysOffset;
  let monthsOffset = 1;
  if (daysWithOffset > getDaysInMonth(date.getFullYear(), date.getMonth())) {
    daysWithOffset -= getDaysInMonth(date.getFullYear(), date.getMonth());
    monthsOffset += 1;
  }

  let minutesWithOffset: string | number = date.getMinutes() + minutesOffset;
  if (String(minutesWithOffset).length === 1) {
    minutesWithOffset = `0${minutesWithOffset}`;
  }

  const timeString = `${hoursWithOffset}:${minutesWithOffset}`;
  const dateString = `${daysWithOffset}-${date.getMonth() + monthsOffset}-${date.getFullYear()}`;
  const formattedTime = `${timeString} ${dateString}`;

  return formattedTime;
}

export { getMessageCreationTime };
