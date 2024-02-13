import axios from "axios";

export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer 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`,
  },
});
