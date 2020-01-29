const express = require('express');
const router = express.Router();
const models = require("../models")
const Page = models.Page
const User = models.User

router.use(express.json())

//ACA ESTAS SIEMPRE PARADOS EN /WIKI/

router.get("/add", function (req, res) {
    res.render("addpage")
})

router.get('/:urlTitle', function (req, res, next) {
    function generateUrlTitle(variabli) {
        if (variabli) {
            return variabli.replace(/\s+/g, '_').replace(/\W/g, '');
        } else {
            return Math.random().toString(36).substring(2, 7);
        }
    }
    var urlPosta = generateUrlTitle(req.params.urlTitle)
    Page.findOne({
            where: {
                urltitle: urlPosta
            }
        })
        .then(function (foundPage) {
            res.render("wikipage", {
                page: foundPage
            });
        })
        .catch(next);
});

router.post("/", function (req, res) {
    //User findOrCreate esto lo que hace es preguntar si existe, si no existe lo crea al mismo tiempo
    var page = Page.create({
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
        })
        .then(algo => {
            res.redirect(algo.route)
        })
        .catch(err => console.error(err))
})

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