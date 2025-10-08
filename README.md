# Commiito CLI

Commiito is an AI-powered CLI that analyzes your local Git changes and produces a structured commit plan in Markdown. It helps you break down a set of changes into clear, conventional commits with suggested scopes, titles, descriptions, and files to include.

## What it is built on

- Node.js + TypeScript
- Commander — command-line interface and command parsing
- Inquirer — interactive prompts
- OpenAI Node SDK — AI reasoning over your `git diff`
- dotenv — environment variable loading

Project entry point: `src/cli/index.ts`

## What it serves (How it works)

1. Prompts you for some context: domain, scope, commit type, and subject.
2. Captures your current changes via `git diff`.
3. Sends the diff and context to OpenAI (model: `gpt-3.5-turbo`) and requests a structured JSON response.
4. Converts the AI response into a readable plan and saves it to `AI_COMMIT_PLAN.md` in your current working directory.

The generated plan includes:
- Proposed conventional commit messages (`type(scope): title`)
- Descriptions for each commit
- Files to include per commit
- Optional suggested commands

## Prerequisites

- Node.js 18+
- Git installed
- An OpenAI API key (`OPENAI_API_KEY`)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set your OpenAI API key (Windows PowerShell example):
   ```powershell
   setx OPENAI_API_KEY "your_openai_api_key"
   # Restart terminal after setting
   ```

   Or put it in a local `.env` file (loaded via `dotenv`):
   ```env
   OPENAI_API_KEY=your_openai_api_key
   ```

3. Ensure you are in a Git repository with changes. The CLI uses `git diff` to read current (unstaged) changes. If there are no changes, it will exit.

## Usage

Run the CLI using the provided scripts:

- Start once:
  ```bash
  npm run start
  ```

- Run with auto-reload during development:
  ```bash
  npm run dev
  ```

You will be prompted for:
- Domain (e.g., health, sports)
- Scope (e.g., api, ui)
- Commit Type (e.g., feat, fix, chore)
- Subject (brief summary of changes)

On success, you will see:
- A saved file `AI_COMMIT_PLAN.md` in your current working directory
- Console logs indicating success

Example output file snippet:
```markdown
# 🧠 AI Commit Plan

## 1. `feat(api): add user search endpoint`
**Domain:** health  
**Commit Type:** feat  
**Scope:** api  

### 📝 Description
Adds a new `/users/search` endpoint with filtering by status and name.

### 📂 Files to Include
- `src/routes/users.ts`
- `src/controllers/userController.ts`

### 💻 Suggested Commands
```bash
npm run test -w api
```
```

## Notes on Git diff

- The tool currently runs `git diff`, which shows unstaged changes.
- If you want staged-only or specific ranges, stage your changes or adjust your workflow before running.

## Troubleshooting

- Self-signed certificate / TLS error:
  - In corporate environments, you may see: `self-signed certificate in certificate chain`.
  - A temporary workaround has been added in `src/utils/open-ai.ts` to disable TLS verification. For a safer approach, install your organization’s Root CA and set:
    ```powershell
    setx NODE_EXTRA_CA_CERTS "C:\\path\\to\\corp_root_ca.pem"
    ```
    Restart your terminal/app after setting it.

- No changes detected:
  - If `git diff` is empty, the CLI will exit. Make sure you have local changes before running.

- Missing API key:
  - Ensure `OPENAI_API_KEY` is set in your environment or `.env` file.

## Development

- Source code lives under `src/`
- CLI entry: `src/cli/index.ts`
- OpenAI integration: `src/utils/open-ai.ts`
- Markdown rendering: `src/utils/markdown.ts`

Recommended workflow:
```bash
npm run dev
```

## Roadmap ideas

- Support staged-only diff or a selected range
- Add `--output <path>` flag and `--model <name>` flag
- Publish as a global npm binary with a `bin` entry (e.g., `commiito run`)
- Add tests for prompt shaping and output validation

## License

ISC
