const Order = require('../models/UIorder');

exports.createOrder = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      shippingName,
      address,
      postalCode,
      country,
      paymentMethod,
      items,
      totalAmount
    } = req.body;

    const newOrder = new Order({
      name,
      email,
      phone,
      shippingName,
      address,
      postalCode,
      country,
      paymentMethod,
      items,
      totalAmount
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      orderId: savedOrder._id,
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
};


// Get All Orders
exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json({
        success: true,
        orders
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch orders'
      });
    }
  };
  
  // Get Order by ID
  exports.getOrderById = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }
  
      res.status(200).json({
        success: true,
        order
      });
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch order'
      });
    }
  };
  
  // Update Order
  exports.updateOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      const updatedOrder = await Order.findByIdAndUpdate(id, updates, { new: true });
  
      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }
  
      res.status(200).json({
        success: true,
        order: updatedOrder,
        message: 'Order updated successfully'
      });
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update order'
      });
    }
  };
  
  // Delete Order
  exports.deleteOrder = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedOrder = await Order.findByIdAndDelete(id);
  
      if (!deletedOrder) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Order deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete order'
      });
    }
  };
  