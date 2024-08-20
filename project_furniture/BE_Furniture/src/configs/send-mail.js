import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/User";
import OrderItem from "../models/Order-items";
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
  const user = await User.findOne({ _id: order.userId });
  const orderItemIds = order.orderItems.map((item) => item._id);

  const orderItems = await OrderItem.find({ _id: { $in: orderItemIds } });

  const mailOptions = {
    from: process.env.SEND_USER_MAIL,
    to: user.email,
    subject: "Xác nhận đơn hàng từ FURNITURE ",
    text: "Cảm ơn bạn đã đặt hàng của chúng tôi!",
    html: `<div>
       <div style="border-bottom: 1px padding: 5px">
        <h1>Xin chào Anh/chị ${user.userName}</h1> 
        <p>Cảm ơn Anh/chị đã đặt hàng tại FURNITURE!.</p>
        <p>Đơn hàng của Anh/chị đã được tiếp nhận, chúng tôi sẽ nhanh chóng liên hệ với Anh/chị.</p>
       </div>
       <div style="display: flex; gap: 10px; padding: 5px">
        <div style="flex: 1; background-color: lightblue;">
          <div>
            <h4 style="padding-top: 5px, padding-bottom: 5px">Thông tin đặt hàng</h4>
            <p style:"padding-top: 4px">${user.userName}</p>
            <p style:"padding-top: 3px, padding-bottom: 3px">${user.email}</p>
            <p>#${user.phone}</p>
          </div>
          <div>
            <h4 style="padding-top: 5px, padding-bottom: 5px">Phương thức thanh toán</h4>
            <p>Thanh toán khi nhận hàng (COD)</p>
          </div>
          <div>
            <h4 style="padding-top: 5px, padding-bottom: 5px">Thông tin đơn hàng</h4>
            <p>Mã đơn hàng: ${order._id
              .toString()
              .slice(0, 5)
              .toUpperCase()}</p>
          </div>
        </div>
        <div style="flex: 1; background-color: lightgreen;">
          <div>
            <h4 style="padding-top: 5px, padding-bottom: 5px">Địa chỉ nhận hàng</h4>
            <p style:"padding-top: 4px">${user.userName}</p>
            <p style:"padding-top: 3px, padding-bottom: 3px">Địa chir</p>
            <p>#${user.phone}</p>
          </div>

          <div>
            <h4 style="padding-top: 5px, padding-bottom: 5px">Phương thức vận chuyển</h4>
            <p>Thanh toán khi nhận hàng (COD)</p>
          </div>
          <div>
            <h4 style="padding-top: 10px, padding-bottom: 5px">Ngày đặt hàng</h4>
          </div>
        </div>
      </div>
     </div>`,
  };
  console.log("mailOptions", mailOptions);
};
