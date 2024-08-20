import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/User";
import OrderItem from "../models/Order-items";
import Product from "../models/Product";
import Address from "../models/Address";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SEND_USER_MAIL,
    pass: process.env.SEND_PASS_MAIL,
  },
});

export const sendConfirmationEmail = (email) => {
  const mailOptions = {
    from: process.env.SEND_USER_MAIL,
    to: email,
    subject: "Thông tin đăng ký tài khoản tại FURNITUREⓇ ",
    text: "Cảm ơn bạn đã đăng ký tài khoản của chúng tôi!",
    html: `<div>
        <h1>Chào mừng bạn đã đến với FURNITUREⓇ</h1> 
        <p>Cảm ơn Anh/chị đã đăng ký tài khoản tại cửa hàng của chúng tôi.</p>
        <p>Địa chỉ email đã dùng để đăng ký tài khoản: ${email}</p>
        <p>Anh/chị vui lòng truy cập vào tài khoản theo địa chỉ <a style="color: blue">http://localhost:5173/</a> để thực hiện đặt hàng và quản lý giao dịch nhanh chóng thuận tiện hơn.</p>
        <p>Truy cập vào cửa hàng để tiếp tục mua sắm với chúng tôi</p>
     </div>`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err);
    }
    console.log("Email đã được gửi: " + info.response);
  });
};

