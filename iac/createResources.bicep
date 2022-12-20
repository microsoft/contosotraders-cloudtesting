// common
targetScope = 'resourceGroup'

// parameters
////////////////////////////////////////////////////////////////////////////////

// common
@minLength(3)
@maxLength(6)
@description('A unique environment name (max 6 characters, alphanumeric only).')
param environment string

@secure()
@description('A password which will be set on all SQL Azure DBs.')
param sqlPassword string // @TODO: Obviously, we need to fix this!

param resourceLocation string = resourceGroup().location

// tenant
param tenantId string = subscription().tenantId

// aks
param aksLinuxAdminUsername string // value supplied via parameters file

param prefix string = 'contosotraders'

param prefixHyphenated string = 'contoso-traders'

// variables
////////////////////////////////////////////////////////////////////////////////

// key vault
var kvName = '${prefix}kv${environment}'
var kvSecretNameProductsApiEndpoint = 'productsApiEndpoint'
var kvSecretNameProductsDbConnStr = 'productsDbConnectionString'
var kvSecretNameProfilesDbConnStr = 'profilesDbConnectionString'
var kvSecretNameStocksDbConnStr = 'stocksDbConnectionString'
var kvSecretNameCartsApiEndpoint = 'cartsApiEndpoint'
var kvSecretNameCartsDbConnStr = 'cartsDbConnectionString'
var kvSecretNameImagesEndpoint = 'imagesEndpoint'
var kvSecretNameCognitiveServicesEndpoint = 'cognitiveServicesEndpoint'
var kvSecretNameCognitiveServicesAccountKey = 'cognitiveServicesAccountKey'
var kvSecretNameAppInsightsConnStr = 'appInsightsConnectionString'

// user-assigned managed identity (for key vault access)
var userAssignedMIForKVAccessName = '${prefixHyphenated}-mi-kv-access${environment}'

// cosmos db (stocks db)
var stocksDbAcctName = '${prefixHyphenated}-stocks${environment}'
var stocksDbName = 'stocksdb'
var stocksDbStocksContainerName = 'stocks'

// cosmos db (carts db)
var cartsDbAcctName = '${prefixHyphenated}-carts${environment}'
var cartsDbName = 'cartsdb'
var cartsDbStocksContainerName = 'carts'

// app service plan (products api)
var productsApiAppSvcPlanName = '${prefixHyphenated}-products${environment}'
var productsApiAppSvcName = '${prefixHyphenated}-products${environment}'
var productsApiSettingNameKeyVaultEndpoint = 'KeyVaultEndpoint'
var productsApiSettingNameManagedIdentityClientId = 'ManagedIdentityClientId'

// sql azure (products db)
var productsDbServerName = '${prefixHyphenated}-products${environment}'
var productsDbName = 'productsdb'
var productsDbServerAdminLogin = 'localadmin'
var productsDbServerAdminPassword = sqlPassword

// sql azure (profiles db)
var profilesDbServerName = '${prefixHyphenated}-profiles${environment}'
var profilesDbName = 'profilesdb'
var profilesDbServerAdminLogin = 'localadmin'
var profilesDbServerAdminPassword = sqlPassword

// azure container app (carts api)
var cartsApiAcaName = '${prefixHyphenated}-carts${environment}'
var cartsApiAcaEnvName = '${prefix}acaenv${environment}'
var cartsApiAcaSecretAcrPassword = 'acr-password'
var cartsApiAcaContainerDetailsName = '${prefixHyphenated}-carts${environment}'
var cartsApiSettingNameKeyVaultEndpoint = 'KeyVaultEndpoint'
var cartsApiSettingNameManagedIdentityClientId = 'ManagedIdentityClientId'


// storage account (product images)
var productImagesStgAccName = '${prefix}img${environment}'
var productImagesProductDetailsContainerName = 'product-details'
var productImagesProductListContainerName = 'product-list'

// storage account (old website)
var uiStgAccName = '${prefix}ui${environment}'

// storage account (new website)
var ui2StgAccName = '${prefix}ui2${environment}'

// storage account (image classifier)
var imageClassifierStgAccName = '${prefix}ic${environment}'
var imageClassifierWebsiteUploadsContainerName = 'website-uploads'

// cognitive service (image recognition)
var cognitiveServiceName = '${prefixHyphenated}-cs${environment}'

