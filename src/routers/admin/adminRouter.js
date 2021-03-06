const router = require('express').Router();

const adminProductsRouter = require('./adminProductsRouter');
const adminCategoriesRouter = require('./adminCategoriesRouter');
const adminCategoryProductsRouter = require('./adminCategoryProductsRouter');
const adminUsersRouter = require('./adminUsersRouter');
const adminOrdersRouter = require('./adminOrdersRouter');
const adminPicturesRouter = require('./adminPicturesRouter');

router.use('/products', adminProductsRouter);
router.use('/categories', adminCategoriesRouter);
router.use('/categoryProducts', adminCategoryProductsRouter);
router.use('/users', adminUsersRouter);
router.use('/orders', adminOrdersRouter);
router.use('/pictures', adminPicturesRouter);



module.exports = router;