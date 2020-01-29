const S = require('sequelize');
const db = require('./db');

class User extends S.Model {}

User.init({
    name: {
        type: S.STRING,
        allowNull: false,
    },
    email: {
        type: S.STRING, // 255 text limit
        unique: true, // Si hay un email ya registrado te tira error //
        allowNull: false,
        validate: {
            isEmail: true,
        },
    }
}, {
    sequelize: db,
    modelName: 'user'
});

class Page extends S.Model {}

Page.init({
    title: {
        type: S.STRING,
        allowNull: false,
    },
    urltitle: {
        type: S.STRING,
        allowNull: false,
    },
    route: {
        type: S.VIRTUAL,
        get() {
            return "/wiki/" + this.urltitle // CUANDO TENES UN VIRTUAL Y UN GET NO HAY QUE PONER UN THIS ADENTRO, SE PUEDE CAER EN UN LOOP INFINITO
            // EL MODO CORRECTO SERIA //
            // return "/wiki"$(this.getDataValue("urlTitle"))
        }
    },
    content: {
        type: S.TEXT, // no limit
        allowNull: false,
    },
    status: {
        type: S.ENUM('open', 'closed'),
        defaultValue: "open"
    }
    // ,
    // date: {
    //     type: S.DATE,
    //     defaultValue: S.NOW
    // },
}, {
    sequelize: db,
    modelName: 'page'
});

Page.addHook('beforeValidate', (page, options) => {
    let titulo = page.dataValues.title

    function generateUrlTitle(variabli) {
        if (variabli) {
            return variabli.replace(/\s+/g, '_').replace(/\W/g, '');
        } else {
            return Math.random().toString(36).substring(2, 7);
        }
    }
    page.dataValues.urltitle = generateUrlTitle(titulo)

});

module.exports = {
    Page: Page,
    User: User
};