"use client";

import { type Job } from "@/lib/db/schema";
import { useJobManager } from "@/hooks/useJobManager";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JobForm } from "./JobForm";
import { JobSearchBar } from "./JobSearchBar";
import { JobTableRow } from "./JobTableRow";
import { JobEmptyState } from "./JobEmptyState";
import { JobPagination } from "./JobPagination";

export function JobsTable({ jobs }: { jobs: Job[] }) {
  const {
    paginated,
    editingJob,
    formOpen,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    openCreate,
    openEdit,
    closeForm,
    handleJobSaved,
    handleDelete,
  } = useJobManager(jobs);

  return (
    <>
      <JobForm
        open={formOpen}
        onClose={closeForm}
        editing={editingJob}
        onSaved={handleJobSaved}
      />

      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Job Postings</h1>
          <Button
            onClick={openCreate}
            className="bg-primary hover:bg-primary/90 text-white gap-1.5 rounded-md"
          >
            <Plus className="size-4" />
            New Job
          </Button>
        </div>

        {/* Table card */}
        <div className="rounded-lg border border-border bg-card">
          <JobSearchBar value={searchTerm} onChange={setSearchTerm} />
          <Table>
            <TableHeader>
              <TableRow className="text-muted-foreground">
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <JobEmptyState searching={!!searchTerm} />
              ) : (
                paginated.map((job) => (
                  <JobTableRow
                    key={job.id}
                    job={job}
                    onEdit={() => openEdit(job)}
                    onDelete={() => handleDelete(job)}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <JobPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}
