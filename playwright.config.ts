import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: 1,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],

  use: {
    baseURL: 'https://www.automationexercise.com',

    headless: !!process.env.CI,

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },


  ],
});