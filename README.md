# Automation Exercise - Playwright Test Framework

Playwright test automation framework built with TypeScript for end-to-end testing of user flows on the Automation Exercise website.

The project follows the Page Object Model (POM) design pattern.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Azure DevOps

## Test Coverage

The test suite covers product navigation, product search, product details, shopping cart operations, and positive and negative search scenarios.

## Project Structure

```text
├── fixtures/
├── pages/
├── test-data/
├── tests/
├── utils/
├── playwright.config.ts
├── azure-pipelines.yml
└── package.json
```

Page Objects encapsulate page-specific interactions and assertions.

Playwright fixtures provide reusable test setup, including advertisement blocking and initialization of the starting page object.

Advertisement-related network requests are blocked because third-party ads on the public website can interfere with UI interactions.

Tests run with a single worker to provide more stable execution against the public third-party website.

## Setup

Install dependencies and Playwright browsers:

```bash
npm ci
npx playwright install
```

## Run Tests

```bash
npm test
```

Tests can also be executed from the VS Code Testing panel using the Playwright Test for VSCode extension.

## Test Report

Open the Playwright HTML report:

```bash
npx playwright show-report
```

The test execution also generates a JUnit XML report used by the CI pipeline.

## CI/CD

The project includes an Azure DevOps pipeline defined in `azure-pipelines.yml`.

The pipeline:

- installs Node.js and project dependencies
- installs Playwright Chromium and its dependencies
- executes the Playwright test suite
- publishes JUnit test results
- publishes the Playwright HTML report as a pipeline artifact

The pipeline is triggered automatically on pushes to the `master` branch, providing automatic validation of changes committed to the main development branch.

CI execution runs in headless mode, with retries and trace collection enabled to help diagnose potential failures.