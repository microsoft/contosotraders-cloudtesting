// common
targetScope = 'resourceGroup'

// parameters
////////////////////////////////////////////////////////////////////////////////

// common
@minLength(3)
@maxLength(6)
@description('A unique environment suffix (max 6 characters, alphanumeric only).')
param suffix string

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

// sql
param sqlServerHostName string = environment().suffixes.sqlServerHostname

// use param to conditionally deploy private endpoint resources
param deployPrivateEndpoints bool = false

// variables
////////////////////////////////////////////////////////////////////////////////

// key vault
var kvName = '${prefix}kv${suffix}'
var kvSecretNameProductsApiEndpoint = 'productsApiEndpoint'
var kvSecretNameProductsDbConnStr = 'productsDbConnectionString'
var kvSecretNameProfilesDbConnStr = 'profilesDbConnectionString'
var kvSecretNameStocksDbConnStr = 'stocksDbConnectionString'
var kvSecretNameCartsApiEndpoint = 'cartsApiEndpoint'
var kvSecretNameCartsInternalApiEndpoint = 'cartsInternalApiEndpoint'
var kvSecretNameCartsDbConnStr = 'cartsDbConnectionString'
var kvSecretNameImagesEndpoint = 'imagesEndpoint'
var kvSecretNameAppInsightsConnStr = 'appInsightsConnectionString'
var kvSecretNameUiCdnEndpoint = 'uiCdnEndpoint'
var kvSecretNameVnetAcaSubnetId = 'vnetAcaSubnetId'

// user-assigned managed identity (for key vault access)
var userAssignedMIForKVAccessName = '${prefixHyphenated}-mi-kv-access${suffix}'

// cosmos db (stocks db)
var stocksDbAcctName = '${prefixHyphenated}-stocks${suffix}'
var stocksDbName = 'stocksdb'
var stocksDbStocksContainerName = 'stocks'

// cosmos db (carts db)
var cartsDbAcctName = '${prefixHyphenated}-carts${suffix}'
var cartsDbName = 'cartsdb'
var cartsDbStocksContainerName = 'carts'

// app service plan (products api)
var productsApiAppSvcPlanName = '${prefixHyphenated}-products${suffix}'
var productsApiAppSvcName = '${prefixHyphenated}-products${suffix}'
var productsApiSettingNameKeyVaultEndpoint = 'KeyVaultEndpoint'
var productsApiSettingNameManagedIdentityClientId = 'ManagedIdentityClientId'

// sql azure (products db)
var productsDbServerName = '${prefixHyphenated}-products${suffix}'
var productsDbName = 'productsdb'
var productsDbServerAdminLogin = 'localadmin'
var productsDbServerAdminPassword = sqlPassword

// sql azure (profiles db)
var profilesDbServerName = '${prefixHyphenated}-profiles${suffix}'
var profilesDbName = 'profilesdb'
var profilesDbServerAdminLogin = 'localadmin'
var profilesDbServerAdminPassword = sqlPassword

// azure container app (carts api)
var cartsApiAcaName = '${prefixHyphenated}-carts${suffix}'
var cartsApiAcaEnvName = '${prefix}acaenv${suffix}'
var cartsApiAcaSecretAcrPassword = 'acr-password'
var cartsApiAcaContainerDetailsName = '${prefixHyphenated}-carts${suffix}'
var cartsApiSettingNameKeyVaultEndpoint = 'KeyVaultEndpoint'
var cartsApiSettingNameManagedIdentityClientId = 'ManagedIdentityClientId'

// azure container app (carts api - internal only)
var cartsInternalApiAcaName = '${prefixHyphenated}-intcarts${suffix}'
var cartsInternalApiAcaEnvName = '${prefix}intacaenv${suffix}'
var cartsInternalApiAcaSecretAcrPassword = 'acr-password'
var cartsInternalApiAcaContainerDetailsName = '${prefixHyphenated}-intcarts${suffix}'
var cartsInternalApiSettingNameKeyVaultEndpoint = 'KeyVaultEndpoint'
var cartsInternalApiSettingNameManagedIdentityClientId = 'ManagedIdentityClientId'

