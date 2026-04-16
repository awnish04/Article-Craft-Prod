"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CURRENCIES = [
  { value: "$", label: "USD" },
  { value: "€", label: "EUR" },
  { value: "£", label: "GBP" },
  { value: "₹", label: "INR" },
  { value: "रु", label: "NPR" },
];

export type JobFormData = {
  title: string;
  location: string;
  type: string;
  salary: string;
  deadline: string;
  industry: string;
  jobFunction: string;
  experience: string;
  description: string;
  roleSummary: string;
  responsibilities: string;
  requiredSkills: string;
  goodToHave: string;
  lookingFor: string;
};

export const emptyJobForm: JobFormData = {
  title: "",
  location: "",
  type: "Full Time",
  salary: "",
  deadline: "",
  industry: "",
  jobFunction: "",
  experience: "",
  description: "",
  roleSummary: "",
  responsibilities: "",
  requiredSkills: "",
  goodToHave: "",
  lookingFor: "",
};

function Field({
  label,
  optional,
  hint,
  children,
}: {
  label: string;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium">
        {label}
        {optional && (
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            (optional)
          </span>
        )}
        {hint && (
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            — {hint}
          </span>
        )}
      </Label>
      {children}
    </div>
  );
}

interface Props {
  form: JobFormData;
  onChange: (field: keyof JobFormData, value: string) => void;
}

const textareaCls =
  "bg-transparent border-border rounded-md focus-visible:ring-primary resize-none";

export function JobFormFields({ form, onChange }: Props) {
  // Salary: keep currency, min, max as independent local state
  // Never re-derive from form.salary to avoid feedback loops
  const [currency, setCurrency] = React.useState("$");
  const [minVal, setMinVal] = React.useState("");
  const [maxVal, setMaxVal] = React.useState("");

  // Only sync inward when the form is externally reset (empty) or first loaded with data
  const initialised = React.useRef(false);
  React.useEffect(() => {
    if (initialised.current && form.salary !== "") return;
    initialised.current = true;

    if (!form.salary) {
      setMinVal("");
      setMaxVal("");
      return;
    }

    // Detect which currency symbol the stored value starts with
    const sym =
      CURRENCIES.map((c) => c.value).find((s) => form.salary.startsWith(s)) ??
      "$";
    setCurrency(sym);

    // Remove the symbol and split on " - "
    const withoutSym = form.salary.split(sym).join("").trim();
    const parts = withoutSym.split(" - ").map((s) => s.trim());
    setMinVal(parts[0] ?? "");
    setMaxVal(parts[1] ?? "");
  }, [form.salary]);

  const build = (sym: string, min: string, max: string) => {
    if (!min && !max) return "";
    if (min && max) return `${sym} ${min} - ${sym} ${max}`;
    return `${sym} ${min || max}`;
  };

  const handleCurrency = (sym: string) => {
    setCurrency(sym);
    onChange("salary", build(sym, minVal, maxVal));
  };
  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinVal(e.target.value);
    onChange("salary", build(currency, e.target.value, maxVal));
  };
  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxVal(e.target.value);
    onChange("salary", build(currency, minVal, e.target.value));
  };

  const inp =
    (field: keyof JobFormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      onChange(field, e.target.value);

  return (
    <div className="space-y-4">
      {/* Title + Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Job Title">
          <Input
            placeholder="e.g. Frontend Developer"
            value={form.title}
            onChange={inp("title")}
            required
          />
        </Field>
        <Field label="Location">
          <Input
            placeholder="e.g. Remote, New York"
            value={form.location}
            onChange={inp("location")}
            required
          />
        </Field>
      </div>

      {/* Employment Type + Salary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Employment Type">
          <Select value={form.type} onValueChange={(v) => onChange("type", v)}>
            <SelectTrigger className="h-11 rounded-md border-border bg-transparent w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[
                "Full Time",
                "Part Time",
                "Contract",
                "Internship",
                "Freelance",
              ].map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Salary Range" optional>
          <div className="flex items-center gap-2">
            <Select value={currency} onValueChange={handleCurrency}>
              <SelectTrigger className="w-16 h-11 shrink-0 font-medium">
                {currency}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.value} <span>{c.label}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input placeholder="Min" value={minVal} onChange={handleMin} />
            <span>—</span>
            <Input placeholder="Max" value={maxVal} onChange={handleMax} />
          </div>
        </Field>
      </div>

      {/* Deadline + Industry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Application Deadline" optional>
          <Input
            placeholder="e.g. December 31, 2026"
            value={form.deadline}
            onChange={inp("deadline")}
          />
        </Field>
        <Field label="Industry" optional>
          <Input
            placeholder="e.g. Software Development"
            value={form.industry}
            onChange={inp("industry")}
          />
        </Field>
      </div>

      {/* Job Function */}
      <Field label="Job Function" optional>
        <Input
          placeholder="e.g. Engineering"
          value={form.jobFunction}
          onChange={inp("jobFunction")}
        />
      </Field>

      {/* Qualifications */}
      <Field label="Qualifications" optional hint="one per line">
        <Textarea
          className={textareaCls}
          rows={3}
          placeholder={
            "5+ years of backend experience\nBachelor's in Computer Science"
          }
          value={form.experience}
          onChange={inp("experience")}
        />
      </Field>

      {/* Job Description */}
      <Field label="Job Description">
        <Textarea
          className={textareaCls}
          rows={3}
          placeholder="Brief overview of the role..."
          value={form.description}
          onChange={inp("description")}
        />
      </Field>

      {/* Role Summary */}
      <Field label="Role Summary" optional>
        <Textarea
          className={textareaCls}
          rows={2}
          placeholder="What the candidate will do day-to-day..."
          value={form.roleSummary}
          onChange={inp("roleSummary")}
        />
      </Field>

      {/* Responsibilities */}
      <Field label="Responsibilities" optional hint="one per line">
        <Textarea
          className={textareaCls}
          rows={4}
          placeholder={
            "Design scalable systems\nWrite clean code\nMentor junior devs"
          }
          value={form.responsibilities}
          onChange={inp("responsibilities")}
        />
      </Field>

      {/* Required Skills */}
      <Field label="Required Skills" optional hint="one per line">
        <Textarea
          className={textareaCls}
          rows={4}
          placeholder={"Node.js or Python\nRESTful APIs\nPostgreSQL"}
          value={form.requiredSkills}
          onChange={inp("requiredSkills")}
        />
      </Field>

      {/* Good to Have */}
      <Field label="Good to Have" optional hint="one per line">
        <Textarea
          className={textareaCls}
          rows={3}
          placeholder={"GraphQL\nDocker\nCI/CD pipelines"}
          value={form.goodToHave}
          onChange={inp("goodToHave")}
        />
      </Field>

      {/* What We're Looking For */}
      <Field label="What We're Looking For" optional hint="one per line">
        <Textarea
          className={textareaCls}
          rows={3}
          placeholder={"Team player\nSelf-motivated\nAttention to detail"}
          value={form.lookingFor}
          onChange={inp("lookingFor")}
        />
      </Field>
    </div>
  );
}
