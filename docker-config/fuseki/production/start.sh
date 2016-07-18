#!/usr/bin/env bash

# Add cronjob:
cp /cronjobs/syncTriplestores /etc/periodic/15min/syncTriplestores

# Start Fuseki
find . -name *.lock | xargs -i rm {}
cd $FUSEKI_HOME && sh ./fuseki-server --config=/config.ttl --set tdb:fileMode=direct