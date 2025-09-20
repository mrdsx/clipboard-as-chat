function getMessageCreationTime(date: Date): string {
  let minutes: string | number = date.getMinutes();
  if (String(minutes).length === 1) {
    minutes = `0${minutes}`;
  }

  const timeString = `${date.getHours()}:${minutes}`;
  const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const formattedTime = `${timeString} ${dateString}`;

  return formattedTime;
}

export { getMessageCreationTime };
