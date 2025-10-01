import { addMinutes } from "date-fns";

function convertNumberToString(n: number): string {
  if (String(n).length === 1) {
    return `0${n}`;
  }
  return String(n);
}

function getMessageCreationTime(date: Date, showLocalTime: boolean): string {
  const minutesOffset = !showLocalTime ? 0 : -new Date().getTimezoneOffset();
  date = addMinutes(date, minutesOffset);

  const [hours, minutes, days, months] = [
    convertNumberToString(date.getHours()),
    convertNumberToString(date.getMinutes()),
    convertNumberToString(date.getDate()),
    convertNumberToString(date.getMonth() + 1),
  ];

  const timeString = `${hours}:${minutes}`;
  const dateString = `${days}.${months}.${date.getFullYear()}`;
  const formattedTime = `${timeString} ${dateString}`;

  return formattedTime;
}

export { getMessageCreationTime };
