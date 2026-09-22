#!/bin/bash

if [ "$#" -ne 4 ] || [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ] || [ -z "$4" ]; then
    echo "Usage: $0 SERVER_USER SERVER_IP SERVER_DIR SSH_KEY_PATH" >&2
    exit 1
fi

SERVER_USER="$1"
SERVER_IP="$2"
SERVER_DIR="$3"
SSH_KEY_PATH="$4"
SSH_KEY=(-i "$SSH_KEY_PATH")
printf -v RSYNC_RSH 'ssh -i %q' "$SSH_KEY_PATH"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting Local Build & Deploy Strategy...${NC}"

# 1. Build Verification
if [ ! -f "next.config.ts" ]; then
    echo -e "${RED}Error: next.config.ts not found! Are you in the root directory?${NC}"
    exit 1
fi

# 2. Local Build
echo -e "${YELLOW}📦 Building locally ...${NC}"
# Clean previous build to ensure freshness
rm -rf .next

# Run build
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed! Fix errors locally before deploying.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"

# 3. Preparing Artifacts
echo -e "${YELLOW}📂 Preparing production artifacts...${NC}"

# The standalone folder contains almost everything, but we need to ensure 
# static assets and public folder are correctly placed for the server.

# 4. Sync to Server
echo -e "${YELLOW}📡 Uploading to ${SERVER_IP}...${NC}"

# Ensure remote directory exists
ssh "${SSH_KEY[@]}" "${SERVER_USER}@${SERVER_IP}" "mkdir -p ${SERVER_DIR}"

# Rsync the standalone folder content directly to server root
# We also need public/ and .next/static/ for assets to work defined in standalone mode
rsync -avz --delete -e "$RSYNC_RSH" .next/standalone/ "${SERVER_USER}@${SERVER_IP}:${SERVER_DIR}/"
rsync -avz -e "$RSYNC_RSH" .next/static/ "${SERVER_USER}@${SERVER_IP}:${SERVER_DIR}/.next/static/"
rsync -avz -e "$RSYNC_RSH" public/ "${SERVER_USER}@${SERVER_IP}:${SERVER_DIR}/public/"
rsync -avz -e "$RSYNC_RSH" ecosystem.config.js "${SERVER_USER}@${SERVER_IP}:${SERVER_DIR}/"
rsync -avz -e "$RSYNC_RSH" .env.local "${SERVER_USER}@${SERVER_IP}:${SERVER_DIR}/.env"

# 5. Restart Application
echo -e "${YELLOW}🔄 Restarting application on server (using PM2)...${NC}"
ssh "${SSH_KEY[@]}" "${SERVER_USER}@${SERVER_IP}" "cd ${SERVER_DIR} && (pm2 reload chicken-inn || pm2 start ecosystem.config.js) && pm2 save"

echo -e "${GREEN}🎉 Deployment Complete!${NC}"
