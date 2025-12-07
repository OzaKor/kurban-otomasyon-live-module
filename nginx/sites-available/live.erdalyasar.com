server {
    listen 80;
    server_name live.erdalyasar.com;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Handle static files directly with nginx
    # projenin kurulu olduğu kök dizin belirtiliyor
    location /_next/static/ {
        alias /var/www/live.hakankorkmaz.dev/.next/static/;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Handle public files
    location /favicon.ico {
        alias /var/www/live.hakankorkmaz.dev/public/favicon.ico;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location /robots.txt {
        alias /var/www/live.hakankorkmaz.dev/public/robots.txt;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Handle other static assets in public folder
    location /static/ {
        alias /var/www/live.hakankorkmaz.dev/public/;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Proxy all other requests to NextJS
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Handle API routes specifically (optional optimization)
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Error pages
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
}
