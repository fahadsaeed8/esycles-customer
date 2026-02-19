/**
 * Pads a number with leading zero for mm.dd.yyyy format.
 */
function padTwo(n: number): string {
  return n.toString().padStart(2, "0");
}

/**
 * Converts date from YYYY-MM-DD format to mm.dd.yyyy format
 * Example: "2025-08-01" -> "08.01.2025"
 * Example: "2026-11-21" -> "11.21.2026"
 */
export function formatDateToMDY(dateString: string): string {
  try {
    // Handle different date formats
    let date: Date;

    // If it's already in YYYY-MM-DD format
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      date = new Date(dateString + "T00:00:00");
    } else {
      // Try to parse as is
      date = new Date(dateString);
    }

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }

    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();
    const year = date.getFullYear();

    return `${padTwo(month)}.${padTwo(day)}.${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return original on error
  }
}

/**
 * Converts date from any format to mm.dd.yyyy format
 * Handles formats like "Aug 12, 2025", "2025-08-12", etc.
 * Example: "Aug 12, 2025" -> "08.12.2025"
 */
export function formatAnyDateToMDY(dateString: string): string {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${padTwo(month)}.${padTwo(day)}.${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
}


