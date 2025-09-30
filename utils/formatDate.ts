// 17/09/2025, 14:07:10
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
}

// Fri Oct 17 2025
export function formatDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  // Ye format deta hai: Fri Oct 17 2025
  return date.toDateString();
}
