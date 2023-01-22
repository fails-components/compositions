## Migration script
The node package in this directory transfer files from a local asset directory to an openstack based object storage and vice versa.
It is useful for migrating to the cloud or for backup.

# Setup
Create an `.env`file with the following variables:

```
# where to save your  files, "fs" (default) for filesystem, or "openstackswift"
FILE_TYPE="fs", usually "fs"
FILEDIR="C:\\PrivateDaten\\Projekte\\failscomponents\\failslib\\apphandler\\files"

# note all parameters as for the cloud case are also supported,
# so that in princple cloud2cloud and file2file transfer are possible as well



# where to save your static file, "fs" (default) for filesystem,"s3",
# or "openstackswift" usually "openstack swift"
CLOUD_TYPE="openstackswift"

# If you use swift storage set the following variables
CLOUD_SWIFT_ACCOUNT="your swift account"
CLOUD_SWIFT_CONTAINER="containername"
CLOUD_SWIFT_KEY="keyforswiftaccess"
CLOUD_SWIFT_BASEURL="baseurlforstorage"
CLOUD_SWIFT_AUTH_BASEURL = "baseurlforauthentication"
CLOUD_SWIFT_USERNAME="your openstack/swift username"
CLOUD_SWIFT_PASSWORD="password for your openstack/swift account"
CLOUD_SWIFT_DOMAIN="domainname"
CLOUD_SWIFT_PROJECT="projectid"

#if you use S3 storage set the following variables
CLOUD_S3_AK="ACCESSKEY"
CLOUD_S3_SK="SECUREKEY"
CLOUD_S3_REGION="region"
CLOUD_S3_BUCKET="bucketname"
CLOUD_S3_HOST="s3.at.your.provider.com"

# note all parameters as for the file case are also supported,
# so that in princple cloud2cloud and file2file transfer are possible as well
```

# Running the script

For copying files to the cloud (config starting with `CLOUD`), run
```
npm run 2cloud
```

For copying files to the local file store (config starting with `FILE`)
```
npm run 2file
```

For copying files missing files to either store run
```
npm run syncmissing
```
note, this does not delete files.

For syncing the cloud store to the local store (INCLUDING delete!)
```
npm run syncCloudToFiles
```

For local store  to the cloud (INCLUDING delete!)
```
npm run syncFilesToCloud
```

Please note the script are not connected to the main database and will also sync stale files.