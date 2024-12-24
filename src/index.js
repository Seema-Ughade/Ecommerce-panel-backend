const express = require('express');
const { dbConnect } = require('../config/dbConnection');
const dotenv = require('dotenv');
const cors = require('cors');
const categoryRoutes = require('../routes/categoryRoutes');
const subCategoryRoutes = require('../routes/subCategoryRoutes');
const BlogcategoryRoutes = require('../routes/BlogcategoryRoutes');
const childCategoryRoutes = require('../routes/childCategoryRoutes');

const productRoutes = require('../routes/productRoutes');
const listingproductroute = require('../routes/listingproductroute');

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
const authRoutes = require('../routes/authRoutes');
const cityRoutes = require('../routes/cityRoutes');
const statesRoutes = require('../routes/statesRoutes');
const customerRoutes = require('../routes/customerRoutes');
const orderRoutes = require('../routes/orderRoutes');
const subscriptionPlanRoutes = require("../routes/subscriptionPlanRoutes");
const VendorRoutes = require('../routes/VendorRoutes')
const offerRoutes = require('../routes/offerRoutes');
const dealRoutes = require('../routes/dealRoutes');


//rider
const riderRoutes = require('../routes/riderRoutes');


dotenv.config();

const port = process.env.PORT || 4000;
const hostname = process.env.HOST_NAME || '0.0.0.0';

const app = express();

dbConnect();

// Enable CORS for all routes

app.use(cors());

app.use(express.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);



app.use('/uploads', express.static('uploads')); // Serve uploaded images
app.use('/api/categories', categoryRoutes); // Routes for categories
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/Blogcategories', BlogcategoryRoutes);
app.use('/api/childcategories', childCategoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/listingproduct', listingproductroute);
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
app.use('/api/auth', authRoutes);
app.use('/api', cityRoutes);
app.use('/api/states', statesRoutes);
app.use('/api/customers', customerRoutes);
app.use("/api", subscriptionPlanRoutes);

//rider
app.use('/api/riders', riderRoutes);
app.use('/api/auth', VendorRoutes)
app.use('/api/offers', offerRoutes);

app.use('/api/deals', dealRoutes);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

// give backend for this form give controller model route and index.js file code for this give updated code 
