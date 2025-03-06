import Order from '../models/orderModel.js';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    console.log('Creating order with:', { items, shippingAddress, paymentMethod });

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create Razorpay order if payment method is not COD
    let razorpayOrder = null;
    if (paymentMethod !== 'COD') {
      razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100, // Convert to paise
        currency: 'INR',
        receipt: `order_rcpt_${Date.now()}`
      });
      console.log('Razorpay order created:', razorpayOrder);
    }

    // Create order in database
    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentInfo: {
        paymentMethod,
        razorpayOrderId: razorpayOrder?.id,
        paymentStatus: 'PENDING'
      },
      totalAmount,
      orderStatus: 'PLACED'
    });

    console.log('Order created in DB:', order);

    // Format the response properly
    const response = {
      success: true,
      data: {
        order: order.toObject(),
        razorpayOrder: razorpayOrder ? {
          id: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency
        } : null
      }
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single order
export const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product');

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
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get logged in user orders
export const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId, razorpayPaymentId, status } = req.body;
    console.log('Payment update request:', { orderId, razorpayPaymentId, status });

    // Find order by Razorpay order ID
    const order = await Order.findOne({
      'paymentInfo.razorpayOrderId': orderId
    });

    if (!order) {
      console.error('Order not found for Razorpay order ID:', orderId);
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    console.log('Found order:', order);

    // Verify payment with Razorpay
    try {
      const payment = await razorpay.payments.fetch(razorpayPaymentId);
      console.log('Razorpay payment details:', payment);

      if (payment.status === 'captured') {
        // Update order status
        order.paymentInfo.razorpayPaymentId = razorpayPaymentId;
        order.paymentInfo.paymentStatus = 'COMPLETED';
        order.orderStatus = 'CONFIRMED';
        await order.save();

        console.log('Order updated successfully:', order);

        return res.status(200).json({
          success: true,
          order
        });
      } else {
        console.error('Payment not captured:', payment.status);
        return res.status(400).json({
          success: false,
          message: 'Payment not captured'
        });
      }
    } catch (paymentError) {
      console.error('Error verifying payment:', paymentError);
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    console.error('Update payment status error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}