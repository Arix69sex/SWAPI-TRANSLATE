const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

class DynamoDb {
    constructor() {
        this.tableName = process.env.DYNAMODB_TABLE;
    }

    async save(character) {
        const newItem = {
            TableName: this.tableName,
            Item: character,
        };
        await db.put(newItem).promise();
        return character;
    }

    async findAll() {
        const params = {
            TableName: this.tableName,
        };
        const result = await db.scan(params).promise();
        return result.Items;
    }
}

module.exports = DynamoDb;
