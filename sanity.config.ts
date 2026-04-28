'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/sanity/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'
import {ViewPageAction} from './src/sanity/actions/ViewPageAction'
import {UnpublishPageAction} from './src/sanity/actions/VisibilityAction'

const VISIBILITY_TYPES = ['page', 'blogPost', 'teamMember', 'teamMembers', 'service']

export default defineConfig({
  basePath: '/sanity',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    actions: (prev, context) => {
      let actions = prev

      if (context.schemaType === 'page' || context.schemaType === 'blogPost') {
        actions = [...actions, ViewPageAction]
      }
      if (VISIBILITY_TYPES.includes(context.schemaType)) {
        actions = [...actions, UnpublishPageAction]
      }

      return actions
    },
  },
})
