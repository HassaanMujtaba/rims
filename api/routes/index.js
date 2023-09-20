const router = require('express').Router();
const { vendors } = require('./vendors');
const { files } = require('./files');
const { products } = require('./products');
const { orders } = require('./orders');
const { clients } = require('./clients');
const { users } = require('./users');

router.use('/vendors', vendors);
router.use('/products', products);
router.use('/orders', orders);
router.use('/files', files);
router.use('/clients', clients);
router.use('/users', users);

module.exports = { router };
