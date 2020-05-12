
var db = require("../models");

// Routes
module.exports = function (app) {


  app.get("/api/mushrooms", function (req, res) {
    db.mushrooms.findAll({}).then(function (dbmushrooms) {
      res.json(dbmushrooms);
    });
  });


  app.post("/api/mushrooms", function (req, res) {
    db.mushrooms.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      brand: req.body.brand,
      model: req.body.model,
      operating_system: req.body.operating_system,
      laptop_condition: req.body.laptop_condition,
      processor: req.body.processor,
      graphics: req.body.graphics,
      ram: req.body.ram,
      screen_dimension: req.body.screen_dimension,
      hd_storage: req.body.hd_storage,
      release_year: req.body.release_year,
      summary: req.body.summary,
      price: req.body.price,
      main_photo: req.body.main_photo,
      additional_photos: req.body.additional_photos
    }).then(function (dbmushrooms) {
      console.log("36")
      res.json(dbmushrooms);
    })
      .catch(function (err) {
        console.log(err)
        res.json(err);
      });
  });

  app.delete("/api/mushrooms/:id", function (req, res) {
    db.mushrooms.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbmushrooms) {
        res.json(dbmushrooms);
      });
  });
};
