"use client";

import * as React from "react";
import Confetti from "react-confetti";
import {
  type ColumnDef,
  type SortingState,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  IconPlus,
  IconChevronDown,
  IconLayoutColumns,
  IconLayoutGrid,
  IconLayoutList,
  IconTrophy, // ✅ Add trophy icon import
} from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import Action from "../Habit/Action";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { AddHabit } from "../Habit/AddHabit";
import EditHabit from "../Habit/EditHabit";

import type { Habit } from "@/types/habit";
import StatusButton from "../Habit/StatusButton";
import ToggleActive from "../Habit/ToggleActive";
import { useWindowSize } from "@react-hook/window-size";
import SpotlightCard from "../animations/SpotlightCard/SpotlightCard";

type DataTableProps = {
  columns: ColumnDef<Habit, unknown>[];
  data: Habit[];
  onDeleteHabit: (id: string) => void;
  refetchHabits: () => void;
  showConfetti: boolean;
  setShowConfetti: (show: boolean) => void;
  handleDone: () => void;
};

export function DataTable({
  columns: baseColumns,
  data,
  onDeleteHabit,
  refetchHabits,
  showConfetti,
  setShowConfetti,
  handleDone,
}: DataTableProps) {
  const [showAddHabit, setShowAddHabit] = React.useState(false);
  const [showEditHabit, setShowEditHabit] = React.useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [editHabit, setEditHabit] = React.useState<Habit | null>(null);
  const [width, height] = useWindowSize();

  const handleEditClick = React.useCallback((habit: Habit) => {
    setEditHabit(habit);
    setShowEditHabit(true);
  }, []);

  const columns = React.useMemo(
    () =>
      baseColumns.map((col) =>
        col.id === "actions"
          ? {
              ...col,
              cell: ({ row }: { row: { original: Habit; id: string } }) => (
                <Action
                  habitId={row.original.id}
                  onDelete={onDeleteHabit}
                  onEdit={() => handleEditClick(row.original)}
                />
              ),
            }
          : col
      ),
    [baseColumns, handleEditClick, onDeleteHabit]
  );

  // const columns = React.useMemo(() => baseColumns, [baseColumns]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <>
      {showAddHabit && (
        <AddHabit
          open={showAddHabit}
          onClose={() => {
            refetchHabits();
            setShowAddHabit(false);
          }}
        />
      )}
      {showEditHabit && editHabit && (
        <EditHabit
          open={showEditHabit}
          onClose={() => {
            refetchHabits();
            setShowEditHabit(false);
            setEditHabit(null);
          }}
          habit={editHabit}
        />
      )}

      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      <Tabs
        defaultValue="card-view"
        className="w-full flex-col justify-start gap-6 mt-6 sm:mt-8"
      >
        <div className="flex items-center justify-between">
          {/* Hide tabs on mobile, only show on desktop */}
          <TabsList className="hidden lg:flex **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
            <TabsTrigger value="card-view">
              <IconLayoutGrid />
              <span className="hidden xl:inline">Card view</span>
            </TabsTrigger>
            <TabsTrigger value="list-view">
              <IconLayoutList />
              <span className="hidden xl:inline">List view</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 ml-auto text-sm">
            {/* Hide column customization on mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden lg:flex">
                  <IconLayoutColumns />
                  <span className="hidden xl:inline">Customize Columns</span>
                  <span className="xl:hidden">Columns</span>
                  <IconChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-32 font-mono">
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== "undefined" &&
                      column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddHabit(true)}
              className="px-3 py-2"
            >
              <IconPlus />
              <span className="hidden sm:inline ml-2">Add Habit</span>
            </Button>
          </div>
        </div>
        {/* Only show list view on desktop */}
        <TabsContent
          value="list-view"
          className="relative flex-col gap-4 hidden lg:flex"
        >
          <div className="rounded-lg border overflow-hidden dark:bg-gray-900">
            <Table className="dark:bg-transparent">
              <TableHeader className=" ">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead className="py-2 px-4" key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    const isActive = (row.original as Habit).active;
                    return (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className={
                          !isActive
                            ? "bg-muted cursor-not-allowed opacity-30"
                            : ""
                        }
                        tabIndex={isActive ? 0 : -1}
                        aria-disabled={!isActive}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="py-4 px-4">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      There are no Habits!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        {/* Card view - mobile first, always visible */}
        <TabsContent value="card-view" className="relative block">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {data.map((habit) => {
              // Determine the left border color based on status
              const getStatusBorderClass = (status: string) => {
                switch (status.toLowerCase()) {
                  case "done":
                    return "border-l-green-700";
                  case "pending":
                    return "dark:border-l-zinc-200 border-l-zinc-700";
                  default:
                    return "dark:border-l-zinc-200 border-l-zinc-700";
                }
              };

              // Calculate progress percentage
              const progressPercentage = Math.round(
                (habit.progress / habit.target) * 100
              );
              const isCompleted = progressPercentage >= 100;

              return (
                <Card
                  key={habit.id}
                  className={`rounded-lg border-1 shadow-md border-l-12 ${getStatusBorderClass(habit.status)} p-3 sm:p-4 transition-transform hover:scale-[1.02] hover:border-1 hover:border-slate-700 hover:shadow-xl hover:shadow-zinc-800  hover:dark:shadow-lg hover:dark:shadow-muted-foreground ${
                    !habit.active
                      ? "bg-muted cursor-not-allowed opacity-30"
                      : ""
                  }`}
                  tabIndex={habit.active ? 0 : -1}
                  aria-disabled={!habit.active}
                >
                  <CardHeader className="pb-2 px-0 pt-0">
                    <div className="mb-2 flex items-center justify-between">
                      <StatusButton
                        id={habit.id}
                        initialStatus={habit.status.toUpperCase()}
                        refetchHabits={refetchHabits}
                        disabled={!habit.active}
                        onDone={handleDone}
                      />

                      <div className="flex items-center gap-1 sm:gap-2">
                        {/* Trophy icon for 100% completion */}
                        {isCompleted && (
                          <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                            <IconTrophy
                              size={16}
                              className="text-yellow-600 dark:text-yellow-400"
                              title="100% Complete!"
                            />
                          </div>
                        )}
                        <ToggleActive
                          habitId={habit.id}
                          currentState={habit.active}
                          refetchHabits={refetchHabits}
                        />
                        <Action
                          habitId={habit.id}
                          onEdit={() => handleEditClick(habit)}
                          onDelete={onDeleteHabit}
                        />
                      </div>
                    </div>
                    <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                      {habit.title}
                      {/* Alternative: Trophy next to title */}
                      {/* {isCompleted && (
                        <IconTrophy 
                          size={20} 
                          className="text-yellow-600 dark:text-yellow-400" 
                          title="100% Complete!"
                        />
                      )} */}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                      {habit.category}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="text-sm mb-4 px-0 pb-0">
                    <div className="mt-2">
                      <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-1">
                        <span className="flex items-center gap-1">
                          Progress
                          {/* {isCompleted && (
                            <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
                              ✨ Complete!
                            </span>
                          )} */}
                        </span>
                        <span
                          className={
                            isCompleted
                              ? "text-green-600 dark:text-green-400 font-bold"
                              : ""
                          }
                        >
                          {progressPercentage}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-purple-100 dark:bg-purple-900/30 rounded-full">
                        <div
                          className={`h-full transition-all duration-300 rounded-full ${
                            isCompleted
                              ? "bg-gradient-to-r from-green-400 to-green-700 to-60%"
                              : "bg-sky-600"
                          }`}
                          style={{
                            width: `${Math.min(100, progressPercentage)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Show empty state when no habits */}
          {data.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No habits yet!</p>
              <p className="text-muted-foreground text-sm mt-2">
                Create your first habit to get started.
              </p>
            </div>
          )}
        </TabsContent>{" "}
      </Tabs>
    </>
  );
}
