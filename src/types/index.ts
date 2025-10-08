enum CommitType {
  FEAT,
  FIX,
  DOCS,
  STYLE,
  REFACTOR,
  TEST,
  CHORE,
  PERF,
  CI,
  BUILD,
  REVERT,
}

export interface UserPrompt {
  domain: string;
  scope: string;
  commitType: CommitType;
  subject:string;
  diff: string;
}

export interface IResponse {
  success: boolean;
  data: CommiitoResponse;
}

interface CommiitoResponse {
  response: GPTResponse[];
}

export interface GPTResponse {
  domain?: string;
  scope?: string;
  commitType?: CommitType;
  title: string;
  description: string;
  filesToInclude: string[];
  commands?: string;
}
