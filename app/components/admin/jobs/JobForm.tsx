"use client";

import { useEffect, useState, useTransition } from "react";
import { type Job } from "@/lib/db/schema";
import { createJob, updateJob } from "@/lib/actions/jobs";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { JobFormFields, type JobFormData, emptyJobForm } from "./JobFormFields";

interface Props {
  open: boolean;
  onClose: () => void;
  editing?: Job | null;
  onSaved: (job: Job) => void;
}

export function JobForm({ open, onClose, editing, onSaved }: Props) {
  const [form, setForm] = useState<JobFormData>(emptyJobForm);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setForm(
      editing
        ? {
            title: editing.title ?? "",
            location: editing.location ?? "",
            type: editing.type ?? "Full Time",
            salary: editing.salary ?? "",
            deadline: editing.deadline ?? "",
            industry: editing.industry ?? "",
            jobFunction: editing.jobFunction ?? "",
            experience: editing.experience ?? "",
            description: editing.description ?? "",
            roleSummary: editing.roleSummary ?? "",
            responsibilities: editing.responsibilities ?? "",
            requiredSkills: editing.requiredSkills ?? "",
            goodToHave: editing.goodToHave ?? "",
            lookingFor: editing.lookingFor ?? "",
          }
        : emptyJobForm,
    );
  }, [editing, open]);

  const handleChange = (field: keyof JobFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.location) {
      toast.error("Title and location are required.");
      return;
    }
    startTransition(async () => {
      try {
        if (editing) {
          const updated = await updateJob(editing.id, form);
          toast.success("Job updated.");
          onSaved(updated);
        } else {
          const created = await createJob(form);
          toast.success("Job created.");
          onSaved(created);
        }
      } catch {
        toast.error("Something went wrong.");
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <DialogContent className="sm:max-w-2xl p-0 gap-0">
        <form onSubmit={handleSubmit}>
          {/* Sticky Header */}
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
            <DialogTitle>{editing ? "Edit Job" : "Create New Job"}</DialogTitle>
            <DialogDescription>
              {editing
                ? "Update the job posting details below."
                : "Fill in the details to post a new job opening."}
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable Content */}
          <div className="no-scrollbar max-h-[60vh] overflow-y-auto px-6 py-4">
            <JobFormFields form={form} onChange={handleChange} />
          </div>

          {/* Sticky Footer */}
          <DialogFooter className="px-6 py-4 border-t border-border">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary hover:bg-primary/90 text-white gap-1.5 rounded-md"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editing ? "Saving..." : "Creating..."}
                </>
              ) : editing ? (
                "Save Changes"
              ) : (
                "Create Job"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
