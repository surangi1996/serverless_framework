'use strick'
// import { createRequire } from 'module'
// const require = createRequire(import.meta.url);
const AWS = require('aws-sdk')
/// import AWS from "aws-sdk"

module.exports.createCustomer = async(event) => {
    const body = JSON.parse(JSON.stringify(Buffer.from(event.body, 'base64').toString()))
    const dynamoDb = new AWS.DynamoDB.DocumentClient()
    const putParams = {
        TableName: process.env.DYNOMODB_CUSTOMER_TABLE,
        // TableName: my-api-customerTable-dev,
        Item: {
            primary_key: body.name,
            email: body.email
        }
    }
    await dynamoDb.put(putParams).promise()

    return {
        statusCode: 201
    }
}