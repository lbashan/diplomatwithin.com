# Deploy the approved website to a temporary Netlify URL

The approved site is ready to merge and deploy for testing. Do not connect the custom domain yet. No deployment or domain change has been performed by this preparation.

## 1. Merge the pull request in GitHub

1. Open https://github.com/lbashan/diplomatwithin.com/pull/1 and sign in to GitHub as `lbashan`.
2. Confirm the pull request says it merges `codex/complete-website` **into `main`**.
3. Review the description and **Files changed** if desired. Local production, TypeScript, lint, copy-integrity, asset, and browser checks are recorded in `FINAL_CHECKS.md`. These are local results, not a claim that GitHub Actions has run.
4. At the bottom of the conversation, click **Merge pull request**, then **Confirm merge**. If GitHub asks you to choose a merge method, its standard merge option is fine.
5. Wait for GitHub to show **Merged**. If merging is blocked by a new conflict or required check, stop and resolve that issue first.
6. Leave branch deletion for later if you want to retain an easy reference to this work.

The assistant has not merged this pull request. Your design approval authorized final preparation; the merge remains your explicit next action.

## 2. Import the existing GitHub repository into Netlify

1. Sign in at https://app.netlify.com/ and choose the Netlify team/account where this site should live.
2. Select **Add new project → Import an existing project**, then **GitHub**. You can also start at https://app.netlify.com/start and choose the option to import an existing Git repository. Do not start a new AI-generated website or use a template.
3. If prompted, authorize Netlify's GitHub integration. Limit access to `lbashan/diplomatwithin.com` if the installation screen offers selected repositories. This Netlify permission is separate from the existing Codex connector permission.
4. Select **lbashan/diplomatwithin.com**.
5. Confirm these settings:

   | Setting | Value |
   | --- | --- |
   | Branch to deploy | `main` (after merging) |
   | Base directory | Leave blank; use the repository root |
   | Build command | `npm run build` |
   | Publish directory | `dist` |
   | Node version | `22` (already set in `netlify.toml` and `.nvmrc`) |
   | Environment variables | None required for this website |

6. Choose **Publish** (some dashboard versions label this **Deploy project** or **Deploy**). Netlify should install dependencies from `package-lock.json`, run the production build, and publish `dist`.
7. In **Deploys**, wait until the deployment is marked **Published**. If it fails, open the deploy log and share the error; do not change the approved design or build settings at random.
8. Open the generated HTTPS address ending in **`.netlify.app`**. That is your temporary review URL. Netlify may call this its production deploy because it follows `main`; it does not connect your custom domain.
9. Skip any **Add custom domain**, DNS, nameserver, or domain-transfer setup. Do not change GoDaddy or email DNS records.

## 3. Enable and verify the contact form

The source is already configured for Netlify Forms: a hidden form exists in built HTML, and the React form sends URL-encoded POST data with the same form name and field names. No backend service, API key, or booking integration is required.

1. In your Netlify project, open **Forms** and choose **Enable form detection** if offered.
2. If detection was disabled during the first deployment, go to **Deploys → Trigger deploy → Deploy site** to redeploy. Form detection applies during a new deployment.
3. Return to **Forms** and confirm the form **introductory-conversation** is listed.
4. Open **Forms → Submission notifications → Add notification**. Choose an email notification for `introductory-conversation`, enter **lyla@diplomatwithin.com**, and save. Some dashboard versions also expose this under project notification settings.
5. On the actual `.netlify.app` website, submit a test using your own name, an email address you can check, and a message such as “Netlify launch test — please disregard.”
6. Confirm the on-page success message: **Thank you for reaching out. I'll be in touch to arrange a time.**
7. Confirm the test appears in **Forms → introductory-conversation → Verified submissions**. Check **Spam** too, since a legitimate test can be filtered.
8. Confirm the notification arrives at **lyla@diplomatwithin.com**, including its junk/spam folder. The on-page message alone does not prove notification delivery. The email field's `name="email"` lets Netlify set the submitter as Reply-to.
9. Also test an empty name and an invalid email; the browser must block those submissions. Optionally test with browser offline mode and confirm a visible error rather than a success message.

Local Vite dev/preview deliberately does not send inquiries and shows an explanatory error. A local preview test does not count as a Netlify submission test. No deployed submission or notification delivery has been verified yet.

## 4. Review the temporary site before domain connection

- Check the site on your desktop, tablet, and phone; confirm the portrait and full biography, all five FAQ answers, and each inquiry button.
- Verify all imagery loads and no content is cut off. Try keyboard Tab navigation and visible focus.
- Confirm the public email, 20-minute introduction, 90-minute Strategy Session, reflection, roadmap, and longer-term advisory are correct.
- Verify your real test submission and notification email before relying on the form.
- The canonical URL and sitemap intentionally point to `https://diplomatwithin.com/` for eventual launch. Avoid submitting the temporary URL to search engines. Use Netlify's search-indexing/access controls if needed while reviewing; those settings do not require changing the approved site copy.
- Netlify deploy previews for future pull requests can be enabled after the Git integration is connected.

Only after this review should you authorize the custom-domain step. Follow the existing README's domain instructions, preserving all MX, SPF, DKIM, and DMARC email records.

## Official references

- Import an existing project: https://docs.netlify.com/start/choose-your-path/
- Netlify Forms detection and React/AJAX setup: https://docs.netlify.com/manage/forms/setup/
- Email notifications: https://docs.netlify.com/manage/forms/notifications/
