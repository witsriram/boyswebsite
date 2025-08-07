param location string = resourceGroup().location
param siteName string
param imageName string
param postgresName string
param postgresUser string
param postgresPassword string

resource plan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: '${siteName}-plan'
  location: location
  sku: {
    name: 'B1'
    tier: 'Basic'
  }
}

resource web 'Microsoft.Web/sites@2022-03-01' = {
  name: siteName
  location: location
  properties: {
    serverFarmId: plan.id
    siteConfig: {
      linuxFxVersion: 'DOCKER|${imageName}'
      appSettings: [
        {
          name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE'
          value: 'false'
        },
        {
          name: 'DATABASE_URL'
          value: 'postgresql://${postgresUser}:${postgresPassword}@${postgresName}.postgres.database.azure.com:5432/posts'
        }
      ]
    }
  }
}

resource postgres 'Microsoft.DBforPostgreSQL/flexibleServers@2022-12-01' = {
  name: postgresName
  location: location
  sku: {
    name: 'Standard_B1ms'
    tier: 'GeneralPurpose'
  }
  properties: {
    administratorLogin: postgresUser
    administratorLoginPassword: postgresPassword
    storage: {
      storageSizeGB: 32
    }
    version: '14'
  }
}

resource database 'Microsoft.DBforPostgreSQL/flexibleServers/databases@2022-12-01' = {
  name: '${postgres.name}/posts'
}

output webUrl string = web.properties.defaultHostName
