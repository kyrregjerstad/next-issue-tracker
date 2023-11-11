import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card className="p-4">
      <Heading size="4">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id} className="hover:bg-slate-100 transition-colors ">
              <Table.Cell pl="0">
                <Flex justify="between">
                  <Link
                    href={`/issues/${issue.id}`}
                    className="flex w-full flex-col items-start gap-1"
                  >
                    <Text weight="medium" size="3">
                      {issue.title}
                    </Text>
                    <IssueStatusBadge status={issue.status} />
                  </Link>
                  {issue.assignedToUser && (
                    <Avatar src={issue.assignedToUser.image!} fallback="?" size="2" />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
