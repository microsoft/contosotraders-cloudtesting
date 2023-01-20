// Note: There is a very specific reason the creation of the private DNS zone happens in this separate bicep module (as opposed 
// to the main bicep file). A few of resource 'names' are derived from the FQDN on the ACA app; which only becomes known
// "AFTER" the ACA app is created.
// If you attempt to use the FQDN in the 'name' properties (e.g. name of A record, name of private dns zone, etc.) then you'll 
// encounter an error like this:
//
// This expression is being used in an assignment to the "name" property of the "Microsoft.XXXX/YYYY" type, which requires a value 
// that can be calculated at the start of the deployment. Properties of XXXYYY which can be calculated at the start include "name"
//
// More details: https://stackoverflow.com/q/73232751

param privateDnsZoneName string
param privateDnsZoneVnetId string
param privateDnsZoneVnetLinkName string
param privateDnsZoneARecordName string
param privateDnsZoneARecordIp string
param resourceTags object

// private dns zone
resource privdnszone 'Microsoft.Network/privateDnsZones@2020-06-01' = {
  name: privateDnsZoneName
  location: 'global'
  tags: resourceTags
}

// vnet link
resource privdnszone_vnetlink 'Microsoft.Network/privateDnsZones/virtualNetworkLinks@2020-06-01' = {
  name: privateDnsZoneVnetLinkName
  location: 'global'
  tags: resourceTags
  parent: privdnszone
  properties: {
    registrationEnabled: true
    virtualNetwork: {
      id: privateDnsZoneVnetId
    }
  }
}

// private dns zone: 'A' record
resource symbolicname 'Microsoft.Network/privateDnsZones/A@2020-06-01' = {
  name: privateDnsZoneARecordName
  parent: privdnszone
  properties: {
    aRecords: [
      {
        ipv4Address: privateDnsZoneARecordIp
      }
    ]
    ttl: 3600
  }
}