// cdn
var cdnProfileName = '${prefixHyphenated}-cdn${environment}'
var cdnImagesEndpointName = '${prefixHyphenated}-images${environment}'
var cdnUiEndpointName = '${prefixHyphenated}-ui${environment}'
var cdnUi2EndpointName = '${prefixHyphenated}-ui2${environment}'

// redis cache
var redisCacheName = '${prefixHyphenated}-cache${environment}'

// azure container registry
var acrName = '${prefix}acr${environment}'
// var acrCartsApiRepositoryName = '${prefix}apicarts' // @TODO: unused, probably remove later

// load testing service
var loadTestSvcName = '${prefixHyphenated}-loadtest${environment}'

// application insights
var logAnalyticsWorkspaceName = '${prefixHyphenated}-loganalytics${environment}'
var appInsightsName = '${prefixHyphenated}-ai${environment}'

// portal dashboard
var portalDashboardName = '${prefixHyphenated}-dashboard${environment}'

// aks cluster
var aksClusterName = '${prefixHyphenated}-aks${environment}'
var aksClusterDnsPrefix = '${prefixHyphenated}-aks${environment}'
var aksClusterNodeResourceGroup = '${prefixHyphenated}-aks-nodes-rg'

// tags
var resourceTags = {
  Product: prefixHyphenated
  Environment: 'testing'
}

// resources
////////////////////////////////////////////////////////////////////////////////

//
// key vault
//

resource kv 'Microsoft.KeyVault/vaults@2022-07-01' = {
  name: kvName
  location: resourceLocation
  tags: resourceTags
  properties: {
    // @TODO: Hack to enable temporary access to devs during local development/debugging.
    accessPolicies: [
      {
        objectId: '31de563b-fc1a-43a2-9031-c47630038328'
        tenantId: tenantId
        permissions: {
          secrets: [
            'get'
            'list'
            'delete'
            'set'
            'recover'
            'backup'
            'restore'
          ]
        }
      }
    ]
    sku: {
      family: 'A'
      name: 'standard'
    }
    softDeleteRetentionInDays: 7
    tenantId: tenantId
  }

  // secret
  resource kv_secretProductsApiEndpoint 'secrets' = {
    name: kvSecretNameProductsApiEndpoint
    tags: resourceTags
    properties: {
      contentType: 'endpoint url (fqdn) of the products api'
      value: 'placeholder' // Note: This will be set via github worfklow
    }
  }

  // secret 
  resource kv_secretProductsDbConnStr 'secrets' = {
    name: kvSecretNameProductsDbConnStr
    tags: resourceTags
    properties: {
      contentType: 'connection string to the products db'
      value: 'Server=tcp:${productsDbServerName}.database.windows.net,1433;Initial Catalog=${productsDbName};Persist Security Info=False;User ID=${productsDbServerAdminLogin};Password=${productsDbServerAdminPassword};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;' // @TODO: hack, fix later
    }
  }

  // secret 
  resource kv_secretProfilesDbConnStr 'secrets' = {
    name: kvSecretNameProfilesDbConnStr
    tags: resourceTags
    properties: {
      contentType: 'connection string to the profiles db'
      value: 'Server=tcp:${profilesDbServerName}.database.windows.net,1433;Initial Catalog=${profilesDbName};Persist Security Info=False;User ID=${profilesDbServerAdminLogin};Password=${profilesDbServerAdminPassword};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;' // @TODO: hack, fix later
    }
  }

  // secret 
  resource kv_secretStocksDbConnStr 'secrets' = {
    name: kvSecretNameStocksDbConnStr
    tags: resourceTags
    properties: {
      contentType: 'connection string to the stocks db'
      value: stocksdba.listConnectionStrings().connectionStrings[0].connectionString
    }
  }

  // secret
  resource kv_secretCartsApiEndpoint 'secrets' = {
    name: kvSecretNameCartsApiEndpoint
    tags: resourceTags
    properties: {
      contentType: 'endpoint url (fqdn) of the carts api'
      value: cartsapiaca.properties.configuration.ingress.fqdn
    }
  }

  // secret
  resource kv_secretCartsDbConnStr 'secrets' = {
    name: kvSecretNameCartsDbConnStr
    tags: resourceTags
    properties: {
      contentType: 'connection string to the carts db'
      value: cartsdba.listConnectionStrings().connectionStrings[0].connectionString
    }
  }

  // secret
  resource kv_secretImagesEndpoint 'secrets' = {
    name: kvSecretNameImagesEndpoint
    tags: resourceTags
    properties: {
      contentType: 'endpoint url of the images cdn'
      value: 'https://${cdnprofile_imagesendpoint.properties.hostName}'
    }
  }

  // secret
  resource kv_secretCognitiveServicesEndpoint 'secrets' = {
    name: kvSecretNameCognitiveServicesEndpoint
    tags: resourceTags
    properties: {
      contentType: 'endpoint url of the cognitive services'
      value: cognitiveservice.properties.endpoint
    }
  }

  // secret
  resource kv_secretCognitiveServicesAccountKey 'secrets' = {
    name: kvSecretNameCognitiveServicesAccountKey
    tags: resourceTags
    properties: {
      contentType: 'account key of the cognitive services'
      value: cognitiveservice.listKeys().key1
    }
  }

  // secret
  resource kv_secretAppInsightsConnStr 'secrets' = {
    name: kvSecretNameAppInsightsConnStr
    tags: resourceTags
    properties: {
      contentType: 'connection string to the app insights instance'
      value: appinsights.properties.ConnectionString
    }
  }

  // access policies
  resource kv_accesspolicies 'accessPolicies' = {
    name: 'replace'
    properties: {
      // @TODO: I was unable to figure out how to assign an access policy to the AKS cluster's agent pool's managed identity.
      // Hence, that specific access policy will be assigned from a github workflow (using AZ CLI).
      accessPolicies: [
        {
          tenantId: tenantId
          objectId: userassignedmiforkvaccess.properties.principalId
          permissions: {
            secrets: [ 'get', 'list' ]
          }
        }
        {
          tenantId: tenantId
          objectId: aks.properties.identityProfile.kubeletidentity.objectId
          permissions: {
            secrets: [ 'get', 'list' ]
          }
        }
      ]
    }
  }
}

