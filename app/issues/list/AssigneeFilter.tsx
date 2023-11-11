"use client";
import { User } from "@prisma/client";
import { Flex, Select, Text } from "@radix-ui/themes";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

import { Toaster } from "react-hot-toast";

const AssigneeFilter = () => {
  const { data: users, error, isLoading } = useUsers();

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (username: string) => {
    const params = new URLSearchParams();
    if (username) {
      if (username === "All") {
        params.delete("assignee");
      } else {
        params.append("assignee", username);
      }
    }
    if (searchParams.get("orderBy")) {
      params.append("orderBy", searchParams.get("orderBy")!);
    }
    if (searchParams.get("status")) {
      params.append("status", searchParams.get("status")!);
    }

    const query = params.size ? "?" + params.toString() : "";
    router.push(`/issues/list${query}`);
  };

  return (
    <>
      <Flex direction="column">
        <Text size="1" color="gray">
          Assignee
        </Text>
        <Select.Root
          onValueChange={handleValueChange}
          defaultValue={searchParams.get("assignee") || "All"}
        >
          <Select.Trigger placeholder="Assign..." style={{ minWidth: "6rem" }} />
          <Select.Content>
            <Select.Group>
              <Select.Label>Suggestions</Select.Label>
              <Select.Item value="All">All</Select.Item>
              <Select.Item value="Unassigned">Unassigned</Select.Item>
              {users?.map((user) => (
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
      <Toaster />
    </>
  );
};

export default AssigneeFilter;

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get<User[]>("/api/users");
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 3,
  });
