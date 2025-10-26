const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/prediksiCuaca");
const getBerita = require("./utils/berita");
const port = process.env.PORT || 3000;

const app = express();
const direktoriPublic = path.join(__dirname, "../public");
const direktoriViews = path.join(__dirname, "../templates/views");
const direktoriPartials = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", direktoriViews);
hbs.registerPartials(direktoriPartials);
app.use(express.static(direktoriPublic));
//ini halaman/page utama
//ini halaman utama
app.get("", (req, res) => {
  res.render("index", {
    judul: "Aplikasi Cek Cuaca",
    nama: "Isrezal Akbar",
  });
});
//ini halaman bantuan/FAQ (Frequently Asked Questions)

app.get("/bantuan", (req, res) => {
  res.render("bantuan", {
    teksBantuan: "Ini adalah teks bantuan",
  });
});

app.get("/berita", (req, res) => {
  getBerita((error, dataBerita) => {
    if (error) {
      return res.render("berita", {
        judul: "Berita Terkini",
        nama: "Isrezal Akbar",
        error,
      });
    }
    res.render("berita", {
      judul: "Berita Terkini",
      nama: "Isrezal Akbar",
      berita: dataBerita,
    });
  });
});

app.get("/infocuaca", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Kamu harus memasukan lokasi yang ingin dicari",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, dataPrediksi) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          prediksiCuaca: dataPrediksi,
          lokasi: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/tentang", (req, res) => {
  res.render("tentang", {
    judul: "Tentang Saya",
    nama: "Isrezal Akbar",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    judul: "404",
    nama: "Isrezal Akbar",
    pesanKesalahan: "Halaman tidak ditemukan",
  });
});

app.listen(port, () => {
  console.log("Server berjalan pada port " + port);
});
