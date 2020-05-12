// var express = require("express");



var db = require("../models");


module.exports = function (app) {
    app.get("/", function (req, res) {
        console.log("works")
        db.laptops.findAll({ raw: true }).then(function (laptopData) {
            // var hbsObject = {
            //     laptop_data: laptopData
            // };
            // console.log(hbsObject);  
            console.log(laptopData);

            res.render("index", { laptop_data: laptopData });
            // res.json(laptopData)

            // res.render("index", hbsObject);
            // res.json(data)
        });
    });

    app.get("/sell", function (req, res) {
        console.log("sell page works")
        res.render("sell");
    });

}