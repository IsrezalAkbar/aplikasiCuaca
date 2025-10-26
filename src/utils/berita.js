const request = require("postman-request");

const getBerita = (callback) => {
  const url = `http://api.mediastack.com/v1/news?access_key=7355052441532d370509779383f10efa&countries=id&languages=id&limit=5`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Tidak dapat terkoneksi ke layanan berita!", undefined);
    } else if (response.body.error) {
      console.log("RESPON ERROR:", response.body.error);
      callback("Terjadi kesalahan dalam mengambil berita!", undefined);
    } else {
      console.log("RESPON SUKSES:", response.body.data); // Tambahan penting
      const berita = response.body.data.map((item) => ({
        judul: item.title,
        deskripsi: item.description,
        sumber: item.source,
        url: item.url,
      }));
      callback(undefined, berita);
    }
  });
};

module.exports = getBerita;
