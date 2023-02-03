# Testing with Playwright: Overview

## Key Takeaways

## Before You Begin

1. Please execute the steps outlined in the [deployment instructions](../../docs/deployment-instructions.md) to provision the infrastructure in your own Azure subscription.

2. Once done, please execute the steps mentioned in the [running locally](../../docs/running-locally.md) document. Basically this will ensure that Playwright is installed on your machine.

## Installing VSCode Extension

You can install the Playwright extension for VSCode from the marketplace ([LINK](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)). This extension will help you get started with Playwright quickly. It will also help you run and debug your tests from within VSCode.

  ![Playwright](./media/playwright-1.png)

## Running tests in VSCode

1. Click on the `Testing` tab in VSCode's activity bar. This will show you all the tests in your project (in a tree structure).

   ![Playwright](./media/playwright-2.png)

2. You can run a single test (or a group of tests) by clicking the triangle symbol next to it. When Playwright finishes executing the test(s), you will see a green tick next to your test block as well as the time it took to run the test.

   ![Playwright](./media/playwright-3.png)

3. You can navigate to the test code by right-clicking on the test name in the tree structure, selecting `Go To Test`.

   ![Playwright](./media/playwright-4.png)

## Debugging the tests

1. You can set breakpoints in your test code by clicking on the left "gutter" (the left-most column in the code editor). Right-clicking in the gutter will show you more options (like setting a conditional breakpoint).

   ![Playwright](./media/playwright-5.png)

2. Then you can run a test in debug mode by clicking on the `Debug` button next to the test name in the tree structure.

   ![Playwright](./media/playwright-6.png)

3. Once the breakpoint is hit, you can use the single-step through the code and inspect variables (Note: These debugging features are already built into VSCode, and aren't playwright specific. [More details](https://code.visualstudio.com/docs/editor/debugging)).

   ![Playwright](./media/playwright-7.png)

## Testing with Azure AD

In order to test authentication, we can configure AAD, then run tests to log in to a Contoso Traders account.

>Tests written with Playwright execute in isolated clean-slate environments called browser contexts. This isolation model improves reproducibility and prevents cascading test failures. New browser contexts can load existing authentication state. This eliminates the need to login in every context and speeds up test execution.

1. Add the AAD identity provider to your web app.
1. Create a test account (MFA disabled).
1. Add the credentials to 2 GitHub secrets: AADUSERNAME and AADPASSWORD.
1. Rename [account.ts](.\src\ContosoTraders.Ui.Website\tests\account.ts) to account.**spec**.ts. The test runner will pick up any files with **spec** in the name.

This test has a beforeAll hook that will log in to the app, then the test case uses the logged in state to fill out the personal info form.

Run the test locally or trigger a new GitHub Action run!

- [Playwright Authentication Documentation](https://playwright.dev/docs/auth)

## More Information

- [Playwright Documentation](https://playwright.dev/)
- [Using the Playwright VSCode Extension](https://playwright.dev/docs/getting-started-vscode)
- [VSCode Debugging](https://code.visualstudio.com/docs/editor/debugging)
