import mqtt from "mqtt";
import { topic, url } from "./env";
import { setInterval } from "node:timers";

const client = mqtt.connect(url);

function randomBetween(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(2);
}

function getDatePlusYears(years) {
  const today = new Date();
  today.setFullYear(today.getFullYear() + years);
  return today.toISOString(); // "YYYY-MM-DD"
}

function generateDataForZone(zone) {
  const temperature = randomBetween(5, 35);
  const humidity = +(100 - temperature + randomBetween(-10, 5)).toFixed(2);
  const avgWind = randomBetween(2, 8);
  const maxWind = avgWind + randomBetween(1, 5);
  const maxRainIntensity = randomBetween(0, 20);
  const totalRain = maxRainIntensity * randomBetween(10, 50);
  const seismicity = randomBetween(0.3, 1);
  const gasConcentration = randomBetween(100, 300);

  const disasters = [];

  // Zone-specific disaster rules
  if (zone === "Zone 2" && seismicity > 0.8) {
    disasters.push("earthquake");
  }

  if (zone === "Zone 3") {
    if (seismicity > 0.8) disasters.push("earthquake");
    if (totalRain > 400 && maxWind > 10) disasters.push("flood");
  }

  if (zone === "Zone 4" && totalRain > 400 && maxWind > 10) {
    disasters.push("flood");
  }

  return {
    date: getDatePlusYears(150),
    district: zone,
    temperature,
    humidity,
    average_wind_speed: avgWind,
    max_wind_speed: maxWind,
    max_rain_intensity: maxRainIntensity,
    total_rain: +totalRain.toFixed(2),
    seismicity: +seismicity.toFixed(2),
    gas_concentration: gasConcentration,
    disaster: disasters.length > 0 ? disasters : "none",
  };
}

// Generate data for each zone
const zones = ["Zone 2", "Zone 3", "Zone 4"];

const createData = () => {
  const data = zones.map((zone) => generateDataForZone(zone));
  console.log("Data generated:", data);
  client.publish(topic, JSON.stringify(data));
};

createData();

client.on("connect", async () => {
  console.log("Sender connected to broker");
  setInterval(
    () => {
      createData();
      console.log("Data sent to broker");
    },
    30 * 60 * 1000,
  ); // every 30minutes
});

client.on("disconnect", async () => {
  console.log("Sender disconnected to broker");
});
