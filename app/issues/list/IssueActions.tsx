import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import AssigneeFilter from "./AssigneeFilter";

const IssueActions = () => {
  return (
    <Flex justify="between">
      <Flex gap="4">
        <IssueStatusFilter />
        <AssigneeFilter />
      </Flex>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
