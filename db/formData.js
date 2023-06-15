const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://127.0.0.1:27017/';
const dbName = 'test';

async function retrieveDocuments() {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);

    const collection = db.collection('forms');
    const data = await collection.find().toArray();

    client.close();

    return data;
  } catch (error) {
    console.error('Error retrieving documents:', error);
  }
}

module.exports = retrieveDocuments;