const DynamoDb = require('../lib/aws/Dynamodb.js');
const { v4: uuidv4 } = require('uuid');  // Import UUID v4
const db = new DynamoDb();
const { Validator } = require('jsonschema');

const characterSchema = {
    "type": "object",
    "properties": {
      "birth_year": { "type": "string" },
      "eye_color": { "type": "string" },
      "films": {
        "type": "array",
        "items": { "type": "string", "format": "uri" }
      },
      "gender": { "type": "string" },
      "hair_color": { "type": "string" },
      "height": { "type": "string" },
      "homeworld": { "type": "string", "format": "uri" },
      "mass": { "type": "string" },
      "name": { "type": "string" },
      "skin_color": { "type": "string" },
      "created": { "type": "string", "format": "date-time" },
      "edited": { "type": "string", "format": "date-time" },
      "species": {
        "type": "array",
        "items": { "type": "string", "format": "uri" }
      },
      "starships": {
        "type": "array",
        "items": { "type": "string", "format": "uri" }
      },
      "url": { "type": "string", "format": "uri" },
      "vehicles": {
        "type": "array",
        "items": { "type": "string", "format": "uri" }
      }
    },
    "required": [
      "birth_year", "eye_color", "films", "gender", "hair_color", 
      "height", "homeworld", "mass", "name", "skin_color", 
      "created", "edited", "species", "starships", "url", "vehicles"
    ],
    "additionalProperties": false
  };
  
const validator = new Validator();

module.exports.handler = async (event) => {
  const characterData = JSON.parse(event.body);
  
  const validationResult = validator.validate(characterData, characterSchema);

  if (validationResult.errors.length > 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Invalid data',
        details: validationResult.errors.map(err => err.stack),
      }),
    };
  }

  try {
    const uniqueId = uuidv4(); 

    const characterDataWithId = { id: uniqueId, ...characterData };

    const result = await db.save(characterDataWithId);
    return {
        statusCode: 201,
        body: JSON.stringify({
            data: result,
          })
      };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create character.' }),
    };
  }
};