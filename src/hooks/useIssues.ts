import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../api/githubApi";
import { Issue, State } from "./../issues/interfaces";
import { useEffect, useState } from "react";

type UseIssuesProps = {
  state: State | null;
  labels: string[];
  page?: number;
};

const getIssues = async ({
  state,
  labels,
  page,
}: UseIssuesProps): Promise<Issue[]> => {
  const params = new URLSearchParams();
  if (state) {
    params.append("state", state);
  }

  if (labels.length > 0) {
    params.append("labels", labels.join(","));
  }

  if (page) {
    params.append("page", page.toString());
  }

  const { data } = await githubApi.get<Issue[]>("/issues?per_page=5", {
    params,
  });
  return data;
};

export const useIssues = ({ state, labels }: UseIssuesProps) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [state, labels.toString()]);

  const query = useQuery({
    queryKey: ["issues", { state, labels, page }],
    queryFn: () => getIssues({ state, labels, page }),
  });

  const nextPage = () => {
    if (query.data?.length === 0) return;

    setPage((prev) => prev + 1);
  };

  const previousPage = () => {
    if (page === 1) return;

    setPage((prev) => prev - 1);
  };

  return { ...query, page, nextPage, previousPage };
};
