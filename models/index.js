const S = require('sequelize');
const db = require('./db');

class User extends S.Model {}

User.init({
    name: {
        type: S.STRING,
    },
    email: {
        type: S.STRING,
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
    },
    urltitle: {
        type: S.STRING,
        validate: {
            isUrl: true,
        },
    },
    content: {
        type: S.TEXT,
    },
    status: {
        type: S.ENUM('open', 'closed'),
    },
}, {
    sequelize: db,
    modelName: 'page'
});

module.exports = {
    Page: Page,
    User: User
  };