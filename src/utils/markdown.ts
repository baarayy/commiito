import { IResponse } from "../types";

export const generateMarkdown = (prompt: IResponse) => {
  const { success, data } = prompt;
  if (!success || !data?.response?.length) {
    return "# ❌ AI Commit Plan Failed\n\nNo valid commit data was returned.";
  }

  const commits = data.response;

  let md = `# 🧠 AI Commit Plan\n\n`;

  for (const [index, commit] of commits.entries()) {
    md += `## ${index + 1}. \`${commit.commitType || "commit"}(${
      commit.scope || "general"
    }): ${commit.title}\`\n\n`;
    md += `**Domain:** ${commit.domain || "N/A"}  \n`;
    md += `**Commit Type:** ${commit.commitType || "N/A"}  \n`;
    md += `**Scope:** ${commit.scope || "N/A"}  \n\n`;

    md += `### 📝 Description\n${
      commit.description || "_No description provided._"
    }\n\n`;

    md += `### 📂 Files to Include\n`;
    if (commit.filesToInclude?.length) {
      md += commit.filesToInclude.map((f) => `- \`${f}\``).join("\n") + "\n\n";
    } else {
      md += "_None listed_\n\n";
    }

    if (commit.commands) {
      md += `### 💻 Suggested Commands\n\`\`\`bash\n${commit.commands}\n\`\`\`\n\n`;
    }

    md += "---\n\n";
  }

  md += "✅ *Generated automatically by AI Commit Organizer*\n";

  return md;
};
