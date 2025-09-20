# Entity Framework Core CLI Tutorial

## Overview
Entity Framework Core (EF Core) CLI tools provide a command-line interface for managing database schemas, migrations, and other EF Core operations. This tutorial covers the essential commands and workflows for EF Core development.

---

## Installation

### Global Tool Installation
```bash
# Install EF Core tools globally
dotnet tool install --global dotnet-ef

# Update to latest version
dotnet tool update --global dotnet-ef

# Check installed version
dotnet ef --version
```

### Local Tool Installation (Recommended)
```bash
# Create tool manifest (if not exists)
dotnet new tool-manifest

# Install EF Core tools locally
dotnet tool install dotnet-ef

# Restore tools from manifest
dotnet tool restore
```

---

## Project Setup

### Prerequisites
Your project needs these NuGet packages:
```xml
<PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="8.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.0" />
```

### Connection String
Ensure your `appsettings.json` contains a valid connection string:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=MyApp;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

---

## Core Commands

### 1. Database Operations

#### Create Database
```bash
# Create database from existing migrations
dotnet ef database update

# Create database for specific project
dotnet ef database update --project DataAccess

# Create database with specific startup project
dotnet ef database update --project DataAccess --startup-project WebApp
```

#### Drop Database
```bash
# Drop the database
dotnet ef database drop

# Drop database with confirmation
dotnet ef database drop --force

# Drop database for specific project
dotnet ef database drop --project DataAccess
```

#### Get Database Information
```bash
# Get connection info
dotnet ef database info

# List applied migrations
dotnet ef migrations list
```

### 2. Migration Operations

#### Create Migration
```bash
# Create new migration
dotnet ef migrations add InitialCreate

# Create migration with specific project
dotnet ef migrations add AddUserTable --project DataAccess

# Create migration with output directory
dotnet ef migrations add AddUserTable --output-dir Migrations/UserMigrations
```

#### Apply Migrations
```bash
# Apply all pending migrations
dotnet ef database update

# Apply migrations up to specific migration
dotnet ef database update AddUserTable

# Apply to specific migration by timestamp
dotnet ef database update 20231120120000_AddUserTable
```

#### Remove Migration
```bash
# Remove last migration (not applied to database)
dotnet ef migrations remove

# Remove migration from specific project
dotnet ef migrations remove --project DataAccess

# Force remove (even if applied to database)
dotnet ef migrations remove --force
```

#### Migration Information
```bash
# List all migrations
dotnet ef migrations list

# Check if migrations have been applied
dotnet ef migrations has-pending-model-changes
```

### 3. Code Generation (Scaffolding)

#### Database First (Scaffold from existing database)
```bash
# Scaffold entire database
dotnet ef dbcontext scaffold "ConnectionString" Microsoft.EntityFrameworkCore.SqlServer

# Scaffold specific tables
dotnet ef dbcontext scaffold "ConnectionString" Microsoft.EntityFrameworkCore.SqlServer --tables Users,Orders

# Scaffold with custom context name and output directory
dotnet ef dbcontext scaffold "ConnectionString" Microsoft.EntityFrameworkCore.SqlServer \
    --context MyDbContext \
    --output-dir Models \
    --context-dir Data
```

#### Advanced Scaffolding Options
```bash
# Scaffold with data annotations instead of fluent API
dotnet ef dbcontext scaffold "ConnectionString" Microsoft.EntityFrameworkCore.SqlServer \
    --data-annotations

# Force overwrite existing files
dotnet ef dbcontext scaffold "ConnectionString" Microsoft.EntityFrameworkCore.SqlServer \
    --force

# Exclude specific tables
dotnet ef dbcontext scaffold "ConnectionString" Microsoft.EntityFrameworkCore.SqlServer \
    --tables Users,Orders \
    --exclude-tables AuditLog,TempData
```

---

## Common Workflows

### 1. Code First Development
```bash
# 1. Create your models and DbContext
# 2. Create initial migration
dotnet ef migrations add InitialCreate --project DataAccess

# 3. Apply migration to database
dotnet ef database update --project DataAccess

# 4. Make model changes
# 5. Create new migration
dotnet ef migrations add AddEmailToUser --project DataAccess

# 6. Apply new migration
dotnet ef database update --project DataAccess
```

### 2. Database First Development
```bash
# 1. Scaffold existing database
dotnet ef dbcontext scaffold "ConnectionString" Microsoft.EntityFrameworkCore.SqlServer \
    --output-dir Models \
    --context-dir Data

# 2. When database schema changes, re-scaffold
dotnet ef dbcontext scaffold "ConnectionString" Microsoft.EntityFrameworkCore.SqlServer \
    --output-dir Models \
    --context-dir Data \
    --force
```

### 3. Team Development Workflow
```bash
# 1. Pull latest code
git pull

# 2. Check for pending migrations
dotnet ef migrations list

# 3. Apply any new migrations
dotnet ef database update --project DataAccess

# 4. Make your changes and create migration
dotnet ef migrations add YourFeature --project DataAccess

# 5. Test migration
dotnet ef database update --project DataAccess

# 6. Commit and push
git add .
git commit -m "Add YourFeature migration"
git push
```

---

## Multi-Project Solutions

### Project Structure Example
```
Solution/
├── WebApp/                    (Startup project)
├── DataAccess/               (Contains DbContext)
├── Models/                   (Entity models)
└── Business/                 (Business logic)
```

