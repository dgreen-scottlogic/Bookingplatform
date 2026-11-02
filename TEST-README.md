# Testing With Playwright

Follow these instructions to run smoke tests on Playwright. By default, all tests are run on a local server in browsers Firefox, Chrome and Safari.
Running on CI has not yet been enabled. 

## Run all tests 

```powershell
  npm run test
  ```

## Run Smoke Tests

```powershell
  npm run test:smoke
  ```
## Run In UI mode

```powershell
  npm run test:ui
  ```
## Run On Specific Browsers

```powershell
  npx playwright test --project firefox --project webkit
  ```
## Run A Specific Test
 ```powershell
  npx playwright test -g "book available rink"
  ```
