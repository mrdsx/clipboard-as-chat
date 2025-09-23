const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

type TimeWithOffsetResult = { hoursWithOffset: number; minutesOffset: number };

function getTimeWithOffset(date: Date): TimeWithOffsetResult {
  const dt = new Date();
  const dateOffsetInMinutes = dt.getTimezoneOffset();
  const dateOffsetInHours = Math.floor(dateOffsetInMinutes / -MINUTES_IN_HOUR);

  const hoursWithOffset = date.getHours() + dateOffsetInHours;
  const minutesWithOffset = Math.abs(dateOffsetInMinutes) % MINUTES_IN_HOUR;

  if (hoursWithOffset < HOURS_IN_DAY) {
    return {
      hoursWithOffset: hoursWithOffset,
      minutesOffset: minutesWithOffset,
    };
  }
  return {
    hoursWithOffset: hoursWithOffset - HOURS_IN_DAY,
    minutesOffset: minutesWithOffset,
  };
}

function getMessageCreationTime(date: Date): string {
  const { hoursWithOffset, minutesOffset } = getTimeWithOffset(date);

  let minutes: string | number = date.getMinutes() + minutesOffset;
  if (String(minutes).length === 1) {
    minutes = `0${minutes}`;
  }

  const timeString = `${hoursWithOffset}:${minutes}`;
  const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const formattedTime = `${timeString} ${dateString}`;

  return formattedTime;
}

export { getMessageCreationTime };
