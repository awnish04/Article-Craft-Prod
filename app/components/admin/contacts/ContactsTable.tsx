"use client";

import * as React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconGripVertical,
  IconLayoutColumns,
} from "@tabler/icons-react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Contact } from "@/lib/db/schema";
import { toast } from "sonner";

const STATUS_COLORS: Record<string, string> = {
  unread: "bg-blue-100 text-blue-800 border-blue-200",
  read: "bg-gray-100 text-gray-700 border-gray-200",
  replied: "bg-green-100 text-green-800 border-green-200",
};

// ─── Drag Handle ─────────────────────────────────────────────────────────────

function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({ id });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent cursor-grab"
    >
      <IconGripVertical className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

// ─── View Dialog ─────────────────────────────────────────────────────────────

function ViewDialog({
  item,
  open,
  onClose,
}: {
  item: Contact | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl p-0 gap-0 duration-100">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>
            {item.subject ? (
              <>
                Subject:{" "}
                <span className="font-medium text-foreground">
                  {item.subject}
                </span>
              </>
            ) : (
              "Contact form submission"
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="no-scrollbar max-h-[60vh] overflow-y-auto px-6 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col gap-1">
              <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                Name
              </Label>
              <span className="font-medium">{item.name}</span>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                Email
              </Label>
              <a
                href={`mailto:${item.email}`}
                className="text-primary hover:underline"
              >
                {item.email}
              </a>
            </div>
            {item.phone && (
              <div className="flex flex-col gap-1">
                <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                  Phone
                </Label>
                <span>{item.phone}</span>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                Received On
              </Label>
              <span>
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                Status
              </Label>
              <span
                className={`inline-flex w-fit items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${STATUS_COLORS[item.status] ?? STATUS_COLORS.unread}`}
              >
                {item.status}
              </span>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-2 text-sm">
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">
              Message
            </Label>
            <p className="leading-relaxed whitespace-pre-wrap bg-secondary p-4 rounded-lg text-sm">
              {item.message}
            </p>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t border-border">
          <a
            href={`mailto:${item.email}?subject=Re: ${item.subject || "Your message"}`}
          >
            <Button variant="outline">Reply via Email</Button>
          </a>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Draggable Row ────────────────────────────────────────────────────────────

function DraggableRow({
  row,
  onView,
  onDelete,
}: {
  row: Row<Contact>;
  onView: (item: Contact) => void;
  onDelete: (item: Contact) => void;
}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      {row.getVisibleCells().map((cell) => {
        if (cell.column.id === "actions") {
          return (
            <TableCell key={cell.id} className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32 rounded-md">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => onView(row.original)}
                  >
                    <Eye className="size-4 mr-2" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={() => onDelete(row.original)}
                  >
                    <Trash2 className="size-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          );
        }
        return (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns: ColumnDef<Contact>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Sender",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-foreground text-sm">
          {row.original.name}
        </p>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.subject || <span className="italic">No subject</span>}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${STATUS_COLORS[row.original.status] ?? STATUS_COLORS.unread}`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Received On",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: () => null,
  },
];

// ─── Main Table ───────────────────────────────────────────────────────────────

export function ContactsTable({
  contacts: initialData,
}: {
  contacts: Contact[];
}) {
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [viewItem, setViewItem] = React.useState<Contact | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Contact[] | null>(
    null,
  );

  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    const ids = deleteTarget.map((c) => c.id).join(",");
    try {
      const res = await fetch(`/api/contact/${ids}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setData((prev) =>
        prev.filter((c) => !deleteTarget.find((d) => d.id === c.id)),
      );
      table.resetRowSelection();
      toast.success(
        deleteTarget.length > 1
          ? `${deleteTarget.length} messages deleted`
          : "Message deleted",
      );
    } catch {
      toast.error("Failed to delete. Please try again.");
    } finally {
      setDeleteTarget(null);
    }
  }

  return (
    <>
      <ViewDialog
        item={viewItem}
        open={!!viewItem}
        onClose={() => setViewItem(null)}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive">
              <Trash2 />
            </AlertDialogMedia>
            <AlertDialogTitle>
              Delete{" "}
              {deleteTarget && deleteTarget.length > 1
                ? `${deleteTarget.length} messages`
                : "message"}
              ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget?.length === 1 ? (
                <>
                  Message from{" "}
                  <strong>&quot;{deleteTarget[0].name}&quot;</strong> will be
                  permanently deleted.
                </>
              ) : (
                "Selected messages will be permanently deleted. This cannot be undone."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Contact Messages</h1>
          <span className="text-sm text-muted-foreground">
            {data.length} total
          </span>
        </div>

        <div className="rounded-lg border border-border bg-card">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 p-4 border-b border-border">
            <Input
              placeholder="Search by name or email..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(e) =>
                table.getColumn("name")?.setFilterValue(e.target.value)
              }
              className="max-w-sm h-9"
            />
            <div className="flex items-center gap-2">
              {selectedCount > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() =>
                    setDeleteTarget(selectedRows.map((r) => r.original))
                  }
                >
                  <Trash2 className="size-4 mr-1.5" />
                  Delete ({selectedCount})
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <IconLayoutColumns />
                    <span className="hidden lg:inline">Columns</span>
                    <IconChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {table
                    .getAllColumns()
                    .filter(
                      (col) =>
                        typeof col.accessorFn !== "undefined" &&
                        col.getCanHide(),
                    )
                    .map((col) => (
                      <DropdownMenuCheckboxItem
                        key={col.id}
                        className="capitalize"
                        checked={col.getIsVisible()}
                        onCheckedChange={(value) =>
                          col.toggleVisibility(!!value)
                        }
                      >
                        {col.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden">
            <DndContext
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDragEnd}
              sensors={sensors}
              id={sortableId}
            >
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-muted">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody className="**:data-[slot=table-cell]:first:w-8">
                  {table.getRowModel().rows?.length ? (
                    <SortableContext
                      items={dataIds}
                      strategy={verticalListSortingStrategy}
                    >
                      {table.getRowModel().rows.map((row) => (
                        <DraggableRow
                          key={row.id}
                          row={row}
                          onView={setViewItem}
                          onDelete={(item) => setDeleteTarget([item])}
                        />
                      ))}
                    </SortableContext>
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center text-muted-foreground"
                      >
                        No messages yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </DndContext>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
              {selectedCount} of {table.getFilteredRowModel().rows.length}{" "}
              row(s) selected.
            </div>
            <div className="flex w-full items-center gap-6 lg:w-fit">
              <div className="hidden items-center gap-2 lg:flex">
                <Label
                  htmlFor="rows-per-page-contacts"
                  className="text-sm font-medium"
                >
                  Rows per page
                </Label>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => table.setPageSize(Number(value))}
                >
                  <SelectTrigger className="w-20" id="rows-per-page-contacts">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-fit items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <div className="ml-auto flex items-center gap-2 lg:ml-0">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">First page</span>
                  <IconChevronsLeft />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Previous page</span>
                  <IconChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Next page</span>
                  <IconChevronRight />
                </Button>
                <Button
                  variant="outline"
                  className="hidden size-8 lg:flex"
                  size="icon"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Last page</span>
                  <IconChevronsRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
