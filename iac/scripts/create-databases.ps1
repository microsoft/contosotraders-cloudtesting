$ErrorActionPreference = 'Stop'

# Create a new SQL server connection
Write-Host "Creating a new SQL server connection..."
$connectionString = "Server=$env:serverName;Database=master;User ID=$env:userName;Password=$env:password"
Write-Host "Connection string: $connectionString"
$connection = New-Object System.Data.SqlClient.SqlConnection($connectionString)
# Split the $env.databaseNames by comma and create an array
$databaseNames = $env:databaseNames -split ","
if ($databaseNames -eq $null) {
    $databaseNames = @($env:databaseNames)
}
Write-Host "Database names: $databaseNames"


Write-Host "Opening the SQL server connection..."
try {
    # Open the SQL server connection
    $connection.Open()
    Write-Host "SQL server connection opened successfully."

    foreach ($databaseName in $databaseNames) {
        # Create the database
        Write-Host "Creating database '$databaseName'..."
        $createDatabaseQuery = "CREATE DATABASE $databaseName"
        $createCommand = $connection.CreateCommand()
        $createCommand.CommandText = $createDatabaseQuery
        $createCommand.ExecuteNonQuery()

        Write-Host "Database '$databaseName' created successfully."
    }
}
catch {
    Write-Host "Error creating database: $_.Exception.Message"
}
finally {
    # Close the SQL server connection
    Write-Host "Closing the SQL server connection..."
    $connection.Close()
}