resource userassignedmiforkvaccess 'Microsoft.ManagedIdentity/userAssignedIdentities@2022-01-31-preview' = {
  name: userAssignedMIForKVAccessName
  location: resourceLocation
  tags: resourceTags
}

//
// stocks db
//

// cosmos db account
resource stocksdba 'Microsoft.DocumentDB/databaseAccounts@2022-02-15-preview' = {
  name: stocksDbAcctName
  location: resourceLocation
  tags: resourceTags
  properties: {
    databaseAccountOfferType: 'Standard'
    enableFreeTier: false
    capabilities: [
      {
        name: 'EnableServerless'
      }
    ]
    locations: [
      {
        locationName: resourceLocation
      }
    ]
  }

  // cosmos db database
  resource stocksdba_db 'sqlDatabases' = {
    name: stocksDbName
    location: resourceLocation
    tags: resourceTags
    properties: {
      resource: {
        id: stocksDbName
      }
    }

    // cosmos db collection
    resource stocksdba_db_c1 'containers' = {
      name: stocksDbStocksContainerName
      location: resourceLocation
      tags: resourceTags
      properties: {
        resource: {
          id: stocksDbStocksContainerName
          partitionKey: {
            paths: [
              '/id'
            ]
          }
        }
      }
    }
  }
}

//
// carts db
//

// cosmos db account
resource cartsdba 'Microsoft.DocumentDB/databaseAccounts@2022-02-15-preview' = {
  name: cartsDbAcctName
  location: resourceLocation
  tags: resourceTags
  properties: {
    databaseAccountOfferType: 'Standard'
    enableFreeTier: false
    capabilities: [
      {
        name: 'EnableServerless'
      }
    ]
    locations: [
      {
        locationName: resourceLocation
      }
    ]
  }

  // cosmos db database
  resource cartsdba_db 'sqlDatabases' = {
    name: cartsDbName
    location: resourceLocation
    tags: resourceTags
    properties: {
      resource: {
        id: cartsDbName
      }
    }

    // cosmos db collection
    resource cartsdba_db_c1 'containers' = {
      name: cartsDbStocksContainerName
      location: resourceLocation
      tags: resourceTags
      properties: {
        resource: {
          id: cartsDbStocksContainerName
          partitionKey: {
            paths: [
              '/Email'
            ]
          }
        }
      }
    }
  }
}

