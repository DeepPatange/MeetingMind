# Hostinger Deployment Guide for MeetingMind

## Prerequisites

### What You Need:
- **Hostinger VPS or Cloud Hosting** (Shared hosting won't work!)
- SSH access to your server
- Node.js 18+ installed on the server
- Domain name (optional, but recommended)

## Step-by-Step Deployment

### 1. Connect to Your Hostinger Server via SSH

```bash
ssh root@your-server-ip
# Or
ssh username@your-server-ip
```

### 2. Install Node.js (if not already installed)

```bash
# Update package manager
sudo apt update

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 3. Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### 4. Clone Your Repository

```bash
cd /var/www  # or wherever you want to deploy
git clone https://github.com/DeepPatange/MeetingMind.git
cd MeetingMind
```

### 5. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 6. Create Environment File

```bash
nano .env.local
```

Add the following:
```
DATABASE_URL="file:./dev.db"
LANGFLOW_FLOW_URL="your-langflow-url-here"
NODE_ENV=production
```

Save and exit (Ctrl+X, then Y, then Enter)

### 7. Set Up Database

```bash
npx prisma generate
npx prisma migrate deploy
```

### 8. Build the Application

```bash
npm run build
```

### 9. Start the Application with PM2

```bash
# Start the app
pm2 start npm --name "meetingmind" -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on system boot
pm2 startup
```

### 10. Configure Nginx (Reverse Proxy)

```bash
sudo nano /etc/nginx/sites-available/meetingmind
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain or IP

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/meetingmind /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 11. Open Firewall Ports

```bash
sudo ufw allow 80
sudo ufw allow 443  # If using HTTPS
sudo ufw enable
```

## Accessing Your Application

- If you have a domain: `http://your-domain.com`
- If using IP only: `http://your-server-ip`

## Useful PM2 Commands

```bash
# View application status
pm2 status

# View application logs
pm2 logs meetingmind

# Restart application
pm2 restart meetingmind

# Stop application
pm2 stop meetingmind

# Delete application from PM2
pm2 delete meetingmind
```

## Troubleshooting

### Application Not Starting?
```bash
# Check logs
pm2 logs meetingmind

# Check if port 3000 is in use
sudo lsof -i :3000
```

### Can't Access from Browser?
1. Check firewall settings
2. Verify Nginx is running: `sudo systemctl status nginx`
3. Check if app is running: `pm2 status`

### Update Application After Changes
```bash
cd /var/www/MeetingMind
git pull origin main
npm install --legacy-peer-deps
npm run build
pm2 restart meetingmind
```

## Alternative: Using Docker (Recommended for easier deployment)

If your Hostinger VPS supports Docker:

```bash
# Build and run with Docker Compose
docker-compose up -d
```

This will automatically set up everything!

## Important Notes

1. **Database**: The default SQLite database is fine for testing, but for production, consider PostgreSQL
2. **LangFlow**: Make sure your LangFlow server is accessible from Hostinger
3. **HTTPS**: Consider setting up SSL certificate with Let's Encrypt for secure connections
4. **Backups**: Regularly backup your database and uploads folder

## Need Help?

- Check PM2 logs: `pm2 logs`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Check application is running: `curl http://localhost:3000`
