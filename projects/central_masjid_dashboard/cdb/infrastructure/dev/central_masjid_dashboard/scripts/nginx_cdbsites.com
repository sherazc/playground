################
# Remember to verify that all server.server_name are correct
# logs are under /var/log/nginx/
################


# Wordpress and PHP site
server {
  listen 80;
  root /opt/central_masjid_dashboard/wordpress/;
  index index.php index.html index.htm index.nginx-debian.html;

  server_name www2.masjiddashboard.com;

  location = /favicon.ico {
    log_not_found off;
    access_log off;
  }

  # site detail file for search engines https://www.robotstxt.org/robotstxt.html
  location = /robots.txt {
    allow all;
    log_not_found off;
    access_log off;
  }

  location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
  }

  # This will make wordpress permalinks work
  location / {
    try_files $uri $uri/ /index.php?q=$uri$args;
  }

  # Block access to apache's .htaccess file
  location ~ /\.ht {
    deny all;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
    expires max;
    log_not_found off;
  }
}


# Tomcat Proxy pass
server {
  listen 80;
  server_name www.masjiddashboard.com cdb.masjiddashboard.com masjiddashboard.com;

  # spring boot sets X-Frame-Options=deny header
  # because of which <iframe> was not working
  # below setting will unset X-Frame-Options header
  proxy_hide_header X-Frame-Options;

  location / {
    proxy_pass http://localhost:8085;
  }
}
