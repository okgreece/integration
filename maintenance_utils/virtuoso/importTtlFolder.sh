#!/usr/bin/env bash
# 1st Argument: $1 = Folder Path in /dumps where data gets imported from

IMPORT_FOLDER=$1
DBA_PASSWORD=$2

docker exec dockerconfig_virtuoso_staging_1 /bin/sh /importDumpttlFiles.sh $IMPORT_FOLDER $DBA_PASSWORD