"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const deleteIssue = async () => {
    try {
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" className="w-full">
            Delete
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This will permanently delete this issue?
          </AlertDialog.Description>
          <Flex gap="3" pt="4">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteIssue}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            There was an error deleting this issue.
          </AlertDialog.Description>
          <Flex gap="3" pt="4">
            <AlertDialog.Action>
              <Button
                color="gray"
                variant="soft"
                onClick={() => {
                  setError(false);
                }}
              >
                Close
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
