#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import { execSync } from "child_process";
import { sendPrompt } from "../utils/open-ai";
import { generateMarkdown } from "../utils/markdown";
import path from "path";
import fs from "fs";

const program = new Command();

program
  .name("Commiito")
  .description(
    "AI-powered tool to organize git changes into structured commits"
  )
  .version("1.0.0");

program
  .command("run")
  .description("Organize git changes into structured commits")
  .action(async () => {
    try {
      console.log("🚀 Welcome to Commiito CLI\n");

      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "domain",
          message: "Domain (e.g., health, sports):",
          default: "",
        },
        {
          type: "input",
          name: "scope",
          message: "Scope (e.g., api, ui):",
          default: "",
        },
        {
          type: "input",
          name: "commitType",
          message: "Commit Type (e.g., feat, fix, chore):",
          default: "",
        },
        {
          type: "input",
          name: "subject",
          message: "Subject (brief summary of changes):",
          default: "",
        },
      ]);

      console.log("🔍 Retrieving git diff...");
      const diff = execSync("git diff", { encoding: "utf-8" }).trim();

      if (!diff) {
        console.log("⚠️  No changes detected in git diff. Exiting.");
        process.exit(0);
      }

      const response = await sendPrompt({
        domain: answers.domain,
        scope: answers.scope,
        commitType: answers.commitType,
        subject: answers.subject,
        diff,
      });

      const aiResponse = JSON.parse(
        response.choices[0].message.content as string
      );

      if (!aiResponse.success) {
        console.log("⚠️  AI reported failure:", aiResponse);
        process.exit(1);
      }
      console.log("something...");
      const markdownContent = generateMarkdown(aiResponse);

      const outputPath = path.resolve(process.cwd(), "AI_COMMIT_PLAN.md");
      fs.writeFileSync(outputPath, markdownContent, "utf-8");

      console.log("\n✅ Commit plan generated successfully!");
      console.log(`📄 Saved to: ${outputPath}\n`);

      console.log("🚀 Commit message generated:", response);
    } catch (error) {
      console.error("❌ Error:", error);
      process.exit(1);
    }
  });

program.parseAsync(process.argv);
