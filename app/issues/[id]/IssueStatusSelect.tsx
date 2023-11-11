"use client";
import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const IssueStatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  const changeStatus = async (status: Status) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        status,
      });
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const statuses: { label: string; value: Status }[] = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={changeStatus}>
        <Select.Trigger className="w-32" variant="ghost" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            {statuses.map((status) => (
              <Select.Item key={status.label} value={status.value}>
                <IssueStatusBadge status={status.value} />
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default IssueStatusSelect;
