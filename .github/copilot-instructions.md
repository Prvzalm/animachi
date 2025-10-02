# AniMachi - Anime Community Hub

This is the codebase for AniMachi, a full-stack web application built with Next.js 14, TypeScript, TailwindCSS, shadcn/ui, and Supabase for the database. It features authentication with NextAuth.js, media uploads, and community features like posts, comments, and likes.

## Project Structure

- `app/`: Next.js app router pages and API routes
- `components/`: Reusable UI components
- `lib/`: Utility functions and configurations
- `types/`: TypeScript type definitions
- `prisma/`: Database schema (though we're using Supabase)
- `supabase/`: Supabase configurations and migrations

## Key Features

- Home page with trending anime content
- Community page for posts, discussions, and uploads
- User authentication and profiles
- Watchlist management
- Search and filtering

## Development Guidelines

- Use Supabase for all database operations
- Implement type-safe APIs with Zod validation
- Follow Next.js best practices for App Router
- Use shadcn/ui components for consistent UI
- Ensure proper error handling and loading states

## Execution Guidelines

### PROGRESS TRACKING:

- Use the todo list tool to track progress through tasks.
- Mark tasks as completed after finishing each step.
- Read current todo list status before starting each new step.

### COMMUNICATION RULES:

- Avoid verbose explanations or printing full command outputs.
- If a step is skipped, state that briefly (e.g. "No extensions needed").
- Do not explain project structure unless asked.
- Keep explanations concise and focused.

### DEVELOPMENT RULES:

- Use Supabase for database operations instead of Prisma.
- Install any missing dependencies as needed.
- Run diagnostics and resolve any issues.
- Avoid adding media or external links unless explicitly requested.
- Use placeholders only with a note that they should be replaced.
- Use VS Code API tool only for VS Code extension projects.
- Once the project is created, it is already opened in Visual Studio Code—do not suggest commands to open this project in vscode again.
- If the project setup information has additional rules, follow them strictly.

### FOLDER CREATION RULES:

- Always use the current directory as the project root.
- If you are running any terminal commands, use '.' as the working directory.
- Do not create a new folder unless the user explicitly requests it besides a .vscode folder for a tasks.json file.
- If any of the scaffolding commands mention that the folder name is not correct, let the user know to create a new folder with the correct name and then reopen it again in vscode.

### EXTENSION INSTALLATION RULES:

- Only install extensions specified by the get_project_setup_info tool. DO NOT INSTALL any other extensions.

### PROJECT CONTENT RULES:

- Avoid adding links of any type (URLs, files, folders, etc.) or integrations that are not explicitly required.
- Avoid generating images, videos, or any other media files unless explicitly requested.
- If you need to use any media assets as placeholders, let the user know that these are placeholders and should be replaced with the actual assets later.
- Ensure all generated components serve a clear purpose within the user's requested workflow.
- If a feature is assumed but not confirmed, prompt the user for clarification before including it.

### TASK COMPLETION RULES:

- Your task is complete when:

  - Project is successfully scaffolded and compiled without errors
  - copilot-instructions.md file in the .github directory exists and contains current project information
  - README.md file exists and is up to date
  - User is provided with clear instructions to debug/launch the project

- Work through each checklist item systematically.
- Keep communication concise and focused.
- Follow development best practices.

- [x] Ensure Documentation is Complete

- [x] Customize the Project

## Execution Guidelines<!--

Verify that all previous steps have been completed successfully and you have marked the step as completed.

PROGRESS TRACKING:Develop a plan to modify codebase according to user requirements.

- If any tools are available to manage the above todo list, use it to track progress through this checklist.Apply modifications using appropriate tools and user-provided references.

- After completing each step, mark it complete and add a summary.Skip this step for "Hello World" projects.

- Read current todo list status before starting each new step.-->

COMMUNICATION RULES:- [x] Install Required Extensions

- Avoid verbose explanations or printing full command outputs.<!-- ONLY install extensions provided mentioned in the get_project_setup_info. Skip this step otherwise and mark as completed. -->

- If a step is skipped, state that briefly (e.g. "No extensions needed").

- Do not explain project structure unless asked.- [x] Compile the Project

- Keep explanations concise and focused.<!--

Verify that all previous steps have been completed.

DEVELOPMENT RULES:Install any missing dependencies.

- Use '.' as the working directory unless user specifies otherwise.Run diagnostics and resolve any issues.

- Avoid adding media or external links unless explicitly requested.Check for markdown files in project folder for relevant instructions on how to do this.

- Use placeholders only with a note that they should be replaced.-->

- Use VS Code API tool only for VS Code extension projects.

- Once the project is created, it is already opened in Visual Studio Code—do not suggest commands to open this project in vscode again.- [x] Create and Run Task

- If the project setup information has additional rules, follow them strictly.<!--

Verify that all previous steps have been completed.

FOLDER CREATION RULES:Check https://code.visualstudio.com/docs/debugtest/tasks to determine if the project needs a task. If so, use the create_and_run_task to create and launch a task based on package.json, README.md, and project structure.

- Always use the current directory as the project root.Skip this step otherwise.

- If you are running any terminal commands, use the '.' argument to ensure that the current working directory is used ALWAYS. -->

- Do not create a new folder unless the user explicitly requests it besides a .vscode folder for a tasks.json file.

- If any of the scaffolding commands mention that the folder name is not correct, let the user know to create a new folder with the correct name and then reopen it again in vscode.- [x] Launch the Project

<!--

EXTENSION INSTALLATION RULES: Verify that all previous steps have been completed.

- Only install extension specified by the get_project_setup_info tool. DO NOT INSTALL any other extensions. Prompt user for debug mode, launch only if confirmed.

  -->- [ ] Ensure Documentation is Complete

PROJECT CONTENT RULES:<!--

- If the user has not specified project details, assume they want a "Hello World" project as a starting point.Verify that all previous steps have been completed.

- Avoid adding links of any type (URLs, files, folders, etc.) or integrations that are not explicitly required.Verify that README.md and the copilot-instructions.md file in the .github directory exists and contains current project information.

- Avoid generating images, videos, or any other media files unless explicitly requested.Clean up the copilot-instructions.md file in the .github directory by removing all HTML comments.

- If you need to use any media assets as placeholders, let the user know that these are placeholders and should be replaced with the actual assets later. -->

- Ensure all generated components serve a clear purpose within the user's requested workflow.

- If a feature is assumed but not confirmed, prompt the user for clarification before including it.<!--

- If you are working on a VS Code extension, use the VS Code API tool with a query to find relevant VS Code API references and samples related to that query.## Execution Guidelines

PROGRESS TRACKING:

TASK COMPLETION RULES:- If any tools are available to manage the above todo list, use it to track progress through this checklist.

- Your task is complete when:- After completing each step, mark it complete and add a summary.

  - Project is successfully scaffolded and compiled without errors- Read current todo list status before starting each new step.

  - copilot-instructions.md file in the .github directory exists in the project

  - README.md file exists and is up to dateCOMMUNICATION RULES:

  - User is provided with clear instructions to debug/launch the project- Avoid verbose explanations or printing full command outputs.

- If a step is skipped, state that briefly (e.g. "No extensions needed").

Before starting a new task in the above plan, update progress in the plan.- Do not explain project structure unless asked.

- Keep explanations concise and focused.

- Work through each checklist item systematically.

- Keep communication concise and focused.DEVELOPMENT RULES:

- Follow development best practices.- Use '.' as the working directory unless user specifies otherwise.
- Avoid adding media or external links unless explicitly requested.
- Use placeholders only with a note that they should be replaced.
- Use VS Code API tool only for VS Code extension projects.
- Once the project is created, it is already opened in Visual Studio Code—do not suggest commands to open this project in vscode again.
- If the project setup information has additional rules, follow them strictly.

FOLDER CREATION RULES:

- Always use the current directory as the project root.
- If you are running any terminal commands, use the '.' argument to ensure that the current working directory is used ALWAYS.
- Do not create a new folder unless the user explicitly requests it besides a .vscode folder for a tasks.json file.
- If any of the scaffolding commands mention that the folder name is not correct, let the user know to create a new folder with the correct name and then reopen it again in vscode.

EXTENSION INSTALLATION RULES:

- Only install extension specified by the get_project_setup_info tool. DO NOT INSTALL any other extensions.

PROJECT CONTENT RULES:

- If the user has not specified project details, assume they want a "Hello World" project as a starting point.
- Avoid adding links of any type (URLs, files, folders, etc.) or integrations that are not explicitly required.
- Avoid generating images, videos, or any other media files unless explicitly requested.
- If you need to use any media assets as placeholders, let the user know that these are placeholders and should be replaced with the actual assets later.
- Ensure all generated components serve a clear purpose within the user's requested workflow.
- If a feature is assumed but not confirmed, prompt the user for clarification before including it.
- If you are working on a VS Code extension, use the VS Code API tool with a query to find relevant VS Code API references and samples related to that query.

TASK COMPLETION RULES:

- Your task is complete when:
  - Project is successfully scaffolded and compiled without errors
  - copilot-instructions.md file in the .github directory exists in the project
  - README.md file exists and is up to date
  - User is provided with clear instructions to debug/launch the project

Before starting a new task in the above plan, update progress in the plan.
-->

- Work through each checklist item systematically.
- Keep communication concise and focused.
- Follow development best practices.
