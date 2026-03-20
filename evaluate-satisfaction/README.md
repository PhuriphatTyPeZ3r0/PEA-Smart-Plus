This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Vercel Deployment

To deploy this project to Vercel:

1. **Root Directory**: If you are deploying the entire repository, set the "Root Directory" to `evaluate-satisfaction` in the Vercel project settings.
2. **Build Settings**: Vercel will automatically detect Next.js. Since we are using `output: 'export'`, ensure the "Output Directory" is set to `out` (though Vercel usually handles this automatically for Next.js 13+).
3. **Environment Variables**: If you add any backend features using `db.ts`, make sure to set the `DB_*` environment variables in Vercel.

### Fixed Issues
- Removed `basePath: '/Evaluate_Satisfaction'` from `next.config.ts` to fix 404 errors on the root `/` path.
- Updated `layout.tsx` and `manifest.json` to use root-relative paths.
- Added mockup fallback for satisfaction questions so the evaluation popup always shows even if the external API is unreachable.
- Fixed image referencing by ensuring paths are correctly resolved relative to the root.

## Local Development

```bash
cd evaluate-satisfaction
npm install
npm run dev
```

Visit `http://localhost:3000` to see the app. The evaluation popup will automatically appear after 1.5 seconds on the home screen.
