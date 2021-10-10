# Fancy automated internet lecture system (**FAILS**) - components

This package is part of FAILS.
A web based system developed out of university lectures.
Bascially it is a continous pen based notepad editor  delivering **electronic chalk**  to several beamers in the lecture hall.

The students can follow the lecture also on their tablets and notebooks and can scroll independently and ask questions to the lecturer using a chat function.
Furthermore polls can be conducted.

After the lecture is completed a pdf can be downloaded at anytime.

FAILS components is completely integrated using LTI into LMS such as Moodle.

It is the reincarnation of a system, we are using at our theoretical physics institute for several years and currently under heavy *initial development*.

The system is written with containerization and scalability in mind.

Currently it is advided to **not use** FAILS in a productive environment.

FAILS is licensed via GNU Affero GPL version 3.0 

## Container compositions
You can use the files in this repository to easily setup of installation of fails on a single computer using the *docker-compose* command. Or you can use this configuration as basis for a more complex setup using other container orchestration tools.

First step is to create a *.env* files with the configuration variables:
```
FAILS_KEYS_SECRET="YOURKEYFORJWTKEYGENERATION"
FAILS_STATIC_SECRET="ASECRETFORUSERUPLOADEDASSETSWITHSECUREDURLS"

FAILS_LMS_LIST="TOPUNIVERSITY|https://yourschool.edu/lti/certs.php|https:/yourschool.edu/lti/token.php|https://yourschool.edu/lti/auth.php|yourschool.edu/ TOPUNIVERSITY2|https://yourschool2.edu/lti/certs.php|https:/yourschool2.edu/lti/token.php|https://yourschool2.edu/lti/auth.php|yourschool2.edu/"

REDIS_DATA_DIR="/path/to/your/redis/db"
FAILS_REDIS_PASS="yourredispassword"
MONGO_DATA_VOLUME="volumeforyourmongodb"
MONGO_BACKUP_DIR="/path/to/your/mongodb/backup"
FAILS_MONGO_USER="usernameforfailsinmongodb"
FAILS_MONGO_PASS="passwordforthisuser"

ASSETS_DATA_DIR="/path/to/your/users/assets"

FAILS_COOKIE_KEY="keytogeneratecookiesforstickysessioninloadbalancing"

CERT_FILE="/path/to/your/certificate/file/cert.pem"

FAILS_LMS_COURSE_WHITELIST="9999 8888"
FAILS_HTTP_PORT=80
FAILS_HTTPS_PORT=443

```
*FAILS_LMS_COURSE_WHITELIST* should only be used, if you want to use a whitelist. *FAILS_HTTP_PORT* and *FAILS_HTTPS_PORT* should only be used, if you differ from the default ports.
You can find more details about the configuration variables in the *docker-compose.yml* file or in the source code of the components.

You can fire the fails server up with:
```
docker-compose up
```
if you have a working docker installation.

## Installation
For installation instructions for a containerized envoironment, please see the [fails-components/compositions](https://github.com/fails-components/compositions "fails-components/compositions") repository.
