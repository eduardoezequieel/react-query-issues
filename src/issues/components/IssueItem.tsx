import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { Issue, State } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getIssue, getIssueComments } from "../../hooks/useIssue";
import { timeSince } from "../../helpers/timeSince";

export const IssueItem = ({
  title,
  user,
  state,
  number,
  comments,
  labels,
  created_at,
}: Issue) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleOnMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ["issue", number],
      queryFn: () => getIssue(number),
    });

    queryClient.prefetchQuery({
      queryKey: ["issueComments", number],
      queryFn: () => getIssueComments(number),
    });
  };

  return (
    <div
      className="card mb-2 issue"
      onMouseEnter={handleOnMouseEnter}
      onClick={() => {
        navigate(`/issues/issue/${number}`);
      }}
    >
      <div className="card-body d-flex align-items-center">
        {state === State.Open ? (
          <FiInfo size={30} color="red" />
        ) : (
          <FiCheckCircle size={30} color="green" />
        )}

        <div className="d-flex flex-column flex-fill px-2">
          <span>{title}</span>
          <span className="issue-subinfo">
            #{number} opened {timeSince(created_at)} ago by{" "}
            <span className="fw-bold">{user?.login || "username"}</span>
          </span>
          <div>
            {labels.map((label) => (
              <span
                key={label.id}
                className="badge rounded-pill m-1"
                style={{ backgroundColor: `#${label.color}`, color: "black" }}
              >
                {label.name}
              </span>
            ))}
          </div>
        </div>

        <div className="d-flex align-items-center">
          <img
            src={
              user?.avatar_url ||
              "https://avatars.githubusercontent.com/u/1933404?v=4"
            }
            alt="User Avatar"
            className="avatar"
          />
          <span className="px-2">{comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
