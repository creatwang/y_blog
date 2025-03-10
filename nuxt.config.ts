// https://nuxt.com/docs/api/configuration/nuxt-config
import {readFileSync} from "node:fs";

export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxthq/studio',
    'nuxt-og-image'
  ],

  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter(c => ['UButton', 'UIcon'].includes(c.pascalName))
      globals.forEach(c => c.global = true)
    }
  },

  colorMode: {
    disableTransition: true
  },
  content: {
    markdown: {
      toc: { depth: 4, searchDepth: 4 },
      anchorLinks: { depth: 4 },
    },
    highlight: {
      langs: [
        JSON.parse(readFileSync('./shiki/languages/less.json', 'utf-8')),
        JSON.parse(readFileSync('./shiki/languages/xml.json', 'utf-8')),
        JSON.parse(readFileSync('./shiki/languages/ssh-config.json', 'utf-8')),
        JSON.parse(readFileSync('./shiki/languages/dart.json', 'utf-8')),
        JSON.parse(readFileSync('./shiki/languages/scss.json', 'utf-8')),
        JSON.parse(readFileSync('./shiki/languages/sql.json', 'utf-8')),
        'fs'
      ]
    }
  },
  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },
  routeRules: {
    '/api/search.json': { prerender: true }
  },

  devtools: {
    enabled: true
  },

  typescript: {
    strict: false
  },

  future: {
    compatibilityVersion: 4
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  compatibilityDate: '2024-07-11'
})
