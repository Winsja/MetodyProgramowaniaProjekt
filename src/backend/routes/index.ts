import express from 'express';
import getStatus from './status/get.status';
import postUser from './user/post.user';
import loginUser from './user/login.user';

const router = express.Router();

// router.use((req, res, next) => {
//     const dataDzis = new Date(Date.now());
//     console.log(`Time: ${dataDzis.toString()}`);
//     next();
// });

router.get('/', (req, res) => {
    res.send('Home Page');
});

const apiRoutes = [getStatus, postUser, loginUser];

apiRoutes.forEach((route) => {
    router[route.method](route.path, route.validators, route.handler);
});

export default router;
