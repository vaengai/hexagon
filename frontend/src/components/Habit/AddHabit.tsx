import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { HABIT_CATEGORIES } from "@/constants/habitCategories";
import type { HabitCategory } from "@/constants/habitCategories";
import type { HabitFrequency } from "@/constants/habitFrequency";
import { HABIT_FREQUENCY } from "@/constants/habitFrequency";
import type { Habit } from "@/types/habit";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function AddHabit({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (habit: Omit<Habit, "id">) => void;
}) {
  const [selected, setSelected] = useState<HabitCategory | "">("");
  const [target, setTarget] = useState<number>(1);
  const [frequency, setFrequency] = useState<HabitFrequency | "">("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !selected || !frequency) return;
    const PENDING_STATUS = "PENDING" as const;

    const payload = {
      title: name,
      category: selected,
      status: PENDING_STATUS,
      progress: 0,
      target: target,
      active: true,
      frequency: frequency,
    };
    console.log("Submitting habit payload:", payload);
    onSubmit(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Habit</DialogTitle>
          <DialogDescription>
            Enter details for your new habit.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="habit-name">Habit Name</Label>
              <Input
                id="habit-name"
                name="name"
                placeholder="e.g. Drink Water"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2 py-2">
              <Label htmlFor="habit-category">Category</Label>
              <Select
                onValueChange={(value) => setSelected(value as HabitCategory)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {HABIT_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
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
                  className="w-24 appearance-none"
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
                  <SelectTrigger className="flex-1 min-w-0">
                    <SelectValue placeholder="Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {HABIT_FREQUENCY.map((frequency) => (
                        <SelectItem key={frequency} value={frequency}>
                          {frequency}
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
              Add Habit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
