"use client";

import { useState, useMemo } from "react";
import { type Job } from "@/lib/db/schema";
import { deleteJob } from "@/lib/actions/jobs";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

export function useJobManager(initialJobs: Job[]) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(
    () =>
      jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          j.location.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [jobs, searchTerm],
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const openCreate = () => {
    setEditingJob(null);
    setFormOpen(true);
  };

  const openEdit = (job: Job) => {
    setEditingJob(job);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingJob(null);
  };

  const handleJobSaved = (savedJob: Job) => {
    setJobs((prev) => {
      const exists = prev.find((j) => j.id === savedJob.id);
      return exists
        ? prev.map((j) => (j.id === savedJob.id ? savedJob : j))
        : [savedJob, ...prev];
    });
    closeForm();
  };

  const handleDelete = async (job: Job) => {
    if (!confirm(`Delete "${job.title}"? This cannot be undone.`)) return;
    try {
      await deleteJob(job.id);
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
      toast.success("Job deleted.");
    } catch {
      toast.error("Failed to delete job.");
    }
  };

  return {
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
  };
}