//
// products api
//

// app service plan (linux)
resource productsapiappsvcplan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: productsApiAppSvcPlanName
  location: resourceLocation
  tags: resourceTags
  sku: {
    name: 'B1'
  }
  properties: {
    reserved: true
  }
  kind: 'linux'
}

// app service
resource productsapiappsvc 'Microsoft.Web/sites@2022-03-01' = {
  name: productsApiAppSvcName
  location: resourceLocation
  tags: resourceTags
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${userassignedmiforkvaccess.id}': {
      }
    }
  }
  properties: {
    clientAffinityEnabled: false
    httpsOnly: true
    serverFarmId: productsapiappsvcplan.id
    siteConfig: {
      linuxFxVersion: 'DOTNETCORE|6.0'
      alwaysOn: true
      appSettings: [
        {
          name: productsApiSettingNameKeyVaultEndpoint
          value: kv.properties.vaultUri
        }
        {
          name: productsApiSettingNameManagedIdentityClientId
          value: userassignedmiforkvaccess.properties.clientId
        }
      ]
    }
  }
}

//
// products db
//

// sql azure server
resource productsdbsrv 'Microsoft.Sql/servers@2022-05-01-preview' = {
  name: productsDbServerName
  location: resourceLocation
  tags: resourceTags
  properties: {
    administratorLogin: productsDbServerAdminLogin
    administratorLoginPassword: productsDbServerAdminPassword
    publicNetworkAccess: 'Enabled'
  }

  // sql azure database
  resource productsdbsrv_db 'databases' = {
    name: productsDbName
    location: resourceLocation
    tags: resourceTags
    sku: {
      capacity: 5
      tier: 'Basic'
      name: 'Basic'
    }
  }

  // sql azure firewall rule (allow access from all azure resources/services)
  resource productsdbsrv_db_fwlallowazureresources 'firewallRules' = {
    name: 'AllowAllWindowsAzureIps'
    properties: {
      endIpAddress: '0.0.0.0'
      startIpAddress: '0.0.0.0'
    }
  }

  // @TODO: Hack to enable temporary access to devs during local development/debugging.
  resource productsdbsrv_db_fwllocaldev 'firewallRules' = {
    name: 'AllowLocalDevelopment'
    properties: {
      endIpAddress: '255.255.255.255'
      startIpAddress: '0.0.0.0'
    }
  }
}

//
// profiles db
//

// sql azure server
resource profilesdbsrv 'Microsoft.Sql/servers@2022-05-01-preview' = {
  name: profilesDbServerName
  location: resourceLocation
  tags: resourceTags
  properties: {
    administratorLogin: profilesDbServerAdminLogin
    administratorLoginPassword: profilesDbServerAdminPassword
    publicNetworkAccess: 'Enabled'
  }

  // sql azure database
  resource profilesdbsrv_db 'databases' = {
    name: profilesDbName
    location: resourceLocation
    tags: resourceTags
    sku: {
      capacity: 5
      tier: 'Basic'
      name: 'Basic'
    }
  }

  // sql azure firewall rule (allow access from all azure resources/services)
  resource profilesdbsrv_db_fwl 'firewallRules' = {
    name: 'AllowAllWindowsAzureIps'
    properties: {
      endIpAddress: '0.0.0.0'
      startIpAddress: '0.0.0.0'
    }
  }
}

//
// carts api
//

// aca environment
resource cartsapiacaenv 'Microsoft.App/managedEnvironments@2022-06-01-preview' = {
  name: cartsApiAcaEnvName
  location: resourceLocation
  tags: resourceTags
  sku: {
    name: 'Consumption'
  }
  properties: {
    zoneRedundant: false
  }
}

