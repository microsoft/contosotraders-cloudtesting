# Testing with Playwright: Overview

## Key Takeaways

## Before You Begin

1. Please execute the steps outlined in the [deployment instructions](../../docs/deployment-instructions.md) to provision the infrastructure in your own Azure subscription.

2. Once done, please execute the steps mentioned in the [running locally](../../docs/running-locally.md) document. Basically this will ensure that Playwright is installed on your machine.

## Installing VSCode Extension

You can install the Playwright extension for VSCode from the marketplace ([LINK](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)). This extension will help you get started with Playwright quickly. It will also help you run and debug your tests from within VSCode.

  ![Playwright](./media/playwright-1.png)

The Playwright docs have more details here: [Using the Playwright VSCode Extension](https://playwright.dev/docs/getting-started-vscode)

## Running tests in VSCode

1. Restore project dependencies:
   * Open a cmd window and navigate to the `src/ContosoTraders.Ui.Website` folder.
   * Run `npm install`.

1. Set environment variables for the remote testing endpoints. The values can be grabbed from the GitHub Action logs that set them in the pipeline.
    1. Navigate to [ContosoTraders/Actions](https://github.com/microsoft/ContosoTraders-CloudTesting/actions)

    1. Drill into the latest run by clicking on the `playwright-tests-ui` job, then clicking on the step `Set env variables for testing endpoints`.
    ![image](media/actions1.png)
    1. This project uses a `.env.playwright.local` file to easily manage these variables. Open `src\ContosoTraders.Ui.Website\.env.playwright.local` and set the following environment variables using the values from the logs above (these will be unique to your environment). NOTE: Do NOT check in these changes to source control!:

    ```bash
    REACT_APP_APIURLSHOPPINGCART = ''
    REACT_APP_APIURL = ''
    REACT_APP_BASEURLFORPLAYWRIGHTTESTING = ''
    ```

1. Click on the `Testing` tab in VSCode's activity bar. This will show you all the tests in your project (in a tree structure). There are tests that demonstrate [API testing](../../src/ContosoTraders.Ui.Website/tests/api.cart.spec.ts), [Authentication](../../src/ContosoTraders.Ui.Website/tests/auth.setup.ts), [Visual Comparisons](../../src/ContosoTraders.Ui.Website/tests/pages.spec.ts:63), [Emulation](../../src/ContosoTraders.Ui.Website/tests/map.spec.ts), [Mocking](../../src/ContosoTraders.Ui.Website/tests/mocks.spec.ts), and [using a CSV for data](../../src/ContosoTraders.Ui.Website/tests/account.ts).

   ![Playwright](./media/playwright-2.png)

1. You can run a single test (or a group of tests) by clicking the triangle symbol next to it. When Playwright finishes executing the test(s), you will see a green tick next to your test block as well as the time it took to run the test.

   ![Playwright](./media/playwright-3.png)

1. You can navigate to the test code by right-clicking on the test name in the tree structure, selecting `Go To Test`.

   ![Playwright](./media/playwright-4.png)

## Debugging the tests

1. You can set breakpoints in your test code by clicking on the left "gutter" (the left-most column in the code editor). Right-clicking in the gutter will show you more options (like setting a conditional breakpoint).

   ![Playwright](./media/playwright-5.png)

1. Then you can run a test in debug mode by clicking on the `Debug` button next to the test name in the tree structure.

   ![Playwright](./media/playwright-6.png)

1. Once the breakpoint is hit, you can use the single-step through the code and inspect variables (Note: These debugging features are already built into VSCode, and aren't playwright specific. [More details](https://code.visualstudio.com/docs/editor/debugging)).

   ![Playwright](./media/playwright-7.png)

## Testing with Azure AD

In order to test authentication, we can configure AAD, then run tests to log in to a Contoso Traders account. The specific steps are:

1. Identify the Service Principal details created in the [deployment instructions](../../docs/deployment-instructions.md).

1. Add the above Service Principal into the the [Application Administrator](https://learn.microsoft.com/azure/active-directory/roles/permissions-reference#application-administrator) active directory role.

    1. Go to the Azure portal, and navigate to the Azure Active Directory blade. Then click on the `Roles and Administrators` tab on the left.
    1. Select the `Application Administrator` role, and click on the `Add assignments` button.
    1. Select the service principal that you created in the previous step. Click on the `Add` button.

    ![Application Administrator](../../docs/images/ad-application-administrator.png)

    >
    > Notes:
    >
    > * Unfortunately, there is no AZ CLI, AZ PowerShell or Bicep template support to add a service principal to the `Application Administrator` role. You'll have to do this manually through the Azure portal.
    >
    > * Note: In order for you to add the service principal to the `Application Administrator` role, you must yourself be a member of the `Global Administrator` role in Azure Active Directory.
    >

1. Create a test account (MFA disabled).

1. To run the [example test](../../src/ContosoTraders.Ui.Website/tests/account.ts) in GitHub Actions, add the test account credentials as github environment-level variables.

   | Variable Name | Variable Value               |
   | ------------- | ---------------------------- |
   | `AADUSERNAME` | username of the test account |
   | `AADPASSWORD` | password of the test account |

   > If you're using Azure Pipelines instead of GitHub Actions, you can set the above variables in the `contosotraders-cloudtesting-variable-group` variable group. See [this document](../../docs/deployment-instructions-azure-pipelines.md#prepare-your-azure-pipeline-for-deployment) for details.
   >
   > If you wish to run the [example test](../../src/ContosoTraders.Ui.Website/tests/account.ts) locally, set the credentials as 2 environment variables: REACT_APP_AADUSERNAME and REACT_APP_AADPASSWORD

1. Re-run the github workflow `contoso-traders-cloud-testing`. This will configure the Azure AD to enable login functionality in the app.

   This test has a beforeAll hook that will log in to the app, then the test case uses the logged in state to fill out the personal info form.

1. Read the [Playwright Authentication Documentation](https://playwright.dev/docs/auth)

> Tests written with Playwright execute in isolated clean-slate environments called browser contexts. This isolation model improves reproducibility and prevents cascading test failures. New browser contexts can load existing authentication state. This eliminates the need to login in every context and speeds up test execution.

## More Information

* [Playwright Documentation](https://playwright.dev/)

* [Using the Playwright VSCode Extension](https://playwright.dev/docs/getting-started-vscode)

* [VSCode Debugging](https://code.visualstudio.com/docs/editor/debugging)
