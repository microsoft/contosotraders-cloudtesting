# Azure Load Testing: Private Endpoints

## Key Takeaways

In this demo, we'll attempt to load test an private API endpoint using the Azure Load Testing Preview. The private API endpoint in question is only accessible from within an Azure virtual network (VNET).
We'll demonstrate Azure Load Testing service's capability to generate load from within a virtual network (using VNET resource injection).

## Before You Begin

There are some prerequisites for this demo mentioned in the [application deployment guide](../app-deployment-guide.md). After executing all the steps mentioned in that document, the application's infrastructure will be provisioned on Azure.

Specifically, here's what happens behind the scenes:

* An Azure virtual network (VNET) is created with three subnets:
  * A subnet for Azure Container Apps to deploy its infrastructure as well as the application's API private endpoints.
  * A subnet for Azure Load Testing to inject its resources.
  * A subnet for Azure VMs (jumpboxes) to access the application's private endpoints (for visual verification purposes).

* An Azure Container Apps instance is deployed to host the application's API endpoints. The API endpoints are configured to be private endpoints, and the ingress controller only allows internal VNET traffic (i.e. endpoint is only accessible from within the VNET).

* A private DNS zone (e.g. `eastus.azurecontainerapps.io`) is created to resolve the private endpoints' DNS names. This private DNS zone is associated with the VNET's subnet ACA. We add the necessary A records to link the endpoint FQDN to the ACA's private IP address.

* A jumpbox VM is deployed to the VNET's VM subnet. This VM will be used in this demo to access the application's private endpoints.

## Walkthrough

## Summary

In this demo, we saw how Azure Load Testing can be used to generate load from within a virtual network to test private/restricted API endpoints.

## More Information

* [Troubleshooting private endpoints](https://docs.microsoft.com/en-us/azure/container-apps/troubleshoot-private-endpoints)
* [Test private endpoints by deploying Azure Load Testing in an Azure virtual network](https://learn.microsoft.com/en-us/azure/load-testing/how-to-test-private-endpoint)
* [Scenarios for deploying Azure Load Testing in a virtual network](https://learn.microsoft.com/en-us/azure/load-testing/concept-azure-load-testing-vnet-injection)
* [Blog Post: Load test endpoints with access restrictions using Azure Load Testing](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/load-test-endpoints-with-access-restrictions-using-azure-load/ba-p/3610412)
* [Blog Post: Load test private endpoints deployed in another Azure region or subscription](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/load-test-private-endpoints-deployed-in-another-azure-region-or/ba-p/3693277)
