export const getNextXMonthDate = (x) => {
  const now = new Date();
  // Create a new date to avoid mutating the original
  const nextDate = new Date(now);
  nextDate.setMonth(now.getMonth() + x);
  return nextDate;
}