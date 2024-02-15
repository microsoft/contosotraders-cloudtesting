param location string = resourceGroup().location
param subnetId string
param bastionHostName string
param resourceTags object 


var publicIpAddressName = '${bastionHostName}-pip'

resource publicIp 'Microsoft.Network/publicIPAddresses@2022-07-01' = {
  name: publicIpAddressName
  location: location
  sku: {
    name: 'Standard'
  }
  properties: {
    publicIPAllocationMethod: 'Static'
  }
  tags: resourceTags
}

resource bastionHost 'Microsoft.Network/bastionHosts@2022-07-01' = {
  name: bastionHostName
  location: location
  properties: {
    ipConfigurations: [
      {
        name: 'IpConfiguration'
        properties: {
          subnet: {
            id: subnetId
          }
          publicIPAddress: {
            id: publicIp.id
          }
        }
      }
    ]
  }
  tags: resourceTags
}
