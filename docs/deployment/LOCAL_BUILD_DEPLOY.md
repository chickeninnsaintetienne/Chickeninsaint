# Local Build Deployment Guide (The "Vercel Way")

**Best for:** 512MB RAM Droplets. Builds happen on your machine; only results are sent to the server.

## 1. Prerequisites (On Server)

The server needs Node.js, Nginx, and PM2.

```bash
# Run on the server
apt update && apt install -y nodejs npm nginx certbot python3-certbot-nginx
npm install -g pm2
mkdir -p /var/www/your-app
```

## 2. Setup (On Your Mac)

1. **Make the deployment script executable**:

   ```bash
   chmod +x deploy.sh
   ```

2. **Set up SSH access**:

   Ensure the deployment user can connect with its private key without a password prompt.

## 3. Server Nginx & SSL Configuration (One-time Setup)

This project uses DDoS prevention rules (rate limits and connection limits) and security headers. `deploy.sh` does not sync `nginx.conf`, so configure Nginx manually once to avoid overwriting SSL settings.

1. **Upload the local Nginx configuration**:

   ```bash
   scp nginx.conf YOUR_SERVER_USER@YOUR_SERVER_IP:/etc/nginx/sites-available/chickeninn
   ```

2. **Enable and test the configuration**:

   ```bash
   ssh YOUR_SERVER_USER@YOUR_SERVER_IP
   ln -s /etc/nginx/sites-available/chickeninn /etc/nginx/sites-enabled/
   rm /etc/nginx/sites-enabled/default # Remove default config to avoid a port 80 conflict
   nginx -t
   systemctl reload nginx
   ```

3. **Run Certbot** for the domains served by this application:

   ```bash
   certbot --nginx -d example.com -d www.example.com
   ```

   Certbot asks for an email, accepts the terms, and rewrites the Nginx configuration with SSL settings.

## 4. How to Deploy

Run the script from the project root with the server configuration supplied at runtime:

```bash
./deploy.sh SERVER_USER SERVER_IP SERVER_DIR SSH_KEY_PATH
```

For example, using placeholder values:

```bash
./deploy.sh deploy-user 203.0.113.10 /var/www/your-app ~/.ssh/your-deploy-key
```

**What happens:**

1. Compiles the app locally.
2. Uploads the standalone build, static assets, public assets, PM2 configuration, and `.env.local`.
3. Restarts the application with PM2.

## 5. Troubleshooting & Logs

**View live logs:**

```bash
ssh -i SSH_KEY_PATH SERVER_USER@SERVER_IP "pm2 logs chicken-inn"
```

**Assets 404?**

Ensure the rsync commands in `deploy.sh` copied `.next/static` correctly. The script handles this, but if you modified `next.config.ts`, verify `output: 'standalone'` is present.

**Permission denied?**

Ensure the deployment user has SSH access to the server and that `SSH_KEY_PATH` points to the matching private key.
