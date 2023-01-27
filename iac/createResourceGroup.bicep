// common
targetScope = 'subscription'

// parameters
////////////////////////////////////////////////////////////////////////////////

// common
@minLength(3)
@maxLength(6)
@description('A unique environment name (max 6 characters, alphanumeric only).')
param env string

param rgLocation string = 'eastus'

param prefixHyphenated string = 'contoso-traders'

// variables
////////////////////////////////////////////////////////////////////////////////

// rg for storage account, service bus, cosmos db & function app
var rgName = '${prefixHyphenated}-rg${env}'

// tags
var rgTags = {
  Product: prefixHyphenated
  Environment: 'testing'
}

// resource groups
////////////////////////////////////////////////////////////////////////////////

resource rg 'Microsoft.Resources/resourceGroups@2022-09-01' = {
  name: rgName
  location: rgLocation
  tags: rgTags
}

// outputs
////////////////////////////////////////////////////////////////////////////////

output outputRgName string = rg.name
