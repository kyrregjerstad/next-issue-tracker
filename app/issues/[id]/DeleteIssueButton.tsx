import { Button } from "@radix-ui/themes";

interface Props {
  issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
  return (
    <Button color="red" className="w-full">
      Delete
    </Button>
  );
};

export default DeleteIssueButton;
