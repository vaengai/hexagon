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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

import { HABIT_CATEGORIES } from "@/constants/habitCategories";
import type { HabitCategory } from "@/constants/habitCategories";
import type { HabitFrequency } from "@/constants/habitFrequency";
import { HABIT_FREQUENCY } from "@/constants/habitFrequency";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function AddHabit({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<HabitCategory | "">("");
  const [goal, setGoal] = useState<number[]>([2]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Habit</DialogTitle>
          <DialogDescription>
            Enter details for your new habit.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="habit-name">Habit Name</Label>
              <Input
                id="habit-name"
                name="name"
                placeholder="e.g. Drink Water"
                required
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
            <Label htmlFor="habit-frequency">Frequency</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a frequency"></SelectValue>
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
            <Label htmlFor="habit-goal">
              Goal{" "}
              {
                <span className="text-sm text-muted-foreground ml-auto">
                  {goal[0]}
                </span>
              }
            </Label>

            <Slider
              id="habit-goal"
              value={goal}
              onValueChange={setGoal}
              defaultValue={[2]}
              max={7}
              step={1}
            />
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
