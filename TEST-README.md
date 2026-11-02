# Testing With Playwright

Follow these instructions to run smoke tests on Playwright. By default, all tests are run on a local server in browsers Firefox, Chrome and Safari.
Running on CI has not yet been enabled. 

## Running Tests

1. Run all tests:

```powershell
  npm run test
  ```

2. Run all smoke tests:

```powershell
  npm run test:smoke
  ```
3. Run all ui smoke tests:

```powershell
  npm run test:ui
  ```
4. Run tests on specific browsers:

```powershell
  npx playwright test --project firefox --project webkit
  ```
5. Run specific test:
 ```powershell
  npx playwright test -g "book available rink"
  ```
