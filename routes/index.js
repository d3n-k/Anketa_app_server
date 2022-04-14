const Router = require('express');
const router = new Router;
const userRouter = require('./userRouter');
const itemRouter = require('./itemRouter');
const reportRouter = require('./reportRouter');
const resultRouter = require('./resultRouter');
const select_nameRouter = require('./select_nameRouter');
const cathedraRouter = require('./cathedraRouter');
const massivRouter = require('./massivRouter');
const massivLocalRouter = require('./massivLocalRouter');
const reportLocalRouter = require('./reportLocalRouter');
const facultyRouter = require('./facultyRouter');
const cath_typeRouter = require('./cath_typeRouter');


router.use('/user', userRouter);
router.use('/item', itemRouter);
router.use('/report', reportRouter);
router.use('/result', resultRouter);
router.use('/select_name', select_nameRouter);
router.use('/cathedra', cathedraRouter);
router.use('/massiv', massivRouter);
router.use('/massivLocal', massivLocalRouter);
router.use('/reportLocal', reportLocalRouter);
router.use('/faculty', facultyRouter);
router.use('/cath_type', cath_typeRouter);


module.exports = router;