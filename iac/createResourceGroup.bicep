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
  'westus2'
])
param rgLocation string

// The utcNow() function can only be used in the default value of a parameter.
// Details: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/bicep-functions-date#utcnow
param currentDateTimeUtc string = utcNow('yyyy-MM-dd')

// variables
////////////////////////////////////////////////////////////////////////////////

var costBudgetName = 'monthly-cost-budget-${suffix}'

// roles alerted when cost budget is exceeded
var costBudgetContactRoles = [
  'Owner'
  'Contributor'
]

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

//
// consumption: budgets and alerts
//

// budget: monthly under 100$
resource budgetmonthlyunder100 'Microsoft.Consumption/budgets@2021-10-01' = {
  name: costBudgetName
  properties: {
    timePeriod: {
      // must be in YYYY-MM-DD format, and must be the first day of the current time grain (i.e month)
      startDate: '${substring(currentDateTimeUtc, 0, 7)}-01'
    }
    timeGrain: 'Monthly'
    amount: 100
    category: 'Cost'
    notifications: {
      NotificationFor50PercentExceededBudget: {
        enabled: true
        operator: 'GreaterThan'
        threshold: 50
        contactRoles: costBudgetContactRoles
        contactEmails: []
        thresholdType: 'Actual'
      }
      NotificationFor75PercentExceededBudget: {
        enabled: true
        operator: 'GreaterThan'
        threshold: 75
        contactRoles: costBudgetContactRoles
        contactEmails: []
        thresholdType: 'Actual'
      }
      NotificationFor90PercentExceededBudget: {
        enabled: true
        operator: 'GreaterThan'
        threshold: 90
        contactRoles: costBudgetContactRoles
        contactEmails: []
        thresholdType: 'Actual'
      }
    }
  }
}

// outputs
////////////////////////////////////////////////////////////////////////////////

output outputRgName string = rg.name
