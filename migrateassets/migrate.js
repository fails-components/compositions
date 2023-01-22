import * as dotenv from 'dotenv'
import { FailsAssets } from '@fails-components/security'
dotenv.config()

const fileassets = new FailsAssets({
  datadir: process.env.FILEDIR,
  webservertype: process.env.FILE_TYPE,
  savefile: process.env.FILE_TYPE,
  swift: {
    account: process.env.FILE_SWIFT_ACCOUNT,
    container: process.env.FILE_SWIFT_CONTAINER,
    key: process.env.FILE_SWIFT_KEY,
    baseurl: process.env.FILE_SWIFT_BASEURL,
    authbaseurl: process.env.FILE_SWIFT_AUTH_BASEURL,
    username: process.env.FILE_SWIFT_USERNAME,
    password: process.env.FILE_SWIFT_PASSWORD,
    domain: process.env.FILE_SWIFT_DOMAIN,
    project: process.env.FILE_SWIFT_PROJECT
  },
  s3: {
    AK: process.env.FILE_S3_AK,
    SK: process.env.FILE_S3_SK,
    region: process.env.FILE_S3_REGION,
    bucket: process.env.FILE_S3_BUCKET,
    host: process.env.FILE_S3_HOST
  }
})

const cloudassets = new FailsAssets({
  datadir: process.env.CLOUDDIR,
  webservertype: process.env.CLOUD_TYPE,
  savefile: process.env.CLOUD_TYPE,
  swift: {
    account: process.env.CLOUD_SWIFT_ACCOUNT,
    container: process.env.CLOUD_SWIFT_CONTAINER,
    key: process.env.CLOUD_SWIFT_KEY,
    baseurl: process.env.CLOUD_SWIFT_BASEURL,
    authbaseurl: process.env.CLOUD_SWIFT_AUTH_BASEURL,
    username: process.env.CLOUD_SWIFT_USERNAME,
    password: process.env.CLOUD_SWIFT_PASSWORD,
    domain: process.env.CLOUD_SWIFT_DOMAIN,
    project: process.env.CLOUD_SWIFT_PROJECT
  },
  s3: {
    AK: process.env.CLOUD_S3_AK,
    SK: process.env.CLOUD_S3_SK,
    region: process.env.CLOUD_S3_REGION,
    bucket: process.env.CLOUD_S3_BUCKET,
    host: process.env.CLOUD_S3_HOST
  }
})

const globalfunc = async () => {
  let cassets = cloudassets.getAssetList()
  let fassets = fileassets.getAssetList()
  await Promise.all([cassets, fassets])
  cassets = await cassets
  fassets = await fassets

  const cset = new Set()
  const fset = new Set()
  cassets.forEach((el) => cset.add(el.id))
  fassets.forEach((el) => fset.add(el.id))

  console.log('cloud assets', cassets)
  console.log('file assets', fassets)

  // now we filter the unique records out
  const cunique = cassets.filter((el) => !fset.has(el.id))
  const funique = fassets.filter((el) => !cset.has(el.id))

  console.log(
    'Cloud has ',
    cassets.length,
    ' elements with ',
    cassets.reduce(
      (accumulator, currentValue) => accumulator + currentValue.size,
      0
    ),
    'bytes, ',
    cunique.length,
    ' elements are unique'
  )
  console.log(
    'Files has ',
    fassets.length,
    ' elements with ',
    fassets.reduce(
      (accumulator, currentValue) => accumulator + currentValue.size,
      0
    ),
    'bytes, ',
    funique.length,
    ' elements are unique'
  )
  let uploadFiles = false
  let delUniqFiles = false
  let downloadFiles = false
  let delUniqCloud = false
  if (process.argv.length > 2) {
    switch (process.argv[2]) {
      case '2cloud':
        uploadFiles = true
        break
      case '2files':
        downloadFiles = true
        break
      case 'syncmissing':
        uploadFiles = true
        downloadFiles = true
        break
      case 'syncCloudToFiles':
        downloadFiles = true
        delUniqFiles = true
        break
      case 'syncFilesToCloud':
        uploadFiles = true
        delUniqCloud = true
        break
    }
  }
  if (uploadFiles) {
    console.log('Start uploading files to Cloud')
    for (let i = 0; i < funique.length; i += 1) {
      const portion = funique.slice(i, i + 1)
      try {
        await Promise.all(
          portion.map(async (el) => {
            console.log('upload file', el.id)
            let mime = el.mime
            let mimecall = mime
            if (!mime)
              mimecall = (nmime) => {
                mime = nmime
              }
            const stream = await fileassets.readFileStream(el.id, mimecall)
            cloudassets.saveFile(stream, el.id, mime, el.size)
          })
        )
      } catch (error) {
        console.log('uploading file failed', error)
        throw error
      }
    }
  }
  if (downloadFiles) {
    console.log('Start downloading files to Cloud')
    for (let i = 0; i < cunique.length; i += 1) {
      const portion = cunique.slice(i, i + 1)
      try {
        await Promise.all(
          portion.map(async (el) => {
            console.log('download file', el.id)
            let mime = el.mime
            let mimecall = mime
            if (!mime) {
              mimecall = (nmime) => {
                mime = nmime
              }
            }
            const stream = await cloudassets.readFileStream(el.id, mimecall)
            fileassets.saveFile(stream, el.id, el.mime)
          })
        )
      } catch (error) {
        console.log('downloading file failed', error)
        throw error
      }
    }
  }
  if (delUniqFiles) {
    console.log('Start delete files')
    for (let i = 0; i < funique.length; i += 10) {
      const portion = funique.slice(i, i + 10)

      await Promise.all(
        portion.map(async (el) => {
          console.log('delete file', el.id)
          await fileassets.shadelete(
            el.id,
            el.mime ? fileassets.mimeToExtensionwoDot(el.mime) : ''
          )
        })
      )
    }
  }
  if (delUniqCloud) {
    console.log('Start delete cloud elements')
    for (let i = 0; i < cunique.length; i += 10) {
      const portion = cunique.slice(i, i + 10)

      await Promise.all(
        portion.map(async (el) => {
          console.log('delete cloud object', el.id)
          await cloudassets.shadelete(
            el.id,
            el.mime ? fileassets.mimeToExtensionwoDot(el.mime) : ''
          )
        })
      )
    }
  }
}

globalfunc().catch((error) => {
  console.log('global error', error)
})
