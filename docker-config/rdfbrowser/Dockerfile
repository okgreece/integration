FROM php:7.1.20-apache

#RUN echo "deb http://ftp.de.debian.org/debian jessie-backports main" >> /etc/apt/sources.list

RUN apt-get -y update && apt-get install -y git gettext bash curl mysql-client zip unzip gnupg software-properties-common

#RUN echo 'deb http://packages.dotdeb.org jessie all' > /etc/apt/sources.list.d/dotdeb.list
#RUN curl http://www.dotdeb.org/dotdeb.gpg | apt-key add -
RUN apt-get update -y && \
    apt-get install -y libsqlite3-dev libsqlite3-0 && \
    docker-php-ext-install pdo_sqlite

#RUN add-apt-repository ppa:ondrej/php

#RUN apt-get update &&  \
#    apt-get install -y php-sqlite3

RUN git config --global url."https://github.com/".insteadOf git@github.com: && \
    git config --global url."https://".insteadOf git://

# Install Composer:
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Enable mbstring && install
# RUN docker-php-ext-configure mbstring --enable-mbstring && docker-php-ext-install mbstring

# Install additional packages:
#RUN apt-get update -y && apt-get install -y libgd3 libapache2-mod-php7.1 \
#    php7.1-xml php7.1-json php7.1-xsl php7.1-mcrypt \
#    php7.1-common php7.1-zip php7.1-mbstring php7.1-gd libpng-dev libraptor2-dev
RUN apt-get install -y libpng-dev libraptor2-dev libmcrypt-dev
RUN docker-php-ext-install gd  xsl mcrypt zip mbstring 
RUN apt-get upgrade -y

# Enable Apache mod_rewrite
RUN a2enmod rewrite
#RUN a2enmod php7.1
RUN a2enmod proxy
RUN a2enmod proxy_http
RUN a2enmod actions

ENV PHP_TIMEZONE Europe/Berlin

# Install app:
# Configure Apache Document Root
ENV APACHE_DOC_ROOT /var/www/RDFBrowser/public/
ENV APP_DIR /var/www/RDFBrowser
WORKDIR $APP_DIR

# Update app from github repo
ADD https://api.github.com/repos/okgreece/RDFBrowser/git/refs/heads/master /version.json
RUN git clone https://github.com/okgreece/RDFBrowser.git $APP_DIR/

COPY ./.env $APP_DIR/.env
RUN composer install

RUN php artisan key:generate
RUN chmod -R a+rwx $APP_DIR

EXPOSE 80
COPY ./start.sh /start.sh
CMD ["/bin/sh", "/start.sh"]
