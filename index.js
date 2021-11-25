'use strict';

let uuid = require('uuid').v4;
let peopleModel = require('./people.schema');

exports.handler = async (event) => {

  console.log('EVENT', event);

  if (event.httpMethod === 'POST') {
    try {
      const { name, phone } = JSON.parse(event.body);
      const id = uuid();

      const record = new peopleModel({ id, name, phone });
      console.log('RECORD', record);

      const data = await record.save();

      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };

    } catch (err) {
      return {
        statusCode: 500,
        response: err.message,
      };
    }
  } else if (event.httpMethod === 'GET') {
    try {
      // either there is or is not an id
      const id = event.pathParameters && event.pathParameters.id;

      let data;

      if (id) {
        const list = await peopleModel.query('id').eq(id).exec();
        console.log('LIST', list);
        data = list[0];
      } else {
        data = await peopleModel.scan().exec();
      }
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      }

    } catch (err) {
      return {
        statusCode: 500,
        response: err.message
      }
    }
  } else if (event.httpMethod === 'PUT') {
    try {
      const name = JSON.parse(event.body);

      const id = event.pathParameters && event.pathParameters.id;

      let updatedPerson;

      if (id) {
        updatedPerson = await peopleModel.update({ 'id': id }, { 'name': name});
      }
      return {
        statusCode: 200,
        body: `Name updated to ${JSON.stringify(updatedPerson.name)}`,
      }

    } catch (err) {
      return {
        statusCode: 500,
        response: err.message
      }
    }
  } else if (event.httpMethod === 'DELETE') {
    try {
      const name = JSON.parse(event.body);

      const id = event.pathParameters && event.pathParameters.id;

      let updatedPerson;

      if (id) {
        updatedPerson = await peopleModel.update({ 'id': id });
      }
      return {
        statusCode: 200,
        body: `Name deleted`,
      }

    } catch (err) {
      return {
        statusCode: 500,
        response: err.message
      }
    }
  } 

};