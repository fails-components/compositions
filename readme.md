!["FAILS logo"](failslogo.svg )
# Fancy automated internet lecture system (**FAILS**) - components
[![Publish apphandler container](https://github.com/fails-components/apphandler/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/fails-components/apphandler/actions/workflows/docker-publish.yml)
[![Publish authhandler container](https://github.com/fails-components/authhandler/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/fails-components/authhandler/actions/workflows/docker-publish.yml)
[![Publish housekeeping container](https://github.com/fails-components/housekeeping/actions/workflows/docker-build.yml/badge.svg)](https://github.com/fails-components/housekeeping/actions/workflows/docker-build.yml)
[![Publish ltihandler container](https://github.com/fails-components/ltihandler/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/fails-components/ltihandler/actions/workflows/docker-publish.yml)
[![Publish notepadhandler container](https://github.com/fails-components/notepadhandler/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/fails-components/notepadhandler/actions/workflows/docker-publish.yml)
[![Publish noteshandler container](https://github.com/fails-components/noteshandler/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/fails-components/noteshandler/actions/workflows/docker-publish.yml)
[![Publish staticserver container](https://github.com/fails-components/staticserver/actions/workflows/docker-build.yml/badge.svg)](https://github.com/fails-components/staticserver/actions/workflows/docker-build.yml)


This package is part of FAILS.
A web based system developed out of university lectures.
Bascially it is a continous pen based notepad editor  delivering **electronic chalk**  to several beamers in the lecture hall.

The students can follow the lecture also on their tablets and notebooks and can scroll independently and ask questions to the lecturer using a chat function.
Furthermore polls can be conducted.

After the lecture is completed a pdf can be downloaded at anytime.

FAILS components is completely integrated using LTI into LMS such as Moodle.

It is the reincarnation of a system, we are using at our theoretical physics institute for several years. Now *initial development* is almost complete, and the software is tested in current winter term by few docents.

The system is written with containerization and scalability in mind.

Currently it is advised to **not use** FAILS in a large productive environment.
However, you can **use** it for small groups of lectures for **initial tests**.
Feedback on error/issues is appreciated via githubs functions.

FAILS is licensed via GNU Affero GPL version 3.0 

## Container compositions
You can use the files in this repository to easily setup of installation of fails on a single computer using the *docker-compose* command. Or you can use this configuration as basis for a more complex setup using other container orchestration tools.

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
#FAILS_SWIFT_DOMAIN="DomainForYourStorageOrUseProject"
#FAILS_SWIFT_PROJECT="ProjectForYourStorageOrUseDomain"


FAILS_LMS_LIST="TOPUNIVERSITY|https://yourschool.edu/lti/certs.php|https:/yourschool.edu/lti/token.php|https://yourschool.edu/lti/auth.php|yourschool.edu/ TOPUNIVERSITY2|https://yourschool2.edu/lti/certs.php|https:/yourschool2.edu/lti/token.php|https://yourschool2.edu/lti/auth.php|yourschool2.edu/"

REDIS_DATA_DIR="/path/to/your/redis/db"
REDIS_PASS="yourredispassword"
MONGO_DATA_VOLUME="volumeforyourmongodb"
MONGO_BACKUP_DIR="/path/to/your/mongodb/backup"
MONGO_USER="usernameforfailsinmongodb"
MONGO_PASS="passwordforthisuser"
#MONGO_OPTIONS="--wiredTigerCacheSizeGB 0.5"

# must also be provide, if not stored on file system, but then the dir can be empty
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
