#!/bin/bash

# MeetingMind Deployment Script for Hostinger VPS
# Run this script on your Hostinger server after cloning the repository

echo "🚀 Starting MeetingMind Deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Installing Node.js 18..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✅ Node.js is already installed: $(node --version)"
fi

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
else
    echo "✅ PM2 is already installed"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  Creating .env.local file..."
    cat > .env.local << EOF
DATABASE_URL="file:./dev.db"
LANGFLOW_FLOW_URL="http://127.0.0.1:7860/api/v1/run/your-flow-id"
NODE_ENV=production
EOF
    echo "⚠️  Please edit .env.local and add your actual LANGFLOW_FLOW_URL"
    echo "   Run: nano .env.local"
fi

# Set up database
echo "🗄️  Setting up database..."
npx prisma generate
npx prisma migrate deploy

# Build the application
echo "🔨 Building application..."
npm run build

# Stop existing PM2 process if it exists
pm2 delete meetingmind 2>/dev/null || true

# Start the application
echo "🚀 Starting application with PM2..."
pm2 start npm --name "meetingmind" -- start
pm2 save
pm2 startup

echo ""
echo "✅ Deployment completed!"
echo ""
echo "📝 Next steps:"
echo "1. Edit .env.local with your LangFlow URL: nano .env.local"
echo "2. Restart the app: pm2 restart meetingmind"
echo "3. Configure Nginx reverse proxy (see DEPLOYMENT_HOSTINGER.md)"
echo "4. Access your app at http://your-server-ip:3000"
echo ""
echo "Useful commands:"
echo "  - View logs: pm2 logs meetingmind"
echo "  - Check status: pm2 status"
echo "  - Restart app: pm2 restart meetingmind"
