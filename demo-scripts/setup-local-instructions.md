# Instructions to run Contoso Traders locally

## Setting up ContosoTraders Infrastructure

1. You'll need an Azure subscription with the `Microsoft.OperationsManagement` resource provider registered ([steps](https://learn.microsoft.com/en-us/azure/azure-resource-manager/troubleshooting/error-register-resource-provider?tabs=azure-portal)).
2. You'll need a service principal in the `owner` role on the Azure subscription where the infrastructure is to be provisioned.
3. Git clone this repository to your machine.
4. Create the `SERVICEPRINCIPAL`, `ENVIRONMENT`, and `SQL_PASSWORD` github secrets ([instructions here](./App-Deployment-Guide)).
5. Next, run the `contoso-traders-provisioning-deployment` github workflow. You can do this by going to the github repo's `Actions` tab, selecting the workflow, and clicking on the `Run workflow` button. This will both provision the infrastructure on Azure as well as deploy the applications (APIs, UI) to the infrastructure.

## Running ContosoTraders Locally

1. First ensure that the infrastructure setup has been completed as per steps above.
2. Ensure that you have the following installed:
   * [Node v16.18.0](https://nodejs.org/download/release/v16.8.0/)
   * [DOTNET 6 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
   * [AZ CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
3. Login to AZ CLI using the [service principal details](./github-secrets.md):
   * `az login --service-principal -u <clientId> -p <clientSecret> --tenant <tenantId>`
4. Run the Products API locally:
   * Open a cmd window and navigate to the `src/ContosoTraders.Api.Products` folder.
   * Run `dotnet user-secrets set "KeyVaultEndpoint" "https://contosotraderskv<ENVIRONMENT>.vault.azure.net/"`. Replace `<ENVIRONMENT>` with the [value used above](./github-secrets.md).
   * Run `dotnet build && dotnet run`. This will start the web API on `https://localhost:62300/swagger`.
   * Note that your browser may show you a warning about insecure connection which you can safely ignore.
5. Run the Carts API locally
   * Open a cmd window and navigate to the `src/ContosoTraders.Api.Carts` folder.
   * Run `dotnet user-secrets set "KeyVaultEndpoint" "https://contosotraderskv<ENVIRONMENT>.vault.azure.net/"`. Replace `<ENVIRONMENT>` with the [value used above](./github-secrets.md).
   * Run `dotnet build && dotnet run`. This will start the web API on `https://localhost:62400/swagger`.
   * Note that your browser may show you a warning about insecure connection which you can safely ignore.
6. Run the UI locally:
   * You'll have to manually update this source code file to point to the locally running APIs above: `src\ContosoTraders.Ui.Website\.env`
     * line #01: `const APIUrl = 'https://localhost:62300/v1';`
     * line #02: `const APIUrlShoppingCart = 'https://localhost:62400/v1';`
   * Open a cmd window and navigate to the `src/ContosoTraders.Ui.Website` folder.
   * Run `npm install`.
   * Run `npm run start`. This will start the UI on `http://localhost:3000`.
   * Note that your browser may show you a warning about insecure connection which you can safely ignore.
