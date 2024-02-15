param location string = resourceGroup().location
param nsgName string
param nsgRules array = []
param resourceTags object
param subnetName string
param vnetName string

resource nsg 'Microsoft.Network/networkSecurityGroups@2021-02-01' = {
  name: nsgName
  location: location
  properties: {
    securityRules: [
      for rule in nsgRules: {
        name: rule.name
        properties: {
          protocol: rule.protocol
          sourcePortRange: rule.sourcePortRange
          destinationPortRanges: rule.destinationPortRanges
          sourceAddressPrefix: rule.sourceAddressPrefix
          destinationAddressPrefix: rule.destinationAddressPrefix
          access: rule.access
          priority: rule.priority
          direction: rule.direction
        }
      }
    ]
  }
  tags: resourceTags
}

// get existing vnet
resource vnet 'Microsoft.Network/virtualNetworks@2021-02-01' existing = {
  name: vnetName
}

resource update_subnet_nsg 'Microsoft.Network/virtualNetworks/subnets@2023-09-01' = {
  name: subnetName
  parent: vnet
  properties: {
    networkSecurityGroup: {
      id: nsg.id
    }
  }
}

output id string = nsg.id
