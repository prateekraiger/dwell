/**
 * Utility functions for handling errors across the application
 */

/**
 * Extracts a user-friendly error message from various error types
 * Handles ConvexError, standard Error, and unknown error types
 */
export function getErrorMessage(error: unknown): string {
  if (!error) {
    return "An unknown error occurred";
  }

  // Handle ConvexError - the error data is in the 'data' property
  if (typeof error === "object" && error !== null && "data" in error) {
    const convexError = error as { data: unknown };
    if (typeof convexError.data === "string") {
      return convexError.data;
    }
    if (
      typeof convexError.data === "object" &&
      convexError.data !== null &&
      "message" in convexError.data
    ) {
      return String((convexError.data as { message: unknown }).message);
    }
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Handle string errors
  if (typeof error === "string") {
    return error;
  }

  // Fallback for unknown error types
  return "An unexpected error occurred";
}

/**
 * Formats error messages for display to users
 * Capitalizes first letter and ensures proper punctuation
 */
export function formatErrorMessage(message: string): string {
  if (!message) return "An error occurred";

  // Capitalize first letter
  const formatted = message.charAt(0).toUpperCase() + message.slice(1);

  // Add period if not present
  if (!formatted.endsWith(".") && !formatted.endsWith("!") && !formatted.endsWith("?")) {
    return formatted + ".";
  }

  return formatted;
}

/**
 * Combined utility to get and format error messages
 */
export function getFormattedErrorMessage(error: unknown): string {
  return formatErrorMessage(getErrorMessage(error));
}
