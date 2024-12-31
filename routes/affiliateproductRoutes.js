const express = require('express');
const router = express.Router();
const productController = require('../controllers/affiliatedproductController');
const upload = require('../middlewares/multerMiddleware');

router.post('/', upload.fields([
    { name: 'featureImage', maxCount: 1 },
    { name: 'galleryImages', maxCount: 5 }
]), productController.createProduct);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', upload.fields([
    { name: 'featureImage', maxCount: 1 },
    { name: 'galleryImages', maxCount: 5 }
]), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;

