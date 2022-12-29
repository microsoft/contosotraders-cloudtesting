# Azure Load Testing: Overview

## Key Takeaways

In this demo, you'll get an overview of Azure's Load Testing service; a managed service that can be used to simulate load on your application's APIs.

You'll also get an insight into how to incorporate server-side metrics into the load test dashboard.

All these are especially crucial for an e-commerce application like Contoso Traders, which is expected to instantly handle a large, sudden spike in number of users, with low latency and no downtime.

## Before You Begin

* There are some prerequisites for this demo mentioned in the [application deployment guide](../app-deployment-guide.md). After executing all the steps mentioned in that document, the application's infrastructure will be provisioned on Azure, and the latest code will be deployed as well.

## Walkthrough: Identify the Load Test Target

1. In the Azure portal, you can navigate to the Azure Container App in the `contoso-traders-rg` resource group. This is the application that hosts the `Carts API`.

   ![ACA](./media/aca-2.png)

2. You can get the URL of the `Carts API` by as shown below.

   ![ACA](./media/aca-endpoint.png)

3. In a separate browser tab, enter the following url in the address bar to load the API's swagger page: `<ACA url>/swagger/index.html`

   ![ACA](./media/aca-swagger.png)

4. You can now identify the API that you want to load test. In this case, we'll be load testing the `Carts API`'s `GET <ACA url>/v1/ShoppingCart/loadtest` endpoint. Please note down this endpoint for later use.

   ![ACA](./media/aca-swagger-2.png)

## Walkthrough: Creating a Load Test

1. In the Azure portal, you can navigate to the Azure Load Testing service in the `contoso-traders-rg` resource group.

   ![load testing](./media/load-test-browse.png)

2. You can create a new load test as follows: Navigate to the `Tests` section, and then click on `Create` > `Create a Quick Test` button.

   ![load testing](./media/load-test-create-1.png)

3. In the `Quick Test` blade, you can specify the name of the load test, and the target URL. You can also specify the number of concurrent users, and the duration of the test. See example below:

   ![load testing](./media/load-test-create-2.png)

> **Note**: The target URL is the URL from the `Carts API` that you identified in the previous section.

## Walkthrough: Running the Load Test

1. Once you've entered the load test specifications above, you can run it by clicking on the `Run` button.

   ![load testing](./media/load-test-run.png)

2. The load test will take about 2 minutes to complete. Once done, it'll display the summary and client-side metrics.

   ![load testing](./media/load-test-in-progress.png)

   ![load testing](./media/load-test-completed.png)

## Walkthrough: Incorporate Server Side Metrics

1. Click on the `App Components` button. Then from the flyout, select the `contoso-traders-carts` CosmosDB component. This will add relevant metrics from the CosmosDB to the load test dashboard.

   ![load testing](./media/load-test-server-side-metrics.png)

2. Re-run the load test, and you'll see the impact of the synthetic load on the DB (in real-time).

   ![load testing](./media/load-test-run-2.png)

> **Note**: Unfortunately, ACA metrics are not yet supported in Azure Load Testing's server side metrics. This feature will be coming soon.

## Walkthrough: Review ACA Metrics & Dashboards

1. In the Azure portal, you can navigate to the Azure Container App in the `contoso-traders-rg` resource group.

   ![ACA](./media/aca.png)

2. For demo purposes, we have configured a `HTTP Scaling` rule that horizontally scales out additional replicas when the number of concurrent requests exceeds a threshold (`3` in this case). ACA also supports automatic scale-in to zero when traffic dips below threshold.

   ![ACA Scaling Rules](./media/aca-scaling-rules.png)

3. In the metrics tab, you can see the various metrics measured & published by the ACA infrastructure. You can create a metric chart that combines two metrics: `replica count` vs `requests`. It'll now have updated with the latest data after the load test. Of particular interest is the replica count chart of `Carts API`, which shows the instances auto-scaled out under increasing load. After load subsided, the instances auto-scaled back in to zero.

   ![load testing ACA](./media/aca-metrics2.png)

## Walkthrough: Export the JMX File, Results

1. Navigate back to the Load Testing service, and click on the recently concluded test run. From there you can click on `Download` > `Input File`. This will download the JMX file in a zip archive.

   ![load testing](./media/load-test-export-jmx.png)

2. You can review the JMX file by simply loading it up in notepad or VSCode.

   ![load testing](./media/load-test-jmx-view.png)

3. The load test results can also be downloaded via in the `Download` > `Results` button. This will download a CSV file (inside a zip archive).

   ![load testing](./media/load-test-export-results.png)

   ![load testing](./media/load-test-results-view.png)

## Walkthrough: Create New Load Test from JMX File

1. You can create a new load test from the JMX file that you downloaded in the previous section. Navigate to the `Tests` section, and then click on `Create` > `Create a Test from JMX File` button. Then follows the below sequence of steps

   ![load testing](./media/import-jmx-1.png)

   ![load testing](./media/import-jmx-2.png)

   ![load testing](./media/import-jmx-3.png)

   ![load testing](./media/import-jmx-4.png)

   ![load testing](./media/import-jmx-5.png)

   ![load testing](./media/import-jmx-6.png)

## Walkthrough: Regression Testing with Github Workflows

1. We have a GitHub workflow that executes load tests on the application's APIs. This workflow is automatically triggered on every checkin to the `main` branch. Specifically the load tests are run on the `Product API` and `Carts API` immediately after they're deployed to the AKS cluster and ACA respectively.

   ![github workflow](./media/github-workflow-2.png)

2. The workflow uses a github action to invoke the [Azure Load Testing](https://learn.microsoft.com/en-us/azure/load-testing/) service and simulate load on the application's `Product API` and `Carts API`, which are hosted on AKS and ACA respectively.

   ![github action for load testing](./media/github-action.png)

3. The workflow file references a load test configuration file (yml), which specifies:
   1. The load test parameters.
   2. The JMX/JMeter script to be used.
   3. The pass/fail criteria for the test.

   See [example file](../../tests/loadtests/contoso-traders-carts.yaml).

   ![load test config file](./media/load-test-config-file.png)

4. The load test takes about 3 minutes to execute. Once done, you can navigate to the Azure Portal to get more in-depth details about the test.

   ![workflow for load testing](./media/github-workflow-3.png)

   ![load testing portal](./media/portal-load-test.png)

## Summary

In this demo, you got an overview of Azure's Load Testing service; including how to create a load test, run it, and review the results. You also saw how to incorporate server-side metrics from Azure Services, and how to export the JMX file and results. Finally, you saw how to create a new load test from the JMX file, and how to use a GitHub workflow to execute load tests on the application's APIs.
