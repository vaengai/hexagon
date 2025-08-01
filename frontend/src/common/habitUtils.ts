import type {Habit} from "@/types/habit.ts";

export function validateForm(payload: Omit<Habit, "id">) {
    const errors: string[] = [];
    if (!payload.title || payload.title.trim() === "") {
        errors.push("Title is required.");
    }
    if (payload.title.trim().length > 21) {
        errors.push("Title can't be longer than 21 characters.");
    }
    if (!payload.category) {
        errors.push("Category is required.");
    }
    if (!payload.frequency) {
        errors.push("Frequency is required.");
    }
    if (!payload.target || payload.target < 1) {
        errors.push("Target must be at least 1.");
    }
    return errors;
}
