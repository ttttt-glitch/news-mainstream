import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production' //  FIXED

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: 'news-mainstream-admin2026',
  deployment: {
    appId: 'agarpwqi6w0202u6x2xexxnm',
  },
})