export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (
    typeof error === "number" ||
    typeof error === "boolean" ||
    typeof error === "bigint"
  ) {
    return String(error);
  }

  try {
    const serialized = JSON.stringify(error, null, 2);
    return serialized ?? "An unknown error occurred.";
  } catch {
    return "An unknown error occurred.";
  }
}
