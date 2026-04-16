import { type Job } from "@/lib/db/schema";
import { TableCell, TableRow } from "@/components/ui/table";
import { JobActionsDropdown } from "./JobActionsDropdown";

interface Props {
  job: Job;
  onEdit: () => void;
  onDelete: () => void;
}

export function JobTableRow({ job, onEdit, onDelete }: Props) {

  return (
    <TableRow>
      <TableCell className="font-medium text-foreground">{job.title}</TableCell>
      <TableCell className="text-muted-foreground">{job.location}</TableCell>
      <TableCell>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md border border-border text-xs text-foreground">
          {job.type}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <JobActionsDropdown job={job} onEdit={onEdit} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
}