### Commands for Multi-Project Solutions
```bash
# Specify both project and startup project
dotnet ef migrations add AddUserTable \
    --project DataAccess \
    --startup-project WebApp

dotnet ef database update \
    --project DataAccess \
    --startup-project WebApp

# From specific directory
cd WebApp
dotnet ef migrations add AddUserTable --project ../DataAccess
dotnet ef database update --project ../DataAccess
```

---

## Advanced Scenarios

### 1. Multiple DbContexts
```bash
# Specify context when multiple exist
dotnet ef migrations add AddUser \
    --context UserContext \
    --project DataAccess

dotnet ef database update \
    --context UserContext \
    --project DataAccess
```

### 2. Different Environments
```bash
# Use different connection string
dotnet ef database update \
    --project DataAccess \
    --startup-project WebApp \
    --configuration Production

# Use environment variables
ASPNETCORE_ENVIRONMENT=Production dotnet ef database update \
    --project DataAccess \
    --startup-project WebApp
```

### 3. Custom Migration Operations
```bash
# Generate SQL script instead of applying directly
dotnet ef migrations script \
    --project DataAccess \
    --output migration.sql

# Generate script for specific migration range
dotnet ef migrations script AddUserTable AddOrderTable \
    --project DataAccess \
    --output incremental.sql

# Generate idempotent script (safe to run multiple times)
dotnet ef migrations script \
    --project DataAccess \
    --idempotent \
    --output idempotent.sql
```

---

## Troubleshooting

### Common Command Syntax Mistakes

#### Wrong Command Format
Many developers make syntax errors when using EF Core CLI. Here are the most common mistakes:

| ❌ **Wrong** | ✅ **Correct** |
|-------------|---------------|
| `dotnet ef update-database` | `dotnet ef database update` |
| `dotnet ef add-migration` | `dotnet ef migrations add` |
| `dotnet ef remove-migration` | `dotnet ef migrations remove` |
| `dotnet ef drop-database` | `dotnet ef database drop` |
| `dotnet ef list-migrations` | `dotnet ef migrations list` |

#### Key Rule
EF Core CLI uses **space-separated** command structure, not **hyphenated** commands:
- Format: `dotnet ef [area] [action]`
- Examples: `database update`, `migrations add`, `dbcontext scaffold`

### Common Issues

#### 1. "No executable found matching command 'dotnet-ef'"
```bash
# Solution: Install EF Core tools
dotnet tool install --global dotnet-ef
```

#### 2. "Unable to create an object of type 'DbContext'"
```bash
# Ensure you have a parameterless constructor or implement IDesignTimeDbContextFactory
# Or specify startup project explicitly
dotnet ef migrations add Test --startup-project WebApp
```

#### 3. "No migrations found"
```bash
# Check migrations directory exists and contains migration files
# Verify project references and context configuration
```

#### 4. "Connection string not found"
```bash
# Verify appsettings.json in startup project
# Check connection string name matches DbContext configuration
```

#### 5. "More than one DbContext was found"
```bash
# Solution: Specify the context explicitly
dotnet ef database update --context YourContextName --project DataAccess

# Example with multiple contexts
dotnet ef database update --context ApplicationContext --project ../Libraries/SurveyDataAccess
dotnet ef database update --context UserContext --project ../Libraries/MemberDataAccess
```

### Debugging Commands
```bash
# Verbose output for debugging
dotnet ef migrations add Test --verbose

# Dry run (see what would happen)
dotnet ef database update --dry-run

# Check configuration
dotnet ef dbcontext info
```

---

## Best Practices

### 1. Migration Naming
- Use descriptive names: `AddUserEmailIndex` instead of `Migration1`
- Include timestamp for ordering: `20231120_AddUserTable`
- Use consistent naming convention across team

### 2. Migration Content
- Review generated migration code before applying
- Add custom SQL when needed using `migrationBuilder.Sql()`
- Always test migrations on copy of production data

### 3. Team Collaboration
- Never modify applied migrations
- Always pull latest code before creating new migrations
- Use merge conflicts resolution for migration ordering

### 4. Production Deployment
```bash
# Generate script for production deployment
dotnet ef migrations script \
    --project DataAccess \
    --idempotent \
    --output production-update.sql

# Review script before running in production
# Test script on production copy first
```

### 5. Backup Strategy
```bash
# Always backup before major updates
# Consider point-in-time recovery options
# Test rollback procedures
```

---

## Integration with CI/CD

### GitHub Actions Example
```yaml
name: Database Migration
on:
  push:
    branches: [main]

jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup .NET
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: '8.0'
          
      - name: Install EF Core tools
        run: dotnet tool install --global dotnet-ef
        
      - name: Update database
        run: |
          dotnet ef database update \
            --project DataAccess \
            --startup-project WebApp
        env:
          ConnectionStrings__DefaultConnection: ${{ secrets.CONNECTION_STRING }}
```

---

## Conclusion

Entity Framework Core CLI tools are essential for managing database schemas in .NET applications. Key takeaways:

1. **Always install tools locally** for consistent team environment
2. **Use migrations** for version control of database schema
3. **Test migrations thoroughly** before production deployment
4. **Follow naming conventions** for better team collaboration
5. **Backup databases** before major schema changes

For more advanced scenarios, refer to the [official EF Core documentation](https://docs.microsoft.com/en-us/ef/core/).