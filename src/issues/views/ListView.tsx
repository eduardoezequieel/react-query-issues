import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../../hooks";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { State } from "../interfaces";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State | null>(null);
  const { data, isLoading, page, nextPage, previousPage, isFetching } =
    useIssues({
      state,
      labels: selectedLabels,
    });

  const onLabelChanged = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={data || []}
            state={state}
            onStateChange={(newState) => {
              setState(newState);
            }}
          />
        )}

        <div className="d-flex mt-2 justify-content-between align-items-center">
          <button
            className="btn btn-outline-primary"
            disabled={isFetching}
            onClick={previousPage}
          >
            Previous
          </button>
          <span>{page}</span>
          <button
            disabled={isFetching}
            className="btn btn-outline-primary"
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  );
};
