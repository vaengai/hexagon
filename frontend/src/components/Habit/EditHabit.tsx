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
    onSubmit({
      ...habit,
      title: name,
      category: category as HabitCategory,
      target: target,
      frequency: frequency as HabitFrequency,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="font-mono">
        <DialogHeader>
          <DialogTitle>Edit Habit</DialogTitle>
          <DialogDescription>Edit your habit details below</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label htmlFor="habit-name">Habit Name</Label>
          <Input
            className="font-mono"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Label htmlFor="habit-category">Category</Label>

          <Select
            onValueChange={(value) => setCategory(value as HabitCategory)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={category} />
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
          <div className="grid gap-2 py-2">
            <div>
              <Label htmlFor="habit-target">Target</Label>
              <div className="flex items-center gap-2 mb-2 my-4">
                <Input
                  type="number"
                  value={target}
                  min={1}
                  onChange={(e) => setTarget(Number(e.target.value))}
                  className="w-24 font-mono"
                  required
                />
                <span className="mx-1">times per</span>
                <Select
                  onValueChange={(value) =>
                    setFrequency(value as HabitFrequency)
                  }
                >
                  <SelectTrigger className="flex-1 min-w-0">
                    <SelectValue placeholder={frequency} className="w-full" />
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
          <div className="border-t border-border my-6"></div>

          <DialogFooter className="gap-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="px-4">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="px-4">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