// storage account (product images)
var productImagesStgAccName = '${prefix}img${suffix}'
var productImagesProductDetailsContainerName = 'product-details'
var productImagesProductListContainerName = 'product-list'

// storage account (old website)
var uiStgAccName = '${prefix}ui${suffix}'

// storage account (new website)
var ui2StgAccName = '${prefix}ui2${suffix}'

// storage account (image classifier)
var imageClassifierStgAccName = '${prefix}ic${suffix}'
var imageClassifierWebsiteUploadsContainerName = 'website-uploads'

// cdn
var cdnProfileName = '${prefixHyphenated}-cdn${suffix}'
var cdnImagesEndpointName = '${prefixHyphenated}-images${suffix}'
var cdnUiEndpointName = '${prefixHyphenated}-ui${suffix}'
var cdnUi2EndpointName = '${prefixHyphenated}-ui2${suffix}'

// azure container registry
var acrName = '${prefix}acr${suffix}'

// load testing service
var loadTestSvcName = '${prefixHyphenated}-loadtest${suffix}'

// application insights
var logAnalyticsWorkspaceName = '${prefixHyphenated}-loganalytics${suffix}'
var appInsightsName = '${prefixHyphenated}-ai${suffix}'

// portal dashboard
var portalDashboardName = '${prefixHyphenated}-dashboard${suffix}'

// aks cluster
var aksClusterName = '${prefixHyphenated}-aks${suffix}'
var aksClusterDnsPrefix = '${prefixHyphenated}-aks${suffix}'
var aksClusterNodeResourceGroup = '${prefixHyphenated}-aks-nodes-rg${suffix}'

// virtual network
var vnetName = '${prefixHyphenated}-vnet${suffix}'
var vnetAddressSpace = '10.0.0.0/16'
var vnetAcaSubnetName = 'subnet-aca'
var vnetAcaSubnetAddressPrefix = '10.0.0.0/23'
var vnetVmSubnetName = 'subnet-vm'
var vnetVmSubnetAddressPrefix = '10.0.2.0/23'
var vnetLoadTestSubnetName = 'subnet-loadtest'
var vnetLoadTestSubnetAddressPrefix = '10.0.4.0/23'

// jumpbox vm
var jumpboxPublicIpName = '${prefixHyphenated}-jumpbox${suffix}'
var jumpboxNsgName = '${prefixHyphenated}-jumpbox${suffix}'
var jumpboxNicName = '${prefixHyphenated}-jumpbox${suffix}'
var jumpboxVmName = 'jumpboxvm'
var jumpboxVmAdminLogin = 'localadmin'
var jumpboxVmAdminPassword = sqlPassword
var jumpboxVmShutdownSchduleName = 'shutdown-computevm-jumpboxvm'
var jumpboxVmShutdownScheduleTimezoneId = 'UTC'

// private dns zone
var privateDnsZoneVnetLinkName = '${prefixHyphenated}-privatednszone-vnet-link${suffix}'

// chaos studio
var chaosKvExperimentName = '${prefixHyphenated}-chaos-kv-experiment${suffix}'
var chaosKvSelectorId = guid('${prefixHyphenated}-chaos-kv-selector-id${suffix}')
var chaosAksExperimentName = '${prefixHyphenated}-chaos-aks-experiment${suffix}'
var chaosAksSelectorId = guid('${prefixHyphenated}-chaos-aks-selector-id${suffix}')

