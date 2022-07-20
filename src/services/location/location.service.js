import { locations } from "./location.mock";
import camelize from "camelize";

export const locationRequest = (search) => {
  return new Promise((resolve, reject) => {
    const location = locations[search.trim()];
    if (!location) {
      reject("Location not found");
    }
    resolve(location);
  });
};

export const locationTransform = (data) => {
  const formattedResponse = camelize(data);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng };
};
