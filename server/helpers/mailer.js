const nodemailer = require("nodemailer");
const path = require("path");
const {keys} = require(path.join(__dirname, "..", "config", "config"))
// asyncHandler
const { asyncHandler } = require(path.join(
  __dirname,
  "..",
  "middlewares",
  "asyncHandler"
));

exports.createOrder = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: keys.GMAIL_USER,
        pass: keys.GMAIL_PASS,
      },
    });
    const mailOptions = {
      from: "no-reply@medicinebuy.com",
      to: email,
      subject: "A new order is received",
      text: "Order placed successfully.",
      html: `
      <p>Customer name:</p>
      <p>Total products: ${order.products.length}</p>
      <p>Total cost: ${order.amount}</p>
      <p>Login to dashboard to the order in detail.</p>
  `,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err.message);
    return;
  }
};