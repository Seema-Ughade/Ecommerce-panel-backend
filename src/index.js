const express = require('express');
const { dbConnect } = require('../config/dbConnection');
const dotenv = require('dotenv');
const cors = require('cors');
const categoryRoutes = require('../routes/categoryRoutes');
const subCategoryRoutes = require('../routes/subCategoryRoutes');
const BlogcategoryRoutes = require('../routes/BlogcategoryRoutes');
const childCategoryRoutes = require('../routes/childCategoryRoutes');
const productRoutes = require('../routes/productRoutes');
const DigitalProductRoutes = require('../routes/DigitalProductRoutes');
const postRoutes = require('../routes/postRoutes');
const socialLinksRoutes = require('../routes/socialLinksRoutes');
const shippingMethodsRouter = require('../routes/shippingMethodsRoutes');
const packagingRoutes = require('../routes/packagingRoutes');
const pickupLocationsRoutes = require('../routes/pickupLocationsRoutes');
const sliderRoutes = require('../routes/sliderRoutes');
const serviceRoutes = require('../routes/serviceRoutes');
const partnerRoutes = require('../routes/partnerRoutes');
const faqRoutes = require('../routes/faqRoutes');
const pageRoutes = require('../routes/pageRoutes');
const paymentGatewayRoutes = require('../routes/paymentGatewayRoutes');
const currencyRoutes = require('../routes/currencyRoutes');
const fontRoutes = require('../routes/fontRoutes');
const roleRoutes = require('../routes/roleRoutes');
const staffRoutes = require('../routes/staffRoutes');
const couponRoutes = require('../routes/couponRoutes');

dotenv.config();

const port = process.env.PORT || 4000;
const hostname = process.env.HOST_NAME || '0.0.0.0';

const app = express();

dbConnect();

// Enable CORS for all routes

app.use(cors());

app.use(express.json());

app.use('/uploads', express.static('uploads')); // Serve uploaded images
app.use('/api/categories', categoryRoutes); // Routes for categories
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/Blogcategories', BlogcategoryRoutes);
app.use('/api/childcategories', childCategoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/Digitalproducts', DigitalProductRoutes);
app.use('/api/posts', postRoutes); // Use post routes
app.use('/api/social-links', socialLinksRoutes);
app.use('/api/shipping-methods', shippingMethodsRouter);
app.use('/api/packagings', packagingRoutes);
app.use('/api/pickup-locations', pickupLocationsRoutes);
app.use('/api/sliders', sliderRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/payment-gateways', paymentGatewayRoutes);
app.use('/api/currencies', currencyRoutes);
app.use('/api/fonts', fontRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/staffs', staffRoutes);
app.use('/api/coupons', couponRoutes);



app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

// give backend for this form give controller model route and index.js file code for this give updated code 
