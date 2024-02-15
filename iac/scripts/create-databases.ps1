# Define the SQL server details
param(
    [Parameter(Mandatory=$true)]
    [string]$userName,

    [Parameter(Mandatory=$true)]
    [string]$password
)

param(
    [Parameter(Mandatory=$true)]
    [string]$serverName
)

param(
    [Parameter(Mandatory=$true)]
    [string[]]$databaseNames
)

# Create a new SQL server connection
$connectionString = "Server=$serverName;Database=master;User ID=$userName;Password=$password"
$connection = New-Object System.Data.SqlClient.SqlConnection($connectionString)

try {
    # Open the SQL server connection
    $connection.Open()

    foreach ($databaseName in $databaseNames) {
        # Create the database
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
    $connection.Close()
}
