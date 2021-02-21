export function FormattedDate({ date, msg }) {
  const year = date.substring(0, 4);
  let month = Number(date.substring(5, 7));
  const day = date.substring(8, 10);
  function handleMonth(param) {
    switch (param) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "Mars";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "";
    }
  }
  month = handleMonth(month);
  return (
    <span className="text-muted f-w-400">
      {msg} : {month} {day}, {year}
    </span>
  );
}
