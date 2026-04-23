import { Briefcase, ClipboardList, MessageSquare, Clock } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionCardsProps {
  totalJobs: number;
  recentJobs: number;
  totalApplications: number;
  pendingApplications: number;
  totalMessages: number;
  unreadMessages: number;
  recentApplications: number;
}

export function SectionCards({
  totalJobs,
  recentJobs,
  totalApplications,
  pendingApplications,
  totalMessages,
  unreadMessages,
  recentApplications,
}: SectionCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <Briefcase className="size-4" /> Job Postings
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalJobs}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {recentJobs} added this month
          </div>
          <div className="text-muted-foreground">Total active job listings</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <ClipboardList className="size-4" /> Applications
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalApplications}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {recentApplications} received this month
          </div>
          <div className="text-muted-foreground">Total job applications</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <Clock className="size-4" /> Pending Review
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {pendingApplications}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {totalApplications - pendingApplications} reviewed
          </div>
          <div className="text-muted-foreground">
            Applications awaiting review
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <MessageSquare className="size-4" /> Messages
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalMessages}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {unreadMessages} unread
          </div>
          <div className="text-muted-foreground">Contact form submissions</div>
        </CardFooter>
      </Card>
    </div>
  );
}
