param location string = 'westeurope'
param cartvmName string = 'cartVM'
param prodvmName string = 'prodVM'
param adminUsername string = 'azureadmin'
param adminPassword string 
param managedIdentityId string = '/subscriptions/41bcf9d5-ccdd-4903-821e-a368aac35830/resourcegroups/contoso-traders-rgjjj/providers/Microsoft.ManagedIdentity/userAssignedIdentities/contoso-traders-mi-kv-accessjjj'

resource myVnet 'Microsoft.Network/virtualNetworks@2021-02-01' = {
  name: 'myVnet'
  location: location
  properties: {
    addressSpace: {
      addressPrefixes: [
        '10.0.0.0/16'
      ]
    }
    subnets: [
      {
        name: 'default'
        properties: {
          addressPrefix: '10.0.0.0/24'
        }
      }
    ]
  }
}

resource cartPublicIP 'Microsoft.Network/publicIPAddresses@2021-02-01' = {
  name: 'cartPublicIP'
  location: location
  properties: {
    publicIPAllocationMethod: 'Dynamic'
  }
}


resource cartNIC 'Microsoft.Network/networkInterfaces@2021-02-01' = {
  name: 'cartNIC'
  location: location
  properties: {
    ipConfigurations: [
      {
        name: 'myIPConfig'
        properties: {
          subnet: {
            id: myVnet.properties.subnets[0].id
          }
          publicIPAddress: {
            id: cartPublicIP.id
          }
        }
      }
    ]
  }
}

resource cartVM 'Microsoft.Compute/virtualMachines@2021-03-01' = {
  name: cartvmName
  location: location
  dependsOn: [
    cartNIC
  ]
  properties: {
    hardwareProfile: {
      vmSize: 'Standard_DS2_v2'
    }
    osProfile: {
      computerName: cartvmName
      adminUsername: adminUsername
      adminPassword: adminPassword
    }
    storageProfile: {
      imageReference: {
        publisher: 'canonical'
        offer: '0001-com-ubuntu-server-focal'
        sku: '20_04-lts-gen2'
        version: 'latest'
      }
      osDisk: {
        createOption: 'FromImage'
        managedDisk: {
          storageAccountType: 'Standard_LRS'
        }
      }
    }
    networkProfile: {
      networkInterfaces: [
        { id: cartNIC.id }
      ]
    }
    
  }
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${managedIdentityId}': {}
    }
  }
}

resource cartVM_extensionName 'Microsoft.Compute/virtualMachines/extensions@2019-12-01' = {
  parent: cartVM
  name: 'DockerExtension'
  location: location
  properties: {
    publisher: 'Microsoft.Azure.Extensions'
    type: 'DockerExtension'
    typeHandlerVersion: '1.0'
    autoUpgradeMinorVersion: true
  }
} 

resource prodPublicIP 'Microsoft.Network/publicIPAddresses@2021-02-01' = {
  name: 'prodPublicIP'
  location: location
  properties: {
    publicIPAllocationMethod: 'Dynamic'
  }
}

resource prodNIC 'Microsoft.Network/networkInterfaces@2021-02-01' = {
  name: 'prodNIC'
  location: location
  properties: {
    ipConfigurations: [
      {
        name: 'myIPConfig'
        properties: {
          subnet: {
            id: myVnet.properties.subnets[0].id
          }
          publicIPAddress: {
            id: prodPublicIP.id
          }
        }
      }
    ]
  }
}

resource prodVM 'Microsoft.Compute/virtualMachines@2021-03-01' = {
  name: prodvmName
  location: location
  dependsOn: [
    prodNIC
  ]
  properties: {
    hardwareProfile: {
      vmSize: 'Standard_DS2_v2'
    }
    osProfile: {
      computerName: prodvmName
      adminUsername: adminUsername
      adminPassword: adminPassword
    }
    storageProfile: {
      imageReference: {
        publisher: 'canonical'
        offer: '0001-com-ubuntu-server-focal'
        sku: '20_04-lts-gen2'
        version: 'latest'
      }
      osDisk: {
        createOption: 'FromImage'
        managedDisk: {
          storageAccountType: 'Standard_LRS'
        }
      }
    }
    networkProfile: {
      networkInterfaces: [
        { id: prodNIC.id }
      ]
    }
    
  }
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${managedIdentityId}': {}
    }
  }
}

resource prodVM_extensionName 'Microsoft.Compute/virtualMachines/extensions@2019-12-01' = {
  parent: prodVM
  name: 'DockerExtension'
  location: location
  properties: {
    publisher: 'Microsoft.Azure.Extensions'
    type: 'DockerExtension'
    typeHandlerVersion: '1.0'
    autoUpgradeMinorVersion: true
  }
} 
