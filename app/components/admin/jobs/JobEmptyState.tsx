
import { TableCell, TableRow } from "@/components/ui/table";
import { SearchX } from "lucide-react";

export function JobEmptyState({ searching }: { searching: boolean }) {
  return (
    <TableRow>
      <TableCell colSpan={5} className="py-16 text-center">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <SearchX className="size-10 mb-2" strokeWidth={1.5} />
          <p className="text-sm font-semibold">
            {searching ? "No jobs match your search." : "No job postings yet."}
          </p>
          {!searching && (
            <p className="text-xs">
              Click &quot;New Job&quot; to create your first posting.
            </p>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
