"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function JobSearchBar({ value, onChange }: Props) {
  return (
    <div className="p-4 border-b border-border">
      <ButtonGroup className="max-w-sm">
        <Input
          type="text"
          placeholder="Search by title or location..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
        <Button
          variant="outline"
          aria-label="Search"
          type="button"
          className="h-11 px-3 shrink-0"
        >
          <Search className="size-4" />
        </Button>
      </ButtonGroup>
    </div>
  );
}