// tags
var resourceTags = {
  Product: prefixHyphenated
  Environment: suffix
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
      value: 'Server=tcp:${productsDbServerName}${sqlServerHostName},1433;Initial Catalog=${productsDbName};Persist Security Info=False;User ID=${productsDbServerAdminLogin};Password=${productsDbServerAdminPassword};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;'
    }
  }

  // secret 
  resource kv_secretProfilesDbConnStr 'secrets' = {
    name: kvSecretNameProfilesDbConnStr
    tags: resourceTags
    properties: {
      contentType: 'connection string to the profiles db'
      value: 'Server=tcp:${profilesDbServerName}${sqlServerHostName},1433;Initial Catalog=${profilesDbName};Persist Security Info=False;User ID=${profilesDbServerAdminLogin};Password=${profilesDbServerAdminPassword};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;'
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
  resource kv_secretCartsInternalApiEndpoint 'secrets' = if (deployPrivateEndpoints) {
    name: kvSecretNameCartsInternalApiEndpoint
    tags: resourceTags
    properties: {
      contentType: 'endpoint url (fqdn) of the (internal) carts api'
      value: deployPrivateEndpoints ? cartsinternalapiaca.properties.configuration.ingress.fqdn : ''
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
  resource kv_secretAppInsightsConnStr 'secrets' = {
    name: kvSecretNameAppInsightsConnStr
    tags: resourceTags
    properties: {
      contentType: 'connection string to the app insights instance'
      value: appinsights.properties.ConnectionString
    }
  }

  // secret
  resource kv_secretUiCdnEndpoint 'secrets' = {
    name: kvSecretNameUiCdnEndpoint
    tags: resourceTags
    properties: {
      contentType: 'endpoint url (cdn endpoint) of the ui'
      value: cdnprofile_ui2endpoint.properties.hostName
    }
  }

  // secret
  resource kv_secretVnetAcaSubnetId 'secrets' = {
    name: kvSecretNameVnetAcaSubnetId
    tags: resourceTags
    properties: {
      contentType: 'subnet id of the aca subnet'
      value: vnet.properties.subnets[0].id
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

resource kv_roledefinitionforchaosexp 'Microsoft.Authorization/roleDefinitions@2022-04-01' existing = {
  scope: kv
  // This is the Key Vault Contributor role
  // See https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#key-vault-contributor
  name: 'f25e0fa2-a7c8-4377-a976-54943a77a395'
}

resource kv_roleassignmentforchaosexp 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: kv
  name: guid(kv.id, chaoskvexperiment.id, kv_roledefinitionforchaosexp.id)
  properties: {
    roleDefinitionId: kv_roledefinitionforchaosexp.id
    principalId: chaoskvexperiment.identity.principalId
    principalType: 'ServicePrincipal'
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
resource stocksdba 'Microsoft.DocumentDB/databaseAccounts@2022-08-15' = {
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
resource cartsdba 'Microsoft.DocumentDB/databaseAccounts@2022-08-15' = {
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
      '${userassignedmiforkvaccess.id}': {}
    }
  }
  properties: {
    clientAffinityEnabled: false
    httpsOnly: true
    serverFarmId: productsapiappsvcplan.id
    siteConfig: {
      linuxFxVersion: 'DOTNETCORE|7.0'
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
      '${userassignedmiforkvaccess.id}': {}
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
        minReplicas: 1
        maxReplicas: 10
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
resource productimagesstgacc 'Microsoft.Storage/storageAccounts@2022-09-01' = {
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
resource uistgacc 'Microsoft.Storage/storageAccounts@2022-09-01' = {
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

// This requires the service principal to be in 'owner' role or a custom role with 'Microsoft.Authorization/roleAssignments/write' permissions.
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
      '${uistgacc_mi.id}': {}
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

// This requires the service principal to be in 'owner' role or a custom role with 'Microsoft.Authorization/roleAssignments/write' permissions.
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
      '${ui2stgacc_mi.id}': {}
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
resource imageclassifierstgacc 'Microsoft.Storage/storageAccounts@2022-09-01' = {
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
// cdn
//

resource cdnprofile 'Microsoft.Cdn/profiles@2022-11-01-preview' = {
  name: cdnProfileName
  location: 'global'
  tags: resourceTags
  sku: {
    name: 'Standard_Microsoft'
  }
}

// endpoint (product images)
resource cdnprofile_imagesendpoint 'Microsoft.Cdn/profiles/endpoints@2022-11-01-preview' = {
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
    originHostHeader: replace(replace(productimagesstgacc.properties.primaryEndpoints.blob, 'https://', ''), '/', '')
    origins: [
      {
        name: replace(replace(replace(productimagesstgacc.properties.primaryEndpoints.blob, 'https://', ''), '/', ''), '.', '-')
        properties: {
          hostName: replace(replace(productimagesstgacc.properties.primaryEndpoints.blob, 'https://', ''), '/', '')
          originHostHeader: replace(replace(productimagesstgacc.properties.primaryEndpoints.blob, 'https://', ''), '/', '')
        }
      }
    ]
  }
}

// endpoint (ui / old website)
resource cdnprofile_uiendpoint 'Microsoft.Cdn/profiles/endpoints@2022-11-01-preview' = {
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
    originHostHeader: replace(replace(uistgacc.properties.primaryEndpoints.web, 'https://', ''), '/', '')
    origins: [
      {
        name: replace(replace(replace(uistgacc.properties.primaryEndpoints.web, 'https://', ''), '/', ''), '.', '-')
        properties: {
          hostName: replace(replace(uistgacc.properties.primaryEndpoints.web, 'https://', ''), '/', '')
          originHostHeader: replace(replace(uistgacc.properties.primaryEndpoints.web, 'https://', ''), '/', '')
        }
      }
    ]
  }
}

// endpoint (ui / new website)
resource cdnprofile_ui2endpoint 'Microsoft.Cdn/profiles/endpoints@2022-11-01-preview' = {
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
    originHostHeader: replace(replace(ui2stgacc.properties.primaryEndpoints.web, 'https://', ''), '/', '')
    origins: [
      {
        name: replace(replace(replace(ui2stgacc.properties.primaryEndpoints.web, 'https://', ''), '/', ''), '.', '-')
        properties: {
          hostName: replace(replace(ui2stgacc.properties.primaryEndpoints.web, 'https://', ''), '/', '')
          originHostHeader: replace(replace(ui2stgacc.properties.primaryEndpoints.web, 'https://', ''), '/', '')
        }
      }
    ]
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
      '${userassignedmiforkvaccess.id}': {}
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

resource aks 'Microsoft.ContainerService/managedClusters@2022-10-02-preview' = {
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
        count: 1
        vmSize: 'standard_b2s'
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
  }
}

resource aks_roledefinitionforchaosexp 'Microsoft.Authorization/roleDefinitions@2022-04-01' existing = {
  scope: aks
  // This is the Azure Kubernetes Service Cluster Admin Role
  // See https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#azure-kubernetes-service-cluster-admin-role
  name: '0ab0b1a8-8aac-4efd-b8c2-3ee1fb270be8'
}

resource aks_roleassignmentforchaosexp 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: aks
  name: guid(aks.id, chaosaksexperiment.id, aks_roledefinitionforchaosexp.id)
  properties: {
    roleDefinitionId: aks_roledefinitionforchaosexp.id
    principalId: chaosaksexperiment.identity.principalId
    principalType: 'ServicePrincipal'
  }
}

//
// virtual network
//

resource vnet 'Microsoft.Network/virtualNetworks@2022-07-01' = {
  name: vnetName
  location: resourceLocation
  tags: resourceTags
  properties: {
    addressSpace: {
      addressPrefixes: [
        vnetAddressSpace
      ]
    }
    subnets: [
      {
        name: vnetAcaSubnetName
        properties: {
          addressPrefix: vnetAcaSubnetAddressPrefix
        }
      }
      {
        name: vnetVmSubnetName
        properties: {
          addressPrefix: vnetVmSubnetAddressPrefix
        }
      }
      {
        name: vnetLoadTestSubnetName
        properties: {
          addressPrefix: vnetLoadTestSubnetAddressPrefix
        }
      }
    ]
  }
}

//
// jumpbox vm
// 

// public ip address
resource jumpboxpublicip 'Microsoft.Network/publicIPAddresses@2022-07-01' = {
  name: jumpboxPublicIpName
  location: resourceLocation
  tags: resourceTags
  sku: {
    name: 'Standard'
    tier: 'Regional'
  }
  properties: {
    deleteOption: 'Delete'
    publicIPAllocationMethod: 'Static'
  }
}

// network security group
resource jumpboxnsg 'Microsoft.Network/networkSecurityGroups@2022-07-01' = {
  name: jumpboxNsgName
  location: resourceLocation
  tags: resourceTags
  properties: {
    securityRules: [
      {
        name: 'allow-rdp-port-3389'
        properties: {
          access: 'Allow'
          destinationAddressPrefix: 'VirtualNetwork'
          destinationPortRange: '3389'
          direction: 'Inbound'
          priority: 300
          protocol: '*'
          sourceAddressPrefix: '*'
          sourcePortRange: '*'
        }
      }
    ]
  }
}

// network interface controller
resource jumpboxnic 'Microsoft.Network/networkInterfaces@2022-07-01' = {
  name: jumpboxNicName
  location: resourceLocation
  tags: resourceTags
  properties: {
    ipConfigurations: [
      {
        name: 'nic-ip-config'
        properties: {
          primary: true
          privateIPAllocationMethod: 'Dynamic'
          subnet: {
            id: vnet.properties.subnets[1].id // vm subnet
          }
          publicIPAddress: {
            id: jumpboxpublicip.id
          }
        }
      }
    ]
    networkSecurityGroup: {
      id: jumpboxnsg.id
    }
    nicType: 'Standard'
  }
}

// virtual machine
resource jumpboxvm 'Microsoft.Compute/virtualMachines@2022-08-01' = {
  name: jumpboxVmName
  location: resourceLocation
  tags: resourceTags
  properties: {
    hardwareProfile: {
      vmSize: 'standard_b2s'
    }
    storageProfile: {
      osDisk: {
        createOption: 'FromImage'
        managedDisk: {
          storageAccountType: 'StandardSSD_LRS'
        }
      }
      imageReference: {
        offer: 'WindowsServer'
        publisher: 'MicrosoftWindowsServer'
        sku: '2019-datacenter-gensecond'
        version: 'latest'
      }
    }
    networkProfile: {
      networkInterfaces: [
        {
          id: jumpboxnic.id
          properties: {
            deleteOption: 'Delete'
          }
        }
      ]
    }
    osProfile: {
      adminPassword: jumpboxVmAdminPassword
      #disable-next-line adminusername-should-not-be-literal // @TODO: This is a temporary hack, until we can generate the password
      adminUsername: jumpboxVmAdminLogin
      computerName: jumpboxVmName
    }
  }
}

// auto-shutdown schedule
resource jumpboxvmschedule 'Microsoft.DevTestLab/schedules@2018-09-15' = {
  name: jumpboxVmShutdownSchduleName
  location: resourceLocation
  tags: resourceTags
  properties: {
    targetResourceId: jumpboxvm.id
    dailyRecurrence: {
      time: '2100'
    }
    notificationSettings: {
      status: 'Disabled'
    }
    status: 'Enabled'
    taskType: 'ComputeVmShutdownTask'
    timeZoneId: jumpboxVmShutdownScheduleTimezoneId
  }
}

//
// private dns zone
//

module privateDnsZone './createPrivateDnsZone.bicep' = if (deployPrivateEndpoints) {
  name: 'createPrivateDnsZone'
  params: {
    privateDnsZoneName: deployPrivateEndpoints ? join(skip(split(cartsinternalapiaca.properties.configuration.ingress.fqdn, '.'), 2), '.') : ''
    privateDnsZoneVnetId: vnet.id
    privateDnsZoneVnetLinkName: privateDnsZoneVnetLinkName
    privateDnsZoneARecordName: deployPrivateEndpoints ? join(take(split(cartsinternalapiaca.properties.configuration.ingress.fqdn, '.'), 2), '.') : ''
    privateDnsZoneARecordIp: deployPrivateEndpoints ? cartsinternalapiacaenv.properties.staticIp : ''
    resourceTags: resourceTags
  }
}

// aca environment (internal)
resource cartsinternalapiacaenv 'Microsoft.App/managedEnvironments@2022-06-01-preview' = if (deployPrivateEndpoints) {
  name: cartsInternalApiAcaEnvName
  location: resourceLocation
  tags: resourceTags
  sku: {
    name: 'Consumption'
  }
  properties: {
    zoneRedundant: false
    vnetConfiguration: {
      infrastructureSubnetId: vnet.properties.subnets[0].id
      internal: true
    }
  }
}

// aca (internal)
resource cartsinternalapiaca 'Microsoft.App/containerApps@2022-06-01-preview' = if (deployPrivateEndpoints) {
  name: cartsInternalApiAcaName
  location: resourceLocation
  tags: resourceTags
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${userassignedmiforkvaccess.id}': {}
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
          passwordSecretRef: cartsInternalApiAcaSecretAcrPassword
          server: acr.properties.loginServer
          username: acr.name
        }
      ]
      secrets: [
        {
          name: cartsInternalApiAcaSecretAcrPassword
          value: acr.listCredentials().passwords[0].value
        }
      ]
    }
    environmentId: cartsinternalapiacaenv.id
    template: {
      scale: {
        minReplicas: 1
        maxReplicas: 3
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
              name: cartsInternalApiSettingNameKeyVaultEndpoint
              value: kv.properties.vaultUri
            }
            {
              name: cartsInternalApiSettingNameManagedIdentityClientId
              value: userassignedmiforkvaccess.properties.clientId
            }
          ]
          // using a public image initially because no images have been pushed to our private ACR yet
          // at this point. At a later point, our github workflow will update the ACA app to use the 
          // images from our private ACR.
          image: 'mcr.microsoft.com/azuredocs/containerapps-helloworld:latest'
          name: cartsInternalApiAcaContainerDetailsName
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
// chaos studio
//

// target: kv
resource chaoskvtarget 'Microsoft.Chaos/targets@2022-10-01-preview' = {
  name: 'Microsoft-KeyVault'
  location: resourceLocation
  scope: kv
  properties: {}

  // capability: kv (deny access)
  resource chaoskvcapability 'capabilities' = {
    name: 'DenyAccess-1.0'
  }
}

// chaos experiment: kv
resource chaoskvexperiment 'Microsoft.Chaos/experiments@2022-10-01-preview' = {
  name: chaosKvExperimentName
  location: resourceLocation
  tags: resourceTags
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    selectors: [
      {
        type: 'List'
        id: chaosKvSelectorId
        targets: [
          {
            id: chaoskvtarget.id
            type: 'ChaosTarget'
          }
        ]
      }
    ]
    startOnCreation: false
    steps: [
      {
        name: 'step1'
        branches: [
          {
            name: 'branch1'
            actions: [
              {
                name: 'urn:csci:microsoft:keyVault:denyAccess/1.0'
                type: 'continuous'
                selectorId: chaosKvSelectorId
                duration: 'PT5M'
                parameters: []
              }
            ]
          }
        ]
      }
    ]
  }
}

// target: aks
resource chaosakstarget 'Microsoft.Chaos/targets@2022-10-01-preview' = {
  name: 'Microsoft-AzureKubernetesServiceChaosMesh'
  location: resourceLocation
  scope: aks
  properties: {}

  // capability: aks (pod failures)
  resource chaosakscapability 'capabilities' = {
    name: 'PodChaos-2.1'
  }
}

// chaos experiment: aks (chaos mesh)
resource chaosaksexperiment 'Microsoft.Chaos/experiments@2022-10-01-preview' = {
  name: chaosAksExperimentName
  location: resourceLocation
  tags: resourceTags
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    selectors: [
      {
        type: 'List'
        id: chaosAksSelectorId
        targets: [
          {
            id: chaosakstarget.id
            type: 'ChaosTarget'
          }
        ]
      }
    ]
    startOnCreation: false
    steps: [
      {
        name: 'step1'
        branches: [
          {
            name: 'branch1'
            actions: [
              {
                name: 'urn:csci:microsoft:azureKubernetesServiceChaosMesh:podChaos/2.1'
                type: 'continuous'
                selectorId: chaosAksSelectorId
                duration: 'PT5M'
                parameters: [
                  {
                    key: 'jsonSpec'
                    value: '{\'action\':\'pod-failure\',\'mode\':\'all\',\'duration\':\'3s\',\'selector\':{\'namespaces\':[\'default\'],\'labelSelectors\':{\'app\':\'contoso-traders-products\'}}}'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

// outputs
////////////////////////////////////////////////////////////////////////////////

output cartsApiEndpoint string = 'https://${cartsapiaca.properties.configuration.ingress.fqdn}'
output uiCdnEndpoint string = 'https://${cdnprofile_ui2endpoint.properties.hostName}'
