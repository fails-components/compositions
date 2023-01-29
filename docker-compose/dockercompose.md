You can use the files in this directory to easily setup an installation of fails on a single computer using the *docker-compose* command. Or you can use this configuration as basis for a more complex setup using other container orchestration tools. For using Kubernetes please look into the helmchart directory.

First step is to create a *.env* files with the configuration variables:
```
FAILS_TAG="master" # optional tag of fails container, either a version tag or a branch tag

FAILS_KEYS_SECRET="YOURKEYFORJWTKEYGENERATION"
# Static secret only required, if the assets are served via nginx
FAILS_STATIC_SECRET="ASECRETFORUSERUPLOADEDASSETSWITHSECUREDURLS"
# Choose the type of storage for your assets "nginx" (default) or "openstackswift"
FAILS_STATIC_WEBSERV_TYPE="nginx"
# were to save your static file, "fs" (default) for filesystem, or "openstackswift"
FAILS_STATIC_SAVE_TYPE="fs"

# If you use swift storage set the following variables
#FAILS_SWIFT_ACCOUNT="Accountnameofyourswiftbucket"
#FAILS_SWIFT_CONTAINER="ContainerNameofYourURL"
#FAILS_SWIFT_KEY="KeyUsedForSignedURLsForYourSwiftStorage"
#FAILS_SWIFT_BASEURL="https://somestorageprovider.org"
#FAILS_SWIFT_USERNAME="UserNameForAccessingYourBucket"
#FAILS_SWIFT_PASSWORD="PasswordForYourUserName"
#FAILS_SWIFT_AUTH_BASEURL = "https://auth.somestorageprovider.org"
#FAILS_SWIFT_DOMAIN="DomainForYourStorage"
#FAILS_SWIFT_PROJECT="ProjectForYourStorage"

# if you use s3 storage set the following values
FAILS_S3_AK="AKFORKEYGENERATION"
FAILS_S3_SK="SKFORKEYGENERATION"
FAILS_S3_REGION="youregion"
FAILS_S3_BUCKET="yourbucket"
FAILS_S3_HOST="hostofyours3provider"
FAILS_S3_ALTURL="alternativehostnameforyoururls"


FAILS_LMS_LIST="TOPUNIVERSITY|https://yourschool.edu/lti/certs.php|https:/yourschool.edu/lti/token.php|https://yourschool.edu/lti/auth.php|yourschool.edu/ TOPUNIVERSITY2|https://yourschool2.edu/lti/certs.php|https:/yourschool2.edu/lti/token.php|https://yourschool2.edu/lti/auth.php|yourschool2.edu/"
# you can pipe custom support contact info and messages into the system for the lms app
FAILS_APP_CONFIG_JSON="{\"support\": { \"text\": \"Please contact our support at\", \"url\": \"https://fabolous-support.de\"}, \"maintenance\": {\"message\": \"The system is going for maintenace at\"}}"


REDIS_DATA_DIR="/path/to/your/redis/db"
REDIS_PASS="yourredispassword"
# Specifiy the docker volume for your mongo db
# note you have to setup a database `fails` inside the mongodb directory 
# and set username and password manually
MONGO_DATA_VOLUME="volumeforyourmongodb"
MONGO_BACKUP_DIR="/path/to/your/mongodb/backup"
MONGO_USER="usernameforfailsinmongodb"
MONGO_PASS="passwordforthisuser"
#MONGO_OPTIONS="--wiredTigerCacheSizeGB 0.5"

# must also be provided, if not stored on file system, but then the dir can be empty
ASSETS_DATA_DIR="/path/to/your/users/assets"

FAILS_COOKIE_KEY="keytogeneratecookiesforstickysessioninloadbalancing"

CERT_FILE="/path/to/your/certificate/file/cert.pem"

FAILS_LMS_COURSE_WHITELIST="9999 8888"
FAILS_HTTP_PORT=80
FAILS_HTTPS_PORT=443

```
*FAILS_LMS_COURSE_WHITELIST* should only be used, if you want to use a whitelist, this is perfect for a limited beta test. *FAILS_HTTP_PORT* and *FAILS_HTTPS_PORT* should only be used, if they differ from the default ports.
You can find more details about the configuration variables in the *docker-compose.yml* file or in the source code of the components.

You can fire the fails server up with:
```
docker-compose up -d
```
if you have a working docker installation with docker compose.

## Installation
For installation instructions for a containerized envoironment, please see the [fails-components/compositions](https://github.com/fails-components/compositions "fails-components/compositions") repository.