export const sendConfirmationEmailOrder = async (order) => {
  console.log("order: " + order);
  const user = await User.findOne({ _id: order.userId });

  const addresses = await Address.find({ userId: user._id });

  const address = addresses.find(
    (address) => address._id.toString() === order.addressId.toString()
  );

  if (!address) {
    console.error("Address not found");
    return;
  }

  const orderItemIds = order.orderItems.map((item) => item._id);
  const orderItems = await OrderItem.find({ _id: { $in: orderItemIds } });

  if (!orderItems && orderItems.length <= 0) {
    console.error("OrderItem is empty");
  }
  const productIds = orderItems.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: productIds } });

  if (!products && products.length <= 0) {
    console.error("Product is empty");
  }
  const orderItemsWithProducts = orderItems.map((item) => {
    const product = products.find(
      (product) => product._id.toString() === item.productId.toString()
    );
    return {
      ...item.toObject(),
      product,
    };
  });

  const totalPrice = orderItemsWithProducts.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0
  );

  const mailOptions = {
    from: process.env.SEND_USER_MAIL,
    to: user.email,
    subject: "Xác nhận đơn hàng từ FURNITURE ",
    text: "Cảm ơn bạn đã đặt hàng của chúng tôi!",
    html: `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 20px; max-width: 600px; border: 1px solid #ddd;">
  <div style="border-bottom: 2px solid #ddd; padding-bottom: 15px; margin-bottom: 15px;">
    <h1 style="font-size: 24px; color: #007bff; margin: 0;">Xin chào Anh/chị ${
      user.userName
    }</h1>
    <p style="font-size: 16px; margin: 10px 0;">Cảm ơn Anh/chị đã đặt hàng tại FURNITURE!</p>
    <p style="font-size: 16px; margin: 0;">Đơn hàng của Anh/chị đã được tiếp nhận, chúng tôi sẽ nhanh chóng liên hệ với Anh/chị.</p>
  </div>
  
  <div style="display: flex; gap: 15px; padding: 15px 0;">
    <div style="flex: 1; background-color: #f0f8ff; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
      <h4 style="font-size: 18px; color: #333; margin: 0 0 10px;">Thông tin đặt hàng</h4>
      <p style="margin: 5px 0;">${user.userName}</p>
      <p style="margin: 5px 0;">${user.email}</p>
      <p style="margin: 5px 0;">${user.phone}</p>
      
      <h4 style="font-size: 18px; color: #333; margin: 15px 0 10px;">Phương thức thanh toán</h4>
      <p style="margin: 5px 0;">Thanh toán khi nhận hàng (COD)</p>
      
      <h4 style="font-size: 18px; color: #333; margin: 15px 0 10px;">Thông tin đơn hàng</h4>
      <p style="margin: 5px 0;">Mã đơn hàng: #${order._id
        .toString()
        .slice(0, 5)
        .toUpperCase()}</p>
    </div>
    
    <div style="flex: 1; background-color: #eafaf1; padding: 15px; border-radius: 8px; border: 1px solid #ddd; margin-left: 10px">
      <h4 style="font-size: 18px; color: #333; margin: 0 0 10px;">Địa chỉ nhận hàng</h4>
      <p style="margin: 5px 0;">${user.userName}</p>
      <p style="margin: 5px 0;">${address.street} <span>${
      address.ward
    }</span> <span>${address.district}</span> <span>${
      address.city
    }</span> <span>${address.country}</span></p>
      <p style="margin: 5px 0;">${user.phone}</p>
      
      <h4 style="font-size: 18px; color: #333; margin: 15px 0 10px;">Trạng thái đơn hàng</h4>
      <p style="margin: 5px 0;">${order.paymentStatus}</p>
      
      <h4 style="font-size: 18px; color: #333; margin: 15px 0 10px;">Ngày đặt hàng</h4>
      <p style="margin: 5px 0;">${order.orderDate}</p>
    </div>
  </div>
  
  <!-- Thông tin sản phẩm trong đơn hàng -->
  <div style="margin-top: 20px;">
    <h4 style="font-size: 18px; color: #333; margin: 0 0 10px;">Chi tiết đơn hàng</h4>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <thead>
        <tr>
          <th style="border-bottom: 2px solid #ddd; padding: 10px; text-align: left;">Ảnh</th>
          <th style="border-bottom: 2px solid #ddd; padding: 10px; text-align: left;">Tên sản phẩm</th>
          <th style="border-bottom: 2px solid #ddd; padding: 10px; text-align: right;">Giá</th>
          <th style="border-bottom: 2px solid #ddd; padding: 10px; text-align: right;">Số lượng</th>
          <th style="border-bottom: 2px solid #ddd; padding: 10px; text-align: right;">Tổng tiền</th>
        </tr>
      </thead>
      <tbody>
       ${orderItemsWithProducts.map(
         (item) => `
        <tr>
            <td style="padding-top: 10px; padding-bottom: 10px; text-align: center;>
             <img src="${item.product.imageProduct}" alt="${
           item.product.productName
         }" style="width: 60px; height: auto;"/>
            </td>
            <td style="padding: 10px;">${item.product.productName}</td>
            <td style="padding: 10px; text-align: right;">${item.price.toLocaleString(
              "vi-VN"
            )}VND</td>
            <td style="padding: 10px; text-align: right;">${item.quantity.toLocaleString(
              "vi-VN"
            )}</td>
            <td style="padding: 10px; text-align: right;">${(
              item.quantity * item.price
            ).toLocaleString("vi-VN")}VND</td>
          </tr> 
          `
       )}
        <tr>
          <td colspan="4" style="padding: 10px; text-align: right; font-weight: bold;">Tổng cộng: ${(
            totalPrice * 25000
          ).toLocaleString("vi-VN")}VND</td>
          <td style="padding: 10px; text-align: right; font-weight: bold;">${(
            totalPrice * 25000
          ).toLocaleString("vi-VN")}VND</td>
        </tr>
        
         
        
      </tbody>
    </table>
  </div>

  <div style="border-top: 2px solid #ddd; padding-top: 15px; margin-top: 15px;">
    <p style="font-size: 16px; margin: 0;">Trân trọng,</p>
    <p style="font-size: 16px; margin: 0;">Đội ngũ FURNITURE</p>
  </div>
</div>
`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err);
    }
    console.log("Email đã được gửi: " + info.response);
  });
};
