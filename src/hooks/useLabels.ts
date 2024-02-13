import { useQuery } from "@tanstack/react-query";
import { Label } from "../issues/interfaces/Label";
import { githubApi } from "../api/githubApi";

export const useLabels = () => {
  const getLabels = async (): Promise<Label[]> => {
    const { data } = await githubApi.get<Label[]>("/labels?per_page=200");
    return data;
  };

  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    // staleTime: 1000 * 60 * 60,
  });

  return { ...labelsQuery };
};
