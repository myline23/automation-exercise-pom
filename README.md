# Automation Exercise - Playwright Test Framework

UI test automation framework built with Playwright and TypeScript using the Page Object Model (POM) design pattern.

The automated scenario covers:
- Navigate to Men's Jeans
- Add two products to the cart
- Verify the expected products and quantities

## Tech Stack

- Playwright
- TypeScript
- Node.js

## Project Structure

```text
├── fixtures/
├── pages/
├── test-data/
├── tests/
├── utils/
├── playwright.config.ts
└── package.json
```

The framework separates test scenarios, page interactions, test data, reusable setup, and supporting utilities.

## Advertisement Handling

The website loads third-party advertisements that may interfere with UI interactions. Advertisement-related network requests are blocked through Playwright request interception to keep the automated scenario stable and focused on the application functionality.

## Setup

Install dependencies and Playwright browsers:

```bash
npm install
npx playwright install
```

## Run Tests

From the command line:

```bash
npx playwright test
```

Tests can also be executed directly from the VS Code Testing panel using the Playwright Test for VSCode extension.

## Test Report

Open the Playwright HTML report:

```bash
npx playwright show-report
```