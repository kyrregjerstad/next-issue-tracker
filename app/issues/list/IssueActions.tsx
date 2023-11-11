import { Flex } from "@radix-ui/themes";
import AssigneeFilter from "./AssigneeFilter";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <Flex justify="between">
      <Flex gap="4">
        <IssueStatusFilter />
        <AssigneeFilter />
      </Flex>
    </Flex>
  );
};

export default IssueActions;
