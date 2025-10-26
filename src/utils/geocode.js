const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaXNyZXphbCIsImEiOiJjbWg3a2wwaDIwa3luMmpwY3Q2bnd3NW1iIn0.C8iJ7l7yNgn0X6BSUa4DVQ`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Tidak dapat terkoneksi ke layanan lokasi!", undefined);
    } else if (!response.body.features || response.body.features.length === 0) {
      console.log("Response body:", response.body); // tambahkan log debug
      callback("Tidak dapat menemukan lokasi. Coba lokasi lain.", undefined);
    } else {
      const data = response.body.features[0];
      callback(undefined, {
        latitude: data.center[1],
        longitude: data.center[0],
        location: data.place_name,
      });
    }
  });
};

module.exports = geocode;
