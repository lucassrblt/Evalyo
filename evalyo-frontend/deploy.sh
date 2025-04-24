#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# FTP server details
FTP_HOST=$1
FTP_USERNAME=$2
FTP_PASSWORD=$3
LOCAL_DIR=$4
REMOTE_DIR=$5

# Print debug information
echo "FTP_HOST: $FTP_HOST"
echo "FTP_USERNAME: $FTP_USERNAME"
echo "LOCAL_DIR: $LOCAL_DIR"
echo "REMOTE_DIR: $REMOTE_DIR"

# Create hello.txt file
echo "Hello from GitHub Actions deployment on $(date)" > hello.txt

# Use lftp to mirror the local directory to the remote directory, skipping SSL verification
lftp -d -c "
set ssl:verify-certificate no;
open -u $FTP_USERNAME,$FTP_PASSWORD $FTP_HOST;
mirror -R --verbose --only-newer --parallel=10 --exclude node_modules/ --exclude .git/ $LOCAL_DIR $REMOTE_DIR;
bye;
"

# Alternatively, ensure hello.txt is uploaded even if mirror didn't upload it
lftp -d -c "
set ssl:verify-certificate no;
open -u $FTP_USERNAME,$FTP_PASSWORD $FTP_HOST;
put -O $REMOTE_DIR hello.txt;
bye;
"