export const extractTimeStringFilter = (dateStr: string) => {
  const shortUnit = dateStr.slice(-1);
  let unit = 'day';
  const amount = parseInt(dateStr.slice(0, dateStr.length - 1));
  switch (shortUnit) {
    case 'D':
      unit = 'day';
      break;
    case 'W':
      unit = 'week';
      break;
    case 'M':
      unit = 'month';
      break;
    case 'Y':
      unit = 'year';
      break;
    default:
      break;
  }
  return { unit, amount };
};
