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
  CardFooter,
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

import type { Habit } from "@/types/habit";
import StatusButton from "../Habit/StatusButton";

type DataTableProps = {
  columns: ColumnDef<Habit, unknown>[];
  data: Habit[];
  showAddHabit: boolean;
  setShowAddHabit: (show: boolean) => void;
  onAddHabit: (habit: Omit<Habit, "id">) => void;
};

export function DataTable({
  columns,
  data,
  showAddHabit,
  setShowAddHabit,
  onAddHabit,
}: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

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
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
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
                  ))
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
                className="rounded-xl shadow-md border p-4 transition-transform hover:scale-[1.02]"
              >
                <CardHeader className="pb-2">
                  <div className="mb-2 flex items-center">
                    <StatusButton
                      habitTitle={habit.title}
                      initialStatus={habit.status.toUpperCase()}
                    ></StatusButton>

                    <div className="ml-2 ml-auto">
                      <Action />
                    </div>
                  </div>
                  <CardTitle className="text-xl mt-2">{habit.title}</CardTitle>
                  <CardDescription className="text-gray-500 text-sm">
                    {habit.category}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-sm">
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>
                        {Math.round((habit.progress / habit.goal) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-purple-100">
                      <div
                        className="h-full bg-green-600 transition-all duration-300"
                        style={{
                          width: `${(habit.progress / habit.goal) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <p
                    className={`text-xs font-semibold ${habit.active ? "text-green-600" : "text-red-500"}`}
                  >
                    {habit.active ? "Active" : "Inactive"}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>{" "}
      </Tabs>
    </>
  );
}
