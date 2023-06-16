import express from 'express';

import getStatus from './status/get.status';
import postUser from './user/post.user';
import loginUser from './user/login.user';
import postOfertyPracy from './ofertyPracy/post.ofertyPracy';
import getOfertyPracy from './ofertyPracy/get.ofertyPracy';
import getUzytkownicyByRola from './user/get.uzytkownicyByRola';
import getUzytkownikByEmail from './user/get.uzytkownikByEmail';
import patchUzytkownik from './user/patch.uzytkownik';

const router = express.Router();

// router.use((req, res, next) => {
//     const dataDzis = new Date(Date.now());
//     console.log(`Time: ${dataDzis.toString()}`);
//     next();
// });

router.get('/', (req, res) => {
    res.send('Home Page');
});

const apiRoutes = [
    getStatus,
    postUser,
    loginUser,
    postOfertyPracy,
    getOfertyPracy,
    getUzytkownicyByRola,
    getUzytkownikByEmail,
    patchUzytkownik,
];

apiRoutes.forEach((route) => {
    router[route.method](route.path, route.validators, route.handler);
});

export default router;
