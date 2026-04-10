# Oracle Cloud (1C1G) Deployment Guide

This site is static and is suitable for Oracle Cloud free-tier instances (1 vCPU / 1 GB RAM).

## 1) Copy files to server

From your local machine:

```bash
scp -r ./personal-lite-site ubuntu@<YOUR_SERVER_IP>:/home/ubuntu/
```

## 2) Install Nginx on server

```bash
sudo apt update
sudo apt install -y nginx
```

## 3) Publish website files

```bash
sudo mkdir -p /var/www/personal-lite-site
sudo rsync -av --delete /home/ubuntu/personal-lite-site/ /var/www/personal-lite-site/
sudo chown -R www-data:www-data /var/www/personal-lite-site
```

## 4) Apply optimized Nginx config

```bash
sudo cp /var/www/personal-lite-site/deploy/nginx-oracle-1c1g.conf /etc/nginx/nginx.conf
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## 5) Open inbound rules

- Oracle Cloud VCN Security List / NSG: allow TCP `80` (and `443` if HTTPS).
- If UFW is enabled:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload
```

## 6) Optional HTTPS (recommended)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d <YOUR_DOMAIN>
```

## Runtime profile (expected)

- Nginx worker: `1` (low memory footprint).
- Static serving: near-zero CPU when idle, very low RAM usage.
- This setup is suitable for personal portfolio traffic on 1C1G.
