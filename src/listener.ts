import mqtt from "mqtt";
import { topic, url } from "./env";
import { insertIntoCollection } from "./mongo";
const client = mqtt.connect(url);

client.on("connect", () => {
  console.log("Broker connected");

  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Waiting message on ${topic} ...`);
    }
  });
});

client.on("message", (topic, message) => {
  console.log(`Message received on ${topic} : ${message.toString()}`);
  const data = JSON.parse(message.toString()) as unknown as ZoneData[];

  insertIntoCollection(
    data.map((v) => {
      return { ...v, date: new Date(v.date) };
    }),
  );
});
