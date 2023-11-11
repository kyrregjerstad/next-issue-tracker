import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueActions from "../list/IssueActions";
import IssueTable, { IssueQuery, columnNames } from "../list/IssueTable";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

interface Props {
  searchParams: IssueQuery;
}

const AssignedPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const where = { status };

  const session = await getServerSession();

  console.log(session?.user.);

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount} />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default AssignedPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};
