const AWS = require('aws-sdk')
const DYNAMO_DB_TABLE = 'examDB'


module.exports.handler = (event, context, callback) => {
  const s3 = new AWS.S3()
  const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  const sourceBucket = event.Records[0].s3.bucket.name
  const sourceKey = event.Records[0].s3.object.key

  console.log(`Loading data from S3 (${sourceBucket}/${sourceKey})`)

  s3.getObject({
    Bucket: sourceBucket,
    Key: sourceKey,
  }, (err, data) => {
    if (err !== null) return callback(err, null)

    const filedata = JSON.parse(data.Body.toString('utf-8'))

    for (let i = 0; i < filedata.length; i++) {
      const params = {
        TableName: DYNAMO_DB_TABLE,
        Item: {
          'id' : {S: filedata[i].id},
          'login': {S: filedata[i].login},
          'name': {S: filedata[i].name},
          'role': {S: filedata[i].role}
        }
      };

      ddb.putItem(params, function(err, data) {
        if (err) return callback(err, null)

        console.log(`Item ${filedata[i].id} successfully loaded to DynamoDB (${DYNAMO_DB_TABLE})`)
      })
    }
  })

}