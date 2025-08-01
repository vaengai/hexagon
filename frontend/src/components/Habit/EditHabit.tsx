import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { HABIT_CATEGORIES } from "@/types/habitCategory";
import type { HabitCategory } from "@/types/habitCategory";
import type { HabitFrequency } from "@/types/habitFrequency";
import { HABIT_FREQUENCY } from "@/types/habitFrequency";
import type { Habit } from "@/types/habit";
import {validateForm} from "@/common/habitUtils.ts";

export default function EditHabit({
  open,
  onClose,
  habit,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  habit: Habit | null;
  onSubmit: (habit: Habit) => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<HabitCategory | "">("");
  const [target, setTarget] = useState<number>(1);
  const [frequency, setFrequency] = useState<HabitFrequency | "">("");
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    if (habit) {
      setName(habit.title);
      setCategory(habit.category);
      setTarget(habit.target);
      setFrequency(habit.frequency);
    }
  }, [habit]);

  if (!habit) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
        ...habit,
        title: name,
        category: category as HabitCategory,
        target: target,
        frequency: frequency as HabitFrequency,
    }
    const errors : string[]  = validateForm(payload as Omit<Habit, "id">);
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);
    onSubmit(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] font-mono">
        <DialogHeader>
          <DialogTitle>Edit Habit</DialogTitle>
          <DialogDescription>Edit your habit details below</DialogDescription>
        </DialogHeader>
        {formErrors.length > 0 && (
            <div className="mb font-mono test-sm, text-red-500">
              <ul className="list-disc pl-5">
                {formErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 font-mono">
            <div className="grid gap-2 font-mono">
              <Label htmlFor="habit-name">Habit Name</Label>
              <Input
                id="habit-name"
                name="name"
                className="font-mono"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Drink Water"
              />
            </div>
            <div className="grid gap-2 py-2 font-mono">
              <Label htmlFor="habit-category">Category</Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value as HabitCategory)}
              >
                <SelectTrigger className="w-full font-mono">
                  <SelectValue
                    className="font-mono"
                    placeholder="Select a category"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {HABIT_CATEGORIES.map((cat) => (
                      <SelectItem className="font-mono" key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 py-2">
              <div>
                <Label htmlFor="habit-target">Target</Label>
                <div className="flex items-center gap-2 mb-2 my-4">
                  <Input
                    id="habit-times"
                    name="target"
                    type="number"
                    min={1}
                    className="w-24 font-mono appearance-none"
                    placeholder="1"
                    required
                    value={target}
                    onChange={(e) => setTarget(Number(e.target.value))}
                  />
                  <span className="mx-1">times per</span>
                  <Select
                    value={frequency}
                    onValueChange={(value) =>
                      setFrequency(value as HabitFrequency)
                    }
                  >
                    <SelectTrigger className="flex-1 min-w-0 font-mono">
                      <SelectValue
                        className="font-mono"
                        placeholder="Frequency"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {HABIT_FREQUENCY.map((freq) => (
                          <SelectItem
                            className="font-mono"
                            key={freq}
                            value={freq}
                          >
                            {freq}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border my-6"></div>
          <DialogFooter className="gap-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="px-4 font-mono"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="px-4 font-mono">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
