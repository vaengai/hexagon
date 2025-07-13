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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddHabit({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Habit</DialogTitle>
          <DialogDescription>
            Enter details for your new habit.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // handle form submission here
            onClose();
          }}
        >
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
            <div className="grid gap-2">
              <Label htmlFor="habit-category">Category</Label>
              <Input
                id="habit-category"
                name="category"
                placeholder="e.g. Health"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Add Habit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
