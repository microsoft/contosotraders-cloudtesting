// common
targetScope = 'subscription'

// parameters
////////////////////////////////////////////////////////////////////////////////

// common
@description('Rg for storage account, service bus, cosmos db & function app. Value is passed from GHA variable.')
param rgName string

@minLength(3)
@maxLength(6)
@description('A unique environment suffix (max 6 characters, alphanumeric only).')
param suffix string

@description('Set rg location')
@allowed([
  'australiaeast'
  'centralus'
  'eastus'
  'eastus2'
  'japaneast'
  'northcentralus'
  'uksouth'
  'westcentralus'
  'westeurope'
])
param rgLocation string

// variables
////////////////////////////////////////////////////////////////////////////////

// tags
var rgTags = {
  Product: '${rgName}${suffix}'
  Environment: suffix
}

// resource groups
////////////////////////////////////////////////////////////////////////////////

resource rg 'Microsoft.Resources/resourceGroups@2022-09-01' = {
  name: '${rgName}${suffix}'
  location: rgLocation
  tags: rgTags
}

// outputs
////////////////////////////////////////////////////////////////////////////////

output outputRgName string = rg.name
