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
However, you can **use** it for small groups of lectures.
Feedback on error/issues is appreciated via githubs functions.

FAILS is licensed via GNU Affero GPL version 3.0 

## Container compositions - Docker Compose
Please find in the docker-compose directory, instructions how to use fails during development or for small installations using docker compose.

## Container compositions - Helm chart
Please find in the helmchart directory, instructions how to use fails for larger installations using Kubernetes and Helm. The helm chart is not yet published and in an early alpha stage.


