import { MongoClient } from "mongodb";

export async function insertIntoCollection(data) {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db("weatherDB");

    // Create time-series collection if not exists
    const collections = await db
      .listCollections({ name: "zoneData" })
      .toArray();
    if (collections.length === 0) {
      await db.createCollection("zoneData", {
        timeseries: {
          timeField: "date",
          metaField: "district",
          granularity: "minutes",
        },
      });
      console.log("Time-series collection created");
    } else {
      console.log("Collection already exists");
    }

    const result = await db.collection("zoneData").insertMany(data);
    console.log(result.insertedCount, "documents inserted");
  } finally {
    await client.close();
  }
}
