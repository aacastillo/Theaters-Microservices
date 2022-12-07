// export let db: {[key: string]: string | object} = {};

// function initDB() {
//     db["1"] = {
//         id: "1",
//         name: "brh.",
//         address: "asdfasdf",
//         movies: ["asdf", "brasdf", "aslkdfa"]
//     };
//     db["2"] = {
//         id: "2",
//         name: "brddfdh.",
//         address: "asdfasdf",
//         movies: ["asdf", "brasdf", "aslkdfa"]
//     };
// }

// export function startupDB() {
//     // connect to db
//     initDB();
// }

import { MongoClient } from 'mongodb';

export async function connectDB(): Promise<MongoClient> {
  const uri = process.env.DATABASE_URL;

  if (uri === undefined) {
    throw Error('DATABASE_URL environment variable is not specified');
  }

  const mongo = new MongoClient(uri);
  await mongo.connect();
  return await Promise.resolve(mongo);
}

export async function initDB() {
  console.log("initing db");
  const mongo: MongoClient = await connectDB();
  const db = mongo.db();

  if (await db.listCollections({ name: 'theaters' }).hasNext()) {
    console.log('Collection already exists. Skipping initialization.');
    return;
  }

  const theaters = db.collection('theaters');
  const result = await theaters.insertMany([
    { name: 'bruh', address: 'ehhhasdfklas', zip: 22525, description: "asdgkjsdg", movies: ["asdfa", "lasdlkfs"] },
    { name: 'assd', address: 'asdfddd', zip: 12321, description: "asdgadsgas", movies: ["dfd", "lasdlfdfdkfs"] },
    { name: 'dfdfg', address: 'qieke', zip: 22444, description: "asdfdggb", movies: ["dd", "gggg"] },
  ]);

  console.log(`Initialized ${result.insertedCount} products`);
  console.log(`Initialized:`);

  for (let key in result.insertedIds) {
    console.log(`  Inserted product with ID ${result.insertedIds[key]}`);
  }
}
