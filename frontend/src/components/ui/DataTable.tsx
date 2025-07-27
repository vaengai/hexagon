"use client";

import * as React from "react";

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

type DataTableProps = {
  columns: ColumnDef<Habit, unknown>[];
  data: Habit[];
  showAddHabit: boolean;
  setShowAddHabit: (show: boolean) => void;
  onAddHabit: (habit: Omit<Habit, "id">) => void;
  onDeleteHabit: (id: string) => void;
  refetchHabits: () => void;
  showEditHabit: boolean;
  setShowEditHabit: (show: boolean) => void;
  onEditHabit: (habit: Habit) => void;
};

export function DataTable({
  columns: baseColumns,
  data,
  showAddHabit,
  setShowAddHabit,
  onAddHabit,
  onDeleteHabit,
  refetchHabits,
  showEditHabit,
  setShowEditHabit,
  onEditHabit,
}: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [editHabit, setEditHabit] = React.useState<Habit | null>(null);

  const handleEditClick = (habit: Habit) => {
    setEditHabit(habit);
    setShowEditHabit(true);
  };

  const handleEditSubmit = async (updatedHabit: Habit) => {
    await onEditHabit(updatedHabit);
    setShowEditHabit(false);
    setEditHabit(null);
  };

  // DataTable.tsx
  const columns = React.useMemo(
    () =>
      baseColumns.map((col) =>
        col.id === "actions"
          ? {
              ...col,
              cell: ({ row }) => (
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
          onClose={() => setShowAddHabit(false)}
          onSubmit={onAddHabit}
        />
      )}
      {showEditHabit && editHabit && (
        <EditHabit
          open={showEditHabit}
          onClose={() => {
            setShowEditHabit(false);
            setEditHabit(null);
          }}
          habit={editHabit}
          onSubmit={handleEditSubmit}
        />
      )}
      <Tabs
        defaultValue="list-view"
        className="w-full flex-col justify-start gap-6"
      >
        <div className="flex items-center justify-between">
          <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
            <TabsTrigger value="card-view">
              <IconLayoutGrid />
              <span className="hidden lg:inline">Card view</span>
            </TabsTrigger>
            <TabsTrigger value="list-view">
              <IconLayoutList />
              <span className="hidden lg:inline">List view</span>
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <IconLayoutColumns />
                  <span className="hidden lg:inline">Customize Columns</span>
                  <span className="lg:hidden">Columns</span>
                  <IconChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-32">
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
            >
              <IconPlus />
              <span className="hidden lg:inline">Add Habit</span>
            </Button>
          </div>
        </div>
        <TabsContent value="list-view" className="relative flex flex-col gap-4">
          <div className=" rounded-lg border ">
            <Table className="text-md">
              <TableHeader className="bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
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
                    // Assume "active" is a property on the original data object
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
        <TabsContent value="card-view" className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((habit) => (
              <Card
                key={habit.id}
                className={`rounded-xl shadow-md border p-4 transition-transform hover:scale-[1.02] ${
                  !habit.active ? "bg-muted cursor-not-allowed opacity-30" : ""
                }`}
                tabIndex={habit.active ? 0 : -1}
                aria-disabled={!habit.active}
              >
                <CardHeader className="pb-2">
                  <div className="mb-2 flex items-center">
                    <StatusButton
                      id={habit.id}
                      initialStatus={habit.status.toUpperCase()}
                      refetchHabits={refetchHabits}
                      disabled={habit.active}
                    />

                    <div className="ml-auto flex items-center gap-2">
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
                  <CardTitle className="text-xl mt-2">{habit.title}</CardTitle>
                  <CardDescription className="text-gray-500 text-sm">
                    {habit.category}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-sm mb-4">
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>
                        {Math.round((habit.progress / habit.target) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-purple-100">
                      <div
                        className="h-full bg-green-600 transition-all duration-300"
                        style={{
                          width: `${Math.min(100, Math.round((habit.progress / habit.target) * 100))}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>{" "}
      </Tabs>
    </>
  );
}
