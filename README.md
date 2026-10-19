# The Diplomat Within

A complete, responsive single-page personal advisory website for Lyla Bashan. React, Vite, TypeScript, and Tailwind CSS. No analytics, booking tools, prices, or invented client claims. No live-domain deployment was performed as part of implementation.

## Launch handoff

The approved website is ready for review/merge in [pull request #1](https://github.com/lbashan/diplomatwithin.com/pull/1). See [DEPLOYMENT.md](DEPLOYMENT.md) for beginner-friendly merge, temporary Netlify deployment, and form notification steps; [FINAL_CHECKS.md](FINAL_CHECKS.md) records verification results and remaining deployment tests. Nothing has been merged or deployed automatically.

## Run and preview

Use Node.js 22.12 or newer (Node 22 LTS recommended) and npm.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite (normally http://127.0.0.1:5173). For a production preview:

```sh
npm run lint
npm run build
npm run check:copy
npm run preview
```

Open the printed preview URL (normally http://127.0.0.1:4173). `build` typechecks TypeScript before producing `dist/`. Preview is local; it does not deploy the website or send form submissions. `check:copy` checks the approved copy integrity, offering boundaries, metadata, and built static Netlify form declaration; run build first if dist does not yet exist.

## Source map

```text
index.html                 SEO/social metadata + static Netlify form declaration
src/App.tsx                Semantic sections, mobile navigation, FAQ, contact form
src/copy.json              Revised approved copy, grouped by section and field
src/styles.css             Responsive design, tokens, typography, reduced motion
src/main.tsx               React entry point and self-hosted fonts
public/favicon.svg         Original minimal horizon mark, not a supplied brand logo
public/robots.txt          Crawler instructions
public/sitemap.xml         Production homepage sitemap
public/images/README.md    Portrait and optional photography instructions
public/images/ASSETS.md    Original generated scenery provenance and prompts
scripts/check-copy.mjs     Copy and deployment-contract verification
netlify.toml               Build settings, Node version, security headers
```

Approved copy follows the revised October 18, 2026 prompt, recorded in `src/copy.json` as structured section entries. All nine sections follow the supplied reading order. Internal positioning and implementation instructions are excluded from visible prose. Site controls, artwork labels, and form feedback are functional UI text. See REVIEW.md for the current review and verification results.

## Visual assets and fonts

The hero and garden imagery are original AI-created landscape artworks, optimized as locally hosted WebP assets. They evoke island coastlines and gardens without claiming to document a specific real location. The scenery provenance is documented here and in `public/images/ASSETS.md`; the hero caption was removed at the owner’s request. The About portrait is the owner-supplied warm teal garden portrait, optimized without retouching. See `public/images/ASSETS.md` for generation prompts and provenance. Portrait source and replacement instructions are in `public/images/README.md`. Licensed photography is optional; the site is complete without it. No images, code, or branding assets were copied from the broad reference website.

Cormorant Garamond and DM Sans are bundled locally through Fontsource packages, with only Latin weights used by the page imported. They are licensed under the SIL Open Font License; see the license notices distributed in `public/licenses/`. No third-party font requests are made. System fallbacks are available.

## GitHub → Netlify review deployment (do not connect the live domain yet)

1. Review and merge the pull request into `main` when approved, or use its feature branch for a review site.
2. In Netlify, choose **Add new project → Import an existing project → GitHub** and select `lbashan/diplomatwithin.com`. Authorize repository access if requested.
3. Set the production branch to the branch you want to preview. Build command: `npm run build`. Publish directory: `dist`. Node 22 is configured in `netlify.toml` and `.nvmrc`.
4. Enable **Deploy Previews** for pull requests. Netlify can build the pull request once its GitHub integration is installed. A PR alone does not automatically create a preview without this integration.
5. Deploy to the generated `.netlify.app` URL first. Check desktop/mobile layouts, anchor navigation, keyboard focus, FAQ disclosures, portrait crop, and the form. No domain or DNS change is necessary for review.
6. Confirm the copy and layout with Lyla before connecting a live domain.

The canonical URL and sitemap intentionally identify `https://diplomatwithin.com/`. Keep Netlify review sites out of search indexes using Netlify's deploy-context indexing controls / `X-Robots-Tag: noindex` for deploy previews. Do not point search engines or the public domain at a preview.

## Netlify Forms: detection, delivery, and testing

The contact form requests a **complimentary 20-minute introductory conversation**, not a confirmed appointment. All inquiry CTAs lead to this form. Public email: `lyla@diplomatwithin.com`.

- `index.html` contains a hidden static `introductory-conversation` form that survives the Vite build in `dist/index.html`, allowing Netlify to detect it without running JavaScript.
- The visible React form uses the same name and fields (`name`, `email`, `message`, honeypot `company`), a hidden `form-name`, `data-netlify="true"`, and URL-encoded POST to `/`.
- Name and valid email are required. The optional message has a length limit. No health information is requested. Native browser validation, labels, visible focus, status/error feedback, and a honeypot are provided.
- Local Vite dev/preview does **not** handle Netlify Forms. Local submissions deliberately show an explanatory error and offer email. A local HTTP 200 must not be mistaken for a delivered inquiry.
- After Netlify deployment, enable **Forms → Form detection** in the Netlify project if necessary, then redeploy. Check that `introductory-conversation` appears in Forms.
- On the deployed `.netlify.app` site, submit a clearly identified test inquiry with an address you control. Verify the success message, then confirm the actual submission in **Forms → introductory-conversation → Verified submissions**. Also check the Spam list and mark a legitimate test as verified if needed. A successful response reports receipt by the form endpoint; it does not guarantee an email notification.
- Configure **Forms → Submission notifications → Add notification** (or project form notification settings) and add an email notification to **lyla@diplomatwithin.com** for this form. Send another test and verify inbox and junk folders. Notifications do not work until you configure them; verify account plan limits and mailbox delivery separately.
- Test a network failure using browser offline mode: the form must show an error and preserve entered values. Restore connectivity and retry. An HTTP error must never display the success message.
- The honeypot helps with spam, but requires monitoring. Review Netlify submissions, spam, usage limits, and retention as part of ongoing site administration.

No live submission or notification delivery has been verified during local development. Those require Netlify deployment and account configuration.

## Connect the domains only after approval

1. In Netlify's **Domain management**, add `diplomatwithin.com` and `www.diplomatwithin.com`. Choose `diplomatwithin.com` as primary so the canonical URL remains accurate.
2. At the current DNS provider, first export or screenshot all existing records. **Preserve existing MX, SPF, DKIM, and DMARC records and all other email-related records.** Do not replace the whole zone or change nameservers casually.
3. Follow the exact domain-specific DNS targets shown by Netlify: configure the apex using the supported ALIAS/ANAME/A instructions, and `www` using the supplied CNAME target. Do not guess or hard-code old Netlify IP addresses. If changing nameservers, migrate all required records, especially email records, before switching.
4. Wait for DNS verification and Netlify TLS provisioning. Confirm HTTPS for both hostnames, HTTP→HTTPS, and `www`→primary-domain redirects. Use Netlify primary-domain redirects; no SPA rewrite is needed for this anchor-only website.
5. Re-test form submission and mailbox notifications on the live hostname; verify existing email still sends and receives. Submit `https://diplomatwithin.com/sitemap.xml` to search engines if desired.

## Remaining owner inputs

- Optional licensed landscape photos and suitable alt text.
- Netlify import / preview deployment and form notification configuration.
- Final review before merging, domain/DNS connection, or production launch.
