#!/usr/bin/env bash

# Start Virtuoso server:
chmod a+x -R /etc/cron.*/
#cp /virtuoso.ini /usr/local/virtuoso-opensource/var/lib/virtuoso/db/virtuoso.ini
syslog-ng
anacron
cron

echo "export DBA_PASSWORD=$DBA_PASSWORD" > /setEnv

cd / && find . -name "*virtuoso.trx*" | xargs -i rm "{}"
cd / && find . -name "*virtuoso.lck*" | xargs -i rm "{}"

#/usr/bin/supervisord
/bin/sh /virtuoso.sh


