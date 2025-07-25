#!/bin/sh

# entrypoint.sh - Script untuk inisialisasi backend

set -e

echo "🚀 Starting SIUJI Backend..."
echo "================================"

# Function to wait for database
wait_for_db() {
    echo "⏳ Waiting for database to be ready..."
    
    until nc -z db 5432; do
        echo "Database is unavailable - sleeping"
        sleep 2
    done
    
    echo "✅ Database is ready!"
}

# Function to run migrations
run_migrations() {
    echo "🔄 Running database migrations..."
    npm run payload migrate:create
    npm run payload migrate
    echo "✅ Migrations completed!"
}

# Function to seed data
seed_data() {
    echo "🌱 Seeding landing page data..."
    
    # Check if data already exists
    if npm run payload local-api -- --task check-data 2>/dev/null; then
        echo "📊 Data already exists, skipping seeding..."
    else
        echo "📝 No data found, running seeding..."
        npm run seed:landing
        echo "✅ Landing page data seeded!"
    fi
}

# Main execution
main() {
    # Wait for database
    wait_for_db
    
    # Run migrations
    run_migrations
    
    # Seed data (only if needed)
    seed_data
    
    # Start the application
    echo "🎉 Starting Payload CMS..."
    exec "$@"
}

# Run main function with all arguments
main "$@"
