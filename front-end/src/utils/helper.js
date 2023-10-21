const formatDate = (string = "") => {
  const [date, time] = new Date(string)
    .toLocaleDateString("en-US", {
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    })
    .split(",");
  if ((date, time)) {
    const [month, day] = date.split(" ");
    return `${time}    ${day}${month}`;
  }
  return "-";
};

export { formatDate };
