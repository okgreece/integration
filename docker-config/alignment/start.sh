#!/usr/bin/env bash
# Install App:
cd $APP_DIR
composer install
php artisan key:generate
chmod -R a+rwx $APP_DIR


# Configure PHP date.timezone
echo "date.timezone = $PHP_TIMEZONE" > /usr/local/etc/php/conf.d/timezone.ini

# Inject environemt variables into config file:
envsubst < "$APP_DIR/.env" > "$APP_DIR/.env_injected"
mv "$APP_DIR/.env_injected" "$APP_DIR/.env"
cp deployment/default_config.xml storage/app/projects/default_config.xml
cp deployment/LinkSpecificationLanguage.xsd storage/app/projects/LinkSpecificationLanguage.xsd

sleep 5
sh $APP_DIR/initDB.sh

# Configure Apache Document Root
mkdir -p $APACHE_DOC_ROOT
chown -R www-data:www-data $APACHE_DOC_ROOT
chown -R www-data:www-data $APP_DIR/storage

mkdir -p /var/www/.silk && chown -R www-data:www-data /var/www/.silk

sed -i "s|DocumentRoot /var/www/html\$|DocumentRoot $APACHE_DOC_ROOT|" /etc/apache2/sites-available/000-default.conf
echo "<Directory $APACHE_DOC_ROOT>" > /etc/apache2/conf-available/document-root-directory.conf
echo "	AllowOverride All" >> /etc/apache2/conf-available/document-root-directory.conf
echo "	Require all granted" >> /etc/apache2/conf-available/document-root-directory.conf
echo "</Directory>" >> /etc/apache2/conf-available/document-root-directory.conf
a2enconf "document-root-directory.conf"

chmod a+rwx -R $APP_DIR

exec "apache2-foreground"
