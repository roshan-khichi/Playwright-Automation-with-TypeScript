# 🎭 Playwright-Automation-with-TypeScript
This project demonstrates end-to-end UI automation using Playwright with Page Object Model (POM) design and also with Jenkins CI/CD.

The demo tests are performed on Practice Test Automation
.

## 📌 Features

✅ Automated Login, Logout, Form & Error handling flows

✅ Page Object Model (POM) for reusable test code

✅ Screenshots on test failures for debugging

✅ Cross-browser testing (Chromium, Firefox, WebKit)

✅ HTML test reports viewable with npx playwright show-report

✅ Jenkins CI/CD Pipeline integration for automated execution

## 🛠️ Tech Stack

Playwright
 – Automation framework
 – POM frameword

TypeScript
 – Strongly typed scripting

Node.js
 – Runtime environment

[Jest / Playwright Test Runner] – Test execution & reporting

Jenkins
 – CI/CD pipeline

## 📂 Project Structure
- 📦 playwright-automation
- ┣ 📂 tests          # Test specs (login.spec.ts, form.spec.ts, etc.)
- ┣ 📂 pages          # Page Object Models (LoginPage.ts, DashboardPage.ts)
- ┣ 📂 utils          # Helpers & constants
- ┣ 📂 reports        # Playwright test reports (HTML/JSON)
- ┣ 📂 screenshots    # Failure screenshots
- ┣ 📜 playwright.config.ts   # Playwright config
- ┣ 📜 package.json   # Dependencies & scripts
- ┗ 📜 README.md      # Project documentation

## ⚡ Setup & Installation

Clone the repo
```bash
git clone https://github.com/your-username/playwright-automation.git
cd playwright-automation
```


Install all dependencies

```bash
npm install
```

## ▶️ Running Tests

Run all tests

```bash
npx test
```

Run tests with browser UI (headed mode)

```bash
npx test --headed
```

Run a specific test file

```bash
npx test tests/login.spec.ts
```

Run with HTML report
```bash
npx playwright test --reporter=html
```

##  📊 Reports & Screenshots

After every test run, an HTML report is generated in the reports/ folder.

To open it in browser:

```bash
npx playwright show-report
```

On test failures, screenshots are automatically captured and saved in screenshots/.


##  🚀 Jenkins CI/CD

- This project is integrated with Jenkins Pipeline to:
- Run tests automatically on each code push
- Publish Playwright HTML reports as build artifacts