// aca
resource cartsapiaca 'Microsoft.App/containerApps@2022-06-01-preview' = {
  name: cartsApiAcaName
  location: resourceLocation
  tags: resourceTags
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${userassignedmiforkvaccess.id}': {
      }
    }
  }
  properties: {
    configuration: {
      activeRevisionsMode: 'Single'
      ingress: {
        external: true
        allowInsecure: false
        targetPort: 80
        traffic: [
          {
            latestRevision: true
            weight: 100
          }
        ]
      }
      registries: [
        {
          passwordSecretRef: cartsApiAcaSecretAcrPassword
          server: acr.properties.loginServer
          username: acr.name
        }
      ]
      secrets: [
        {
          name: cartsApiAcaSecretAcrPassword
          value: acr.listCredentials().passwords[0].value
        }
      ]
    }
    environmentId: cartsapiacaenv.id
    template: {
      scale: {
        minReplicas: 0
        maxReplicas: 4
        rules: [
          {
            name: 'http-scaling-rule'
            http: {
              metadata: {
                concurrentRequests: '3'
              }
            }
          }
        ]
      }
      containers: [
        {
          env: [
            {
              name: cartsApiSettingNameKeyVaultEndpoint
              value: kv.properties.vaultUri
            }
            {
              name: cartsApiSettingNameManagedIdentityClientId
              value: userassignedmiforkvaccess.properties.clientId
            }
          ]
          // using a public image initially because no images have been pushed to our private ACR yet
          // at this point. At a later point, our github workflow will update the ACA app to use the 
          // images from our private ACR.
          image: 'mcr.microsoft.com/azuredocs/containerapps-helloworld:latest'
          name: cartsApiAcaContainerDetailsName
          resources: {
            cpu: json('0.5')
            memory: '1.0Gi'
          }
        }
      ]
    }
  }
}

//
// product images
//

// storage account (product images)
resource productimagesstgacc 'Microsoft.Storage/storageAccounts@2022-05-01' = {
  name: productImagesStgAccName
  location: resourceLocation
  tags: resourceTags
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'

  // blob service
  resource productimagesstgacc_blobsvc 'blobServices' = {
    name: 'default'

    // container
    resource productimagesstgacc_blobsvc_productdetailscontainer 'containers' = {
      name: productImagesProductDetailsContainerName
      properties: {
        publicAccess: 'Container'
      }
    }

    // container
    resource productimagesstgacc_blobsvc_productlistcontainer 'containers' = {
      name: productImagesProductListContainerName
      properties: {
        publicAccess: 'Container'
      }
    }
  }
}

//
// main website / ui
// new website / ui
//

// storage account (main website)
resource uistgacc 'Microsoft.Storage/storageAccounts@2022-05-01' = {
  name: uiStgAccName
  location: resourceLocation
  tags: resourceTags
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'

  // blob service
  resource uistgacc_blobsvc 'blobServices' = {
    name: 'default'
  }
}

resource uistgacc_mi 'Microsoft.ManagedIdentity/userAssignedIdentities@2022-01-31-preview' = {
  name: 'DeploymentScript'
  location: resourceLocation
  tags: resourceTags
}

resource uistgacc_roledefinition 'Microsoft.Authorization/roleDefinitions@2022-04-01' existing = {
  scope: subscription()
  // This is the Storage Account Contributor role, which is the minimum role permission we can give. 
  // See https://docs.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#:~:text=17d1049b-9a84-46fb-8f53-869881c3d3ab
  name: '17d1049b-9a84-46fb-8f53-869881c3d3ab'
}

// @TODO: Unfortunately, this requires the service principal to be in the owner role for the subscription.
// This is just a temporary mitigation, and needs to be fixed using a custom role.
// Details: https://learn.microsoft.com/en-us/answers/questions/287573/authorization-failed-when-when-writing-a-roleassig.html
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: uistgacc
  name: guid(resourceGroup().id, uistgacc_mi.id, uistgacc_roledefinition.id)
  properties: {
    roleDefinitionId: uistgacc_roledefinition.id
    principalId: uistgacc_mi.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

resource deploymentScript 'Microsoft.Resources/deploymentScripts@2020-10-01' = {
  name: 'DeploymentScript'
  location: resourceLocation
  kind: 'AzurePowerShell'
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${uistgacc_mi.id}': {
      }
    }
  }
  dependsOn: [
    // we need to ensure we wait for the role assignment to be deployed before trying to access the storage account
    roleAssignment
  ]
  properties: {
    azPowerShellVersion: '3.0'
    scriptContent: loadTextContent('./scripts/enable-static-website.ps1')
    retentionInterval: 'PT4H'
    environmentVariables: [
      {
        name: 'ResourceGroupName'
        value: resourceGroup().name
      }
      {
        name: 'StorageAccountName'
        value: uistgacc.name
      }
    ]
  }
}

