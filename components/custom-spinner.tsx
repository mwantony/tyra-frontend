"use client";

export function CustomSpinner() {
  return (
    <div className="flex items-center justify-center min-h-100">
      <div className="w-6 h-6 border-4 border-t-transparent border-primary rounded-full animate-spin" />
    </div>
  );
}
