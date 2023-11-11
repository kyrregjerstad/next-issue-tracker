import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap={{ initial: "2", sm: "4" }}>
      {containers.map((container) => (
        <Link
          className="flex-1 flex"
          href={`/issues/list?status=${container.status}`}
          key={container.status}
        >
          <Card className="hover:bg-slate-200 transition-colors flex-1">
            <Flex direction="column" gap="1" className="items-center sm:items-start">
              <Text size={{ initial: "2", sm: "3" }} className="text-center">
                {container.label}
              </Text>
              <Text size={{ initial: "4", sm: "8" }} className="font-bold">
                {container.value}
              </Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default IssueSummary;