// storage account (new website)
resource ui2stgacc 'Microsoft.Storage/storageAccounts@2022-05-01' = {
  name: ui2StgAccName
  location: resourceLocation
  tags: resourceTags
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'

  // blob service
  resource ui2stgacc_blobsvc 'blobServices' = {
    name: 'default'
  }
}

resource ui2stgacc_mi 'Microsoft.ManagedIdentity/userAssignedIdentities@2022-01-31-preview' = {
  name: 'DeploymentScript2'
  location: resourceLocation
  tags: resourceTags
}

resource ui2stgacc_roledefinition 'Microsoft.Authorization/roleDefinitions@2022-04-01' existing = {
  scope: subscription()
  // This is the Storage Account Contributor role, which is the minimum role permission we can give. 
  // See https://docs.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#:~:text=17d1049b-9a84-46fb-8f53-869881c3d3ab
  name: '17d1049b-9a84-46fb-8f53-869881c3d3ab'
}

// @TODO: Unfortunately, this requires the service principal to be in the owner role for the subscription.
// This is just a temporary mitigation, and needs to be fixed using a custom role.
// Details: https://learn.microsoft.com/en-us/answers/questions/287573/authorization-failed-when-when-writing-a-roleassig.html
resource roleAssignment2 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: ui2stgacc
  name: guid(resourceGroup().id, ui2stgacc_mi.id, ui2stgacc_roledefinition.id)
  properties: {
    roleDefinitionId: ui2stgacc_roledefinition.id
    principalId: ui2stgacc_mi.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

resource deploymentScript2 'Microsoft.Resources/deploymentScripts@2020-10-01' = {
  name: 'DeploymentScript2'
  location: resourceLocation
  kind: 'AzurePowerShell'
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${ui2stgacc_mi.id}': {
      }
    }
  }
  dependsOn: [
    // we need to ensure we wait for the role assignment to be deployed before trying to access the storage account
    roleAssignment
  ]
  properties: {
    azPowerShellVersion: '3.0'
    scriptContent: loadTextContent('./scripts/enable-static-website.ps1')
    retentionInterval: 'PT4H'
    environmentVariables: [
      {
        name: 'ResourceGroupName'
        value: resourceGroup().name
      }
      {
        name: 'StorageAccountName'
        value: ui2stgacc.name
      }
    ]
  }
}

//
// image classifier
//

// storage account (main website)
resource imageclassifierstgacc 'Microsoft.Storage/storageAccounts@2022-05-01' = {
  name: imageClassifierStgAccName
  location: resourceLocation
  tags: resourceTags
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'

  // blob service
  resource imageclassifierstgacc_blobsvc 'blobServices' = {
    name: 'default'

    // container
    resource uistgacc_blobsvc_websiteuploadscontainer 'containers' = {
      name: imageClassifierWebsiteUploadsContainerName
      properties: {
        publicAccess: 'Container'
      }
    }
  }
}

//
// cognitive services (image recognition)
// 

resource cognitiveservice 'Microsoft.CognitiveServices/accounts@2022-10-01' = {
  name: cognitiveServiceName
  location: resourceLocation
  tags: resourceTags
  sku: {
    name: 'S0'
  }
  kind: 'CognitiveServices'
  properties: {
    publicNetworkAccess: 'Enabled'
  }
}

//
// cdn
//

resource cdnprofile 'Microsoft.Cdn/profiles@2022-05-01-preview' = {
  name: cdnProfileName
  location: 'global'
  tags: resourceTags
  sku: {
    name: 'Standard_Microsoft'
  }
}

// endpoint (product images)
resource cdnprofile_imagesendpoint 'Microsoft.Cdn/profiles/endpoints@2022-05-01-preview' = {
  name: cdnImagesEndpointName
  location: 'global'
  tags: resourceTags
  parent: cdnprofile
  properties: {
    isCompressionEnabled: true
    contentTypesToCompress: [
      'image/svg+xml'
    ]
    deliveryPolicy: {
      rules: [
        {
          name: 'Global'
          order: 0
          actions: [
            {
              name: 'CacheExpiration'
              parameters: {
                typeName: 'DeliveryRuleCacheExpirationActionParameters'
                cacheBehavior: 'SetIfMissing'
                cacheType: 'All'
                cacheDuration: '10:00:00'
              }
            }
          ]
        }
      ]
    }
    originHostHeader: '${productImagesStgAccName}.blob.core.windows.net' // @TODO: Hack, fix later
    origins: [
      {
        name: '${productImagesStgAccName}-blob-core-windows-net' // @TODO: Hack, fix later
        properties: {
          hostName: '${productImagesStgAccName}.blob.core.windows.net' // @TODO: Hack, fix later
          originHostHeader: '${productImagesStgAccName}.blob.core.windows.net' // @TODO: Hack, fix later
        }
      }
    ]
  }
}

