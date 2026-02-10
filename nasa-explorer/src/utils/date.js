export function formatDate(date) {
  return date.toISOString().split("T")[0];
}

export function getLast7Days() {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 6);

  return {
    start: formatDate(start),
    end: formatDate(end),
  };
}
