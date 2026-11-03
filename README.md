# Next.js Monorepo with Sanity CMS

A modern, full-stack monorepo template built with Next.js App Router, Sanity CMS, Shadcn UI, and TurboRepo.

![Easiest way to build a webpage](https://raw.githubusercontent.com/robotostudio/turbo-start-sanity/main/turbo-start-sanity-og.png)

## Features

### Monorepo Structure

- Apps: web (Next.js frontend) and studio (Sanity Studio)
- Shared packages: UI components, TypeScript config, ESLint config
- Turborepo for build orchestration and caching

### Frontend (Web)

- Next.js App Router with TypeScript
- Shadcn UI components with Tailwind CSS
- Server Components and Server Actions
- SEO optimization with metadata
- Blog system with rich text editor
- Table of contents generation
- Responsive layouts

### Content Management (Studio)

- Sanity Studio v3
- Custom document types (Blog, FAQ, Pages)
- Visual editing integration
- Structured content with schemas
- Live preview capabilities
- Asset management

## Getting Started

### Installing the template

#### 1. Initialize template with Sanity CLI

Run the command in your Terminal to initialize this template on your local computer.

See the documentation if you are [having issues with the CLI](https://www.sanity.io/help/cli-errors).

```shell
npm create sanity@latest -- --template robotostudio/turbo-start-sanity
```

#### 2. Run Studio and Next.js app locally

Navigate to the template directory using `cd <your app name>`, and start the development servers by running the following command

```shell
pnpm run dev
```

#### 3. Open the app and sign in to the Studio

Open the Next.js app running locally in your browser on [http://localhost:3000](http://localhost:3000).

Open the Studio running locally in your browser on [http://localhost:3333](http://localhost:3333). You should now see a screen prompting you to log in to the Studio. Use the same service (Google, GitHub, or email) that you used when you logged in to the CLI.

### Adding content with Sanity

#### 1. Publish your first document

The template comes pre-defined with a schema containing `Author`, `Blog`, `BlogIndex`, `FAQ`, `Footer`, `HomePage`, `Navbar`, `Page`, and `Settings` document types.

From the Studio, click "+ Create" and select the `Blog` document type. Go ahead and create and publish the document.

Your content should now appear in your Next.js app ([http://localhost:3000](http://localhost:3000)) as well as in the Studio on the "Presentation" Tab

#### 2. Sample Content

When you initialize the template using the Sanity CLI, sample content is automatically imported into your project. This includes example blog posts, authors, and other content types to help you get started quickly.

#### 3. Extending the Sanity schema

The schemas for all document types are defined in the `studio/schemaTypes/documents` directory. You can [add more document types](https://www.sanity.io/docs/schema-types) to the schema to suit your needs.

### Deploying your application and inviting editors

#### 1. Deploy Sanity Studio

Your Next.js frontend (`/web`) and Sanity Studio (`/studio`) are still only running on your local computer. It's time to deploy and get it into the hands of other content editors.

The template includes a GitHub Actions workflow [`deploy-sanity.yml`](https://raw.githubusercontent.com/robotostudio/turbo-start-sanity/main/.github/workflows/deploy-sanity.yml) that automatically deploys your Sanity Studio whenever changes are pushed to the `studio` directory.

> **Note**: To use the GitHub Actions workflow, make sure to configure the following secrets in your repository settings:
>
> - `SANITY_DEPLOY_TOKEN`
> - `SANITY_STUDIO_PROJECT_ID`
> - `SANITY_STUDIO_DATASET`
> - `SANITY_STUDIO_TITLE`
> - `SANITY_STUDIO_PRESENTATION_URL`
>
> The daily content backup also needs `SANITY_BACKUP_TOKEN` (see [Content backups](#content-backups)).

Alternatively, you can manually deploy from your Studio directory (`/studio`) using:

```shell
npx sanity deploy
```

#### 2. Deploy Next.js app to Vercel

You have the freedom to deploy your Next.js app to your hosting provider of choice. With Vercel and GitHub being a popular choice, we'll cover the basics of that approach.

1. Create a GitHub repository from this project. [Learn more](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github).
2. Create a new Vercel project and connect it to your Github repository.
3. Set the `Root Directory` to your Next.js app (`/apps/web`).
4. Configure your Environment Variables.

#### 3. Invite a collaborator

Now that you’ve deployed your Next.js application and Sanity Studio, you can optionally invite a collaborator to your Studio. Open up [Manage](https://www.sanity.io/manage), select your project and click "Invite project members"

They will be able to access the deployed Studio, where you can collaborate together on creating content.

## Content backups

The [`backup-sanity.yml`](.github/workflows/backup-sanity.yml) GitHub Actions workflow exports the Sanity dataset every day. Each backup is kept as a workflow artifact for 90 days, so any day from the last three months can be restored.

Backups contain every document (published and drafts, including image references and the image records that hold alt text) but not the image and video files themselves. Those stay in Sanity, so a backup restores content that was edited or deleted, but not a file that was deleted from the Media tool.

### Setup

Add a `SANITY_BACKUP_TOKEN` repository secret: in [Manage](https://www.sanity.io/manage), open the project, go to API → Tokens and create a token with **Viewer** permissions. The workflow also uses the existing `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` secrets. (`SANITY_DEPLOY_TOKEN` can't be used here, as it has no read access to content.)

To take a backup now, for example before a large content change, open the workflow in the repository's Actions tab and click **Run workflow**.

### Restoring

1. In the Actions tab, open a "Back Up Sanity Content" run and download its artifact. Unzip it to get `sanity-production-YYYY-MM-DD.tar.gz`.
2. From `apps/studio`, logged in with `npx sanity login` as a project member with write access, run:

   ```shell
   pnpm exec sanity dataset import /path/to/sanity-production-YYYY-MM-DD.tar.gz production --replace
   ```

`--replace` overwrites every document in the backup with its backed-up version. Documents created after the backup was taken are left alone. If the import stops because an image file no longer exists, add `--allow-failing-assets` to skip that check.

To recover a single document instead, look in `data.ndjson` inside the archive, or use the document's history in the Studio if the change was recent.
