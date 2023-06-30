# Contoso Traders - Cloud testing tools demo app

The Contoso Traders app is a sample application showcasing [Playwright](https://playwright.dev), [Azure Load Testing](https://aka.ms/malt-docs), [Azure Chaos Studio](https://aka.ms/CHAOS-docs) and more.

This repo contains the source code, deployment templates, and demo scripts for exploring these cloud testing tools.

## Overview Video
[![Watch the overview video](https://img.youtube.com/vi/7JletmiT3io/hq1.jpg)](https://youtu.be/7JletmiT3io)

## Documentation and Resources

* Application Links: [UI](https://cloudtesting.contosotraders.com/) | [Carts API](https://contoso-traders-cartsctprd.bluestone-748d2276.eastus.azurecontainerapps.io/swagger/index.html) | [Products API](https://contoso-traders-productsctprd.eastus.cloudapp.azure.com/swagger/index.html)
* [Deployment Instructions](./docs/deployment-instructions.md) | [Running Locally](./docs/running-locally.md)

## Continuous Integration

| Pipeline                                                                     | Status                                                                                                                                                                                                                                                                               | Details                                                        |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| [GitHub Workflow](./.github/workflows/contoso-traders-cloud-testing.yml)     | [![contoso-traders-cloud-testing](https://github.com/microsoft/contosotraders-cloudtesting/actions/workflows/contoso-traders-cloud-testing.yml/badge.svg?branch=main)](https://github.com/microsoft/contosotraders-cloudtesting/actions/workflows/contoso-traders-cloud-testing.yml) | Deploys to [production](https://production.contosotraders.com) |
| [Azure DevOps Pipeline](./.azurepipelines/contoso-traders-cloud-testing.yml) | [![Build Status](https://dev.azure.com/MicrosoftTestDemos/ContosoTraders_Testing/_apis/build/status%2Fmicrosoft.contosotraders-cloudtesting?branchName=main)](https://dev.azure.com/MicrosoftTestDemos/ContosoTraders_Testing/_build/latest?definitionId=1&branchName=main)          | Deploys to [staging](https://staging.contosotraders.com)       |

## Demo Scripts

* [Developer Workflow](./demo-scripts/dev-workflow/walkthrough.md)

* Azure Load Testing - Generate high-scale load and identify performance bottlenecks.
  * [Create a load test for the shopping cart API.](./demo-scripts/azure-load-testing/walkthrough.md)
  * [Use GitHub Actions for regression testing.](./demo-scripts/azure-load-testing/walkthrough.md#walkthrough-regression-testing-with-github-workflows)
  * [Create a load test for a private endpoint that’s behind a VNet.](./demo-scripts/azure-load-testing/private-endpoints.md)
  * [Right-size your AKS cluster using load tests.](./demo-scripts/azure-load-testing/aks-cost-optimization.md)

* Azure Chaos Studio - Improve application resilience by introducing faults and simulating outages.
  * [Create an experiment using Key Vault Deny Access fault to test the products API (AKS).](./demo-scripts/azure-chaos-studio/walkthrough.md)
  * [Run experiment in GitHub Actions to inject faults (pod failures) into the AKS cluster.](./demo-scripts/azure-chaos-studio/walkthrough.md#walkthrough-running-chaos-experiments-via-github-workflows)

* Playwright - Reliable end-to-end testing for modern web apps.
  * [Use the VS Code extension to explore and run web tests](./demo-scripts/testing-with-playwright/walkthrough.md) for [API testing](src/ContosoTraders.Ui.Website/tests/api), [Authentication](src/ContosoTraders.Ui.Website/tests/auth.setup.ts), [Shopping cart](src/ContosoTraders.Ui.Website/tests/cart.spec.ts), [Uploading files](src/ContosoTraders.Ui.Website/tests/fileupload.spec.ts), [Visual Comparisons](src/ContosoTraders.Ui.Website/tests/pages.spec.ts#L63), [Emulation](src/ContosoTraders.Ui.Website/tests/map.spec.ts), [Mocking](src/ContosoTraders.Ui.Website/tests/mocks.spec.ts), and [using a CSV for data](src/ContosoTraders.Ui.Website/tests/account.ts)

## Architecture

![Architecture](./docs/architecture/contoso-traders-enhancements.drawio.png)

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit <https://cla.opensource.microsoft.com>.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft
trademarks or logos is subject to and must follow [Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
