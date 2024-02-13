import { useInfiniteQuery } from "@tanstack/react-query";
import { Issue, State } from "../issues/interfaces";
import { githubApi } from "../api/githubApi";

type UseIssuesProps = {
  state: State | null;
  labels: string[];
  page?: number;
};

type QueryProps = {
  pageParam?: number;
  queryKey: (string | UseIssuesProps)[];
};

const getIssues = async ({
  pageParam,
  queryKey,
}: QueryProps): Promise<Issue[]> => {
  const [, , args] = queryKey;
  const { state, labels } = args as UseIssuesProps;
  const params = new URLSearchParams();
  if (state) {
    params.append("state", state);
  }

  if (labels.length > 0) {
    params.append("labels", labels.join(","));
  }

  if (pageParam) {
    params.append("page", pageParam.toString());
  }

  console.log(params);

  const { data } = await githubApi.get<Issue[]>("/issues?per_page=5", {
    params,
  });
  return data;
};

export const useIssuesInfinite = ({ state, labels, page }: UseIssuesProps) => {
  const query = useInfiniteQuery({
    queryKey: ["issues", { state, labels, page }],
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    queryFn: getIssues,
  });
  return {
    ...query,
  };
};
