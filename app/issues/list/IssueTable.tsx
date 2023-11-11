import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status, User } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Avatar, Flex, Table, Text } from "@radix-ui/themes";
import NextLink from "next/link";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  assignee: string;
}

interface IssueWithUser extends Issue {
  assignedToUser?: User | null;
}

interface Props {
  searchParams: IssueQuery;
  issues: IssueWithUser[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell key={column.value} className={column.className}>
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toLocaleDateString()}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <UserPreview assignedToUser={issue.assignedToUser} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

interface UserPreviewProps {
  assignedToUser?: User | null;
}

const UserPreview = ({ assignedToUser }: UserPreviewProps) => {
  if (!assignedToUser)
    return (
      <Flex align="center" gap="2">
        <Text size="2">Unassigned</Text>
      </Flex>
    );

  return (
    <Flex align="center" gap="2">
      <Avatar src={assignedToUser.image!} fallback="?" size="1" />
      <Text size="2">{assignedToUser.name}</Text>
    </Flex>
  );
};

export default IssueTable;

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  { label: "Assignee", value: "assignedToUserId", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);
