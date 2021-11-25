'use strict';

const dynamoose = require('dynamoose');

const peopleSchema = new dynamoose.Schema({
    'id': Blob,
    'name': String,
    'phone': String,
});

module.exports = dynamoose.model('people', peopleSchema);