// endpoint (ui / old website)
resource cdnprofile_uiendpoint 'Microsoft.Cdn/profiles/endpoints@2022-05-01-preview' = {
  name: cdnUiEndpointName
  location: 'global'
  tags: resourceTags
  parent: cdnprofile
  properties: {
    isCompressionEnabled: true
    contentTypesToCompress: [
      'application/eot'
      'application/font'
      'application/font-sfnt'
      'application/javascript'
      'application/json'
      'application/opentype'
      'application/otf'
      'application/pkcs7-mime'
      'application/truetype'
      'application/ttf'
      'application/vnd.ms-fontobject'
      'application/xhtml+xml'
      'application/xml'
      'application/xml+rss'
      'application/x-font-opentype'
      'application/x-font-truetype'
      'application/x-font-ttf'
      'application/x-httpd-cgi'
      'application/x-javascript'
      'application/x-mpegurl'
      'application/x-opentype'
      'application/x-otf'
      'application/x-perl'
      'application/x-ttf'
      'font/eot'
      'font/ttf'
      'font/otf'
      'font/opentype'
      'image/svg+xml'
      'text/css'
      'text/csv'
      'text/html'
      'text/javascript'
      'text/js'
      'text/plain'
      'text/richtext'
      'text/tab-separated-values'
      'text/xml'
      'text/x-script'
      'text/x-component'
      'text/x-java-source'
    ]
    deliveryPolicy: {
      rules: [
        {
          name: 'Global'
          order: 0
          actions: [
            {
              name: 'CacheExpiration'
              parameters: {
                typeName: 'DeliveryRuleCacheExpirationActionParameters'
                cacheBehavior: 'SetIfMissing'
                cacheType: 'All'
                cacheDuration: '10:00:00'
              }
            }
          ]
        }
      ]
    }
    originHostHeader: '${uiStgAccName}.z13.web.core.windows.net' // @TODO: Hack, fix later
    origins: [
      {
        name: '${uiStgAccName}-z13-web-core-windows-net' // @TODO: Hack, fix later
        properties: {
          hostName: '${uiStgAccName}.z13.web.core.windows.net' // @TODO: Hack, fix later
          originHostHeader: '${uiStgAccName}.z13.web.core.windows.net' // @TODO: Hack, fix later
        }
      }
    ]
  }
}

