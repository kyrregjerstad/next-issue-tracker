"use client";
import { Status } from "@prisma/client";
import { Flex, Select, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (status: Status) => {
    const params = new URLSearchParams();
    if (status) {
      params.append("status", status);
    }
    if (searchParams.get("orderBy")) {
      params.append("orderBy", searchParams.get("orderBy")!);
    }
    if (searchParams.get("assignee")) {
      params.append("assignee", searchParams.get("assignee")!);
    }

    const query = params.size ? "?" + params.toString() : "";
    router.push(`/issues/list${query}`);
  };

  return (
    <>
      <Flex direction="column">
        <Text size="1" color="gray">
          Status
        </Text>
        <Select.Root
          onValueChange={handleValueChange}
          defaultValue={searchParams.get("status") || "All"}
        >
          <Select.Trigger
            style={{
              minWidth: "6rem",
            }}
          />
          <Select.Content>
            {statuses.map((status) => (
              <Select.Item key={status.label} value={status.value || "All"}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
    </>
  );
};

export default IssueStatusFilter;
