const DynamoDb = require('../lib/aws/Dynamodb.js');
const SWAPI = require('../lib/services/SWAPI.js');
const translateKeys = require('../lib/helper/translateKeys.js');
const db = new DynamoDb();
const swapi = new SWAPI();

module.exports.handler = async (event) => {
  try {
    const { limit = 10, offset = 0 } = event.queryStringParameters || {};
    const parsedLimit = parseInt(limit, 10);
    const parsedOffset = parseInt(offset, 10);

    const [swapiResult, dynamoResult] = await Promise.all([
      swapi.getPeople(),
      db.findAll()
    ]);

    const result = [...swapiResult, ...dynamoResult];

    const translatedResult = result.map(person => translateKeys(person));

    const paginatedResult = translatedResult.slice(parsedOffset, parsedOffset + parsedLimit);

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: paginatedResult,
        count: translatedResult.length, 
        totalPages: Math.ceil(translatedResult.length / parsedLimit), 
        currentPage: Math.floor(parsedOffset / parsedLimit) + 1, 
        pageSize: parsedLimit,
      }),
    };
  } catch (err) {
    console.error("error", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not retrieve characters' }),
    };
  }
};