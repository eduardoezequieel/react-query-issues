import { useQuery } from "@tanstack/react-query";
import { Issue } from "../issues/interfaces";
import { githubApi } from "../api/githubApi";

export const getIssue = async (id: number): Promise<Issue> => {
  const { data } = await githubApi.get<Issue>(`/issues/${id}`);
  return data;
};

export const getIssueComments = async (id: number): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>(`/issues/${id}/comments`);
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ["issue", issueNumber],
    queryFn: () => getIssue(issueNumber),
  });

  const commentsQuery = useQuery({
    queryKey: ["issueComments", issueNumber],
    queryFn: () => getIssueComments(issueNumber),
  });

  return { issueQuery, commentsQuery };
};
