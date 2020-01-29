const express = require('express');
const router = express.Router();
const wiki = require("./wiki")
const users = require("./users")
const models = require("../models")
const Page = models.Page


router.use("/wiki", wiki)

router.get("/", function (req, res) {
    Page.findAll()
        .then(function (foundPage) {
            res.render("index", {
                pages: foundPage
            });
        })
        .catch(err => {
            console.log(err)
        });
})

module.exports = router