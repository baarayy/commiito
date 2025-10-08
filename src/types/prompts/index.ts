import { UserPrompt } from "..";


export const BuildPrompt = (prompt: UserPrompt) => {
  return `You are an AI assistant that organizes git changes into logical commits.

Given the following information:
- Domain: ${prompt.domain}
- Scope: ${prompt.scope}
- Commit Type: ${prompt.commitType}
- Subject: ${prompt.subject}
- Git Diff: ${prompt.diff}

Your task is to analyze the Git diff and generate a structured JSON response describing how the changes should be grouped into one or more commits.

Each commit must contain:
- "commitMessage": a conventional commit message following the format <commit Type>({domain/scope}): <subject>
- "rationale": a short explanation of why these changes belong together
- "affectedFiles": a list of file paths affected in this commit
- "changesSummary": a concise description (1–2 sentences) summarizing what was modified or added

Your output must be **valid JSON** following exactly the given object type:
json
{
  success: boolean,
  data: {
    response: [
        {
            domain?: string;
            scope?: string;
            commit_type?: CommitType;
            title: string;
            description: string;
            files_to_include: string[];
            commands?: string;
        }
    ]
  }
}`;
};
