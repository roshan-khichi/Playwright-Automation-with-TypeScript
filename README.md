# 🎭 Playwright-Automation-with-TypeScript

This project demonstrates end-to-end UI automation using Playwright with Page Object Model (POM) design and Jenkins CI/CD.

The demo tests are performed on Practice Test Automation.

## 📌 Features

✅ Automated Login, Logout, Form & Error handling flows

✅ Page Object Model (POM) for reusable test code

✅ Screenshots on test failures for debugging

✅ Cross-browser testing (Chromium, Firefox, WebKit)

✅ HTML test reports

✅ Jenkins CI/CD Pipeline integration

✅ Environment-based test configuration using `.env.dev`, `.env.qa`, etc.

## 🛠️ Tech Stack

**Playwright** – Automation framework & POM framework

**TypeScript** – Strongly typed scripting

**Node.js** – Runtime environment

**Playwright Test Runner** – Test execution & reporting

**Jenkins** – CI/CD pipeline

**dotenv** – Environment-specific configuration

## 📂 Project Structure

* 📦 playwright-automation
* ┣ 📂 tests          # Test specs
* ┣ 📂 pages          # Page Object Models
* ┣ 📂 utils          # Helpers & constants
* ┣ 📂 reports        # Playwright test reports
* ┣ 📂 screenshots    # Failure screenshots
* ┣ 📜 `.env.dev`       # Development environment variables
* ┣ 📜 `.env.qa`        # QA environment variables
* ┣ 📜 `playwright.config.ts`   # Playwright configuration
* ┣ 📜 `package.json`   # Dependencies & scripts
* ┗ 📜 `README.md`      # Project documentation

## ⚡ Setup & Installation

### Clone the repo

```bash
git clone https://github.com/roshan-khichi/Playwright-Automation-with-TypeScript.git
cd playwright-automation
```

### Install dependencies

```bash
npm install
```

## 🌍 Environment Configuration

The project loads environment variables dynamically based on the `TEST_ENV` value.

If `TEST_ENV` is not provided, the project defaults to the **dev** environment and loads `.env.dev`.

```typescript
const environment = process.env.TEST_ENV || 'dev';
dotenv.config({ path: path.resolve(__dirname, `.env.${environment}`) });
```

### Run tests for Dev environment

```bash
npm test
```

### Run tests for QA environment

**Windows:**

```bash
set TEST_ENV=qa && npm test
```

**Linux/macOS:**

```bash
TEST_ENV=qa npm test
```

You can create additional environment files such as `.env.staging` or `.env.prod` and run them by changing `TEST_ENV`.

## ▶️ Running Tests

### Run all tests

```bash
npm test
```

### Run tests with browser UI (headed mode)

```bash
npm test -- --headed
```

### Run a specific test file

```bash
npm test -- tests/Specs/main.spec.ts
```

### Run with HTML report

```bash
npx playwright test --reporter=html
```

## 📊 Reports & Screenshots

After every test run, an HTML report is generated in the `reports/` folder.

To open the report:

```bash
npx playwright show-report
```

Send the latest Playwright report by email. Configure the SMTP variables in the selected `.env` file first:

```bash
npm run send-report
```

Run the tests and send the report only if a test fails:

```bash
npm run test-and-email
```

On test failures, screenshots are automatically captured and saved in `screenshots/`.

## 🚀 Jenkins CI/CD

This project is integrated with Jenkins Pipeline to:

* Run tests automatically on each code push
* Support environment-specific test execution using `TEST_ENV`
* Publish Playwright HTML reports as build artifacts
* Send reports through email when configured

### Example Jenkinsfile

```groovy
pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    checkout([$class: 'GitSCM',
                        branches: [[name: 'main']],
                        userRemoteConfigs: [[
                            url: 'https://github.com/roshan-khichi/Playwright-Automation-with-TypeScript.git',
                            credentialsId: 'jenkins_token'
                        ]]
                    ])
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npm run test-and-email'
            }
        }
    }
}
```

### Jenkins Environment Example

To run tests against a specific environment, set:

```bash
TEST_ENV=qa
```

The corresponding `.env.qa` file will be loaded automatically.
