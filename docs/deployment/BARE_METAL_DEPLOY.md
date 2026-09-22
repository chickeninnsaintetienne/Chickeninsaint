# Bare Metal Deployment Guide (Nginx Multi-Site + PM2)

**Best for:** 512MB RAM Droplets

## 1. Initial Server Setup (Run as root)

```bash
# Update System
apt update && apt upgrade -y

# Install Core Tools
apt install -y curl git nginx certbot python3-certbot-nginx unzip

# Install Node.js 20 (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 (Process Manager)
npm install -g pm2
```

## 2. Deploy Application Code

```bash
# Setup App Directory (Standard Linux location)
mkdir -p /var/www/chickeninn.co
cd /var/www/chickeninn.co

# Clone Repo
git clone https://github.com/YOUR_USERNAME/chicken_inn.git .
# (Note the dot at the end to clone into current dir)

# Install & Build
npm ci
npm run build

# Setup Env Vars
cp .env.local .env
nano .env  # Edit if needed
```

## 3. Setup Process Manager (PM2)

```bash
# Start the app
pm2 start ecosystem.config.js

# Make PM2 start on boot
pm2 startup systemd
# (Run the command it outputs!)
pm2 save
```

## 4. Configure Nginx (Multi-Site Setup)

Follow this structure to allow multiple domains on one server.

### Step A: Clean default config
```bash
rm /etc/nginx/sites-enabled/default
```

### Step B: Create Site Config
```bash
nano /etc/nginx/sites-available/chickeninn.co
```
Paste contents of `nginx.conf` (from repo).

### Step C: Enable the Site (Symlink)
```bash
ln -s /etc/nginx/sites-available/chickeninn.co /etc/nginx/sites-enabled/
```

### Step D: Test & Restart
```bash
nginx -t
# If successful:
systemctl restart nginx
```

## 5. Setup SSL (HTTPS) with Certbot

Certbot will automatically edit your Nginx config to enable HTTPS.

```bash
certbot --nginx -d chickeninn.co -d www.chickeninn.co
```
- Enter your email when asked.
- Agree to terms.
- Choose "Redirect" if asked (to force HTTPS).

## 6. Verify Auto-Renewal

Certbot sets up a timer automatically. Check it works:
```bash
systemctl list-timers | grep certbot
# OR dry run:
certbot renew --dry-run
```

## Adding More Sites Later?

Just repeat Steps 2 & 4 with a new domain!
1. `mkdir -p /var/www/newdomain.com`
2. Deploy app there.
3. Start on a **different port** (e.g., 3001) in `ecosystem.config.js`.
4. Create `/etc/nginx/sites-available/newdomain.com` (proxy to 3001).
5. Link to `sites-enabled`.
6. Run `certbot` for new domain.

## Maintenance Commands

- **Restart App:** `pm2 restart chicken-inn`
- **View Logs:** `pm2 logs`
- **Restart Web Server:** `systemctl restart nginx`
