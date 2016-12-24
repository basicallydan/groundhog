export default function hoursBetween(firstDate, secondDate) {
  // The number of milliseconds in one day
  const ONE_HOUR = 1000 * 60 * 60;

  // Convert both dates to milliseconds
  const firstDateMilliseconds = firstDate.getTime();
  const secondDateMilliseconds = secondDate.getTime();

  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(firstDateMilliseconds - secondDateMilliseconds);

  // Convert back to hours and return
  return Math.round(differenceMs / ONE_HOUR);
}
