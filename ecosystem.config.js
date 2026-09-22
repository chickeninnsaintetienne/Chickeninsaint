module.exports = {
    apps: [
        {
            name: 'chicken-inn',
            script: 'server.js', // Standalone build entry point
            cwd: __dirname, // Deployment directory
            instances: 1,
            mode: 'fork', // Force fork mode (safer for standalone)
            autorestart: true,
            watch: false,
            max_memory_restart: '400M',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
                HOSTNAME: '0.0.0.0'
            }
        }
    ]
};