// endpoint (ui / new website)
resource cdnprofile_ui2endpoint 'Microsoft.Cdn/profiles/endpoints@2022-05-01-preview' = {
  name: cdnUi2EndpointName
  location: 'global'
  tags: resourceTags
  parent: cdnprofile
  properties: {
    isCompressionEnabled: true
    contentTypesToCompress: [
      'application/eot'
      'application/font'
      'application/font-sfnt'
      'application/javascript'
      'application/json'
      'application/opentype'
      'application/otf'
      'application/pkcs7-mime'
      'application/truetype'
      'application/ttf'
      'application/vnd.ms-fontobject'
      'application/xhtml+xml'
      'application/xml'
      'application/xml+rss'
      'application/x-font-opentype'
      'application/x-font-truetype'
      'application/x-font-ttf'
      'application/x-httpd-cgi'
      'application/x-javascript'
      'application/x-mpegurl'
      'application/x-opentype'
      'application/x-otf'
      'application/x-perl'
      'application/x-ttf'
      'font/eot'
      'font/ttf'
      'font/otf'
      'font/opentype'
      'image/svg+xml'
      'text/css'
      'text/csv'
      'text/html'
      'text/javascript'
      'text/js'
      'text/plain'
      'text/richtext'
      'text/tab-separated-values'
      'text/xml'
      'text/x-script'
      'text/x-component'
      'text/x-java-source'
    ]
    deliveryPolicy: {
      rules: [
        {
          name: 'Global'
          order: 0
          actions: [
            {
              name: 'CacheExpiration'
              parameters: {
                typeName: 'DeliveryRuleCacheExpirationActionParameters'
                cacheBehavior: 'SetIfMissing'
                cacheType: 'All'
                cacheDuration: '02:00:00'
              }
            }
          ]
        }
        {
          name: 'EnforceHttps'
          order: 1
          conditions: [
            {
              name: 'RequestScheme'
              parameters: {
                typeName: 'DeliveryRuleRequestSchemeConditionParameters'
                matchValues: [
                  'HTTP'
                ]
                operator: 'Equal'
                negateCondition: false
                transforms: []
              }
            }
          ]
          actions: [
            {
              name: 'UrlRedirect'
              parameters: {
                typeName: 'DeliveryRuleUrlRedirectActionParameters'
                redirectType: 'Found'
                destinationProtocol: 'Https'
              }
            }
          ]
        }
      ]
    }
    originHostHeader: '${ui2StgAccName}.z13.web.core.windows.net' // @TODO: Hack, fix later
    origins: [
      {
        name: '${ui2StgAccName}-z13-web-core-windows-net' // @TODO: Hack, fix later
        properties: {
          hostName: '${ui2StgAccName}.z13.web.core.windows.net' // @TODO: Hack, fix later
          originHostHeader: '${ui2StgAccName}.z13.web.core.windows.net' // @TODO: Hack, fix later
        }
      }
    ]
  }
}

//
// redis cache
//

resource rediscache 'Microsoft.Cache/redis@2022-06-01' = {
  name: redisCacheName
  location: resourceLocation
  tags: resourceTags
  properties: {
    sku: {
      capacity: 0
      family: 'C'
      name: 'Basic'
    }
  }
}

//
// container registry
//

resource acr 'Microsoft.ContainerRegistry/registries@2022-02-01-preview' = {
  name: acrName
  location: resourceLocation
  tags: resourceTags
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: true
    publicNetworkAccess: 'Enabled'
  }
}

//
// load testing service
//

resource loadtestsvc 'Microsoft.LoadTestService/loadTests@2022-12-01' = {
  name: loadTestSvcName
  location: resourceLocation
  tags: resourceTags
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${userassignedmiforkvaccess.id}': {
      }
    }
  }
}

//
// application insights
//

// log analytics workspace
resource loganalyticsworkspace 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: logAnalyticsWorkspaceName
  location: resourceLocation
  tags: resourceTags
  properties: {
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
    sku: {
      name: 'PerGB2018' // pay-as-you-go
    }
  }
}

// app insights instance
resource appinsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: resourceLocation
  tags: resourceTags
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: loganalyticsworkspace.id
  }
}

//
// portal dashboard
//

resource dashboard 'Microsoft.Portal/dashboards@2020-09-01-preview' = {
  name: portalDashboardName
  location: resourceLocation
  tags: resourceTags
  properties: {
    lenses: [
      {
        order: 0
        parts: [
          {
            position: {
              x: 0
              y: 0
              rowSpan: 4
              colSpan: 2
            }
          }
        ]
      }
    ]
  }
}

//
// aks cluster
//

resource aks 'Microsoft.ContainerService/managedClusters@2022-09-02-preview' = {
  name: aksClusterName
  location: resourceLocation
  tags: resourceTags
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    dnsPrefix: aksClusterDnsPrefix
    nodeResourceGroup: aksClusterNodeResourceGroup
    agentPoolProfiles: [
      {
        name: 'agentpool'
        osDiskSizeGB: 0 // Specifying 0 will apply the default disk size for that agentVMSize.
        count: 3
        vmSize: 'standard_d2s_v3'
        osType: 'Linux'
        mode: 'System'
      }
    ]
    linuxProfile: {
      adminUsername: aksLinuxAdminUsername
      ssh: {
        publicKeys: [
          {
            keyData: loadTextContent('rsa.pub') // @TODO: temporary hack, until we autogen the keys
          }
        ]
      }
    }
    addonProfiles: {
      omsagent: {
        enabled: true
        config: {
          logAnalyticsWorkspaceResourceID: loganalyticsworkspace.id
        }
      }
    }
  }
}

// outputs
////////////////////////////////////////////////////////////////////////////////
