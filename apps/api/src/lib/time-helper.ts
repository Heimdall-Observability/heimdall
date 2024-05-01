export const getTimeRange = (startDate: Date, endDate: Date) => {
  return endDate.getTime() - startDate.getTime()
}
