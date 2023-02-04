# note: work in progress. When completed, this script will be merged into the github workflow

appName=mydemoapp3

az ad app create \
    --display-name ${appName} \
    --sign-in-audience AzureADandPersonalMicrosoftAccount

appId=$(az ad app list --display-name ${appName} --query [].id -o tsv)

az rest \
    --method PATCH \
    --uri https://graph.microsoft.com/v1.0/applications/${appId} \
    --headers 'Content-Type=application/json' \
    --body '{"spa":{"redirectUris":["https://myapp.com"]}}'

az ad app update \
    --id ${appId} \
    --enable-access-token-issuance true \
    --enable-id-token-issuance true 

az ad app update \
    --id ${appId} \
    --optional-claims "{\"accessToken\":[{\"name\":\"email\",\"essential\":false}]}"

az ad app permission add \
    --id ${appId} \
    --api 00000003-0000-0000-c000-000000000000 \
    --api-permissions e1fe6dd8-ba31-4d61-89e7-88639da4683d=Scope 64a6cdd6-aab1-4aaf-94b8-3cc8405e90d0=Scope

az ad app permission grant \
    --id ${appId} \
    --api 00000003-0000-0000-c000-000000000000 \
    --scope User.Read
