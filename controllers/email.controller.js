
const AppError = require('../utils/error.utils.js');
const sendEmailMiddleware = require('../middlewares/sendEmail.middleware.js'); // Renamed import

exports.contact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const userMsg = `Name: ${name}\n Email: ${email}\n Message: ${message}`;
    const sentMessage = await sendEmailMiddleware.sendMessage(userMsg); // Renamed variable to avoid conflict
    if (!sentMessage) {
      return next(
        new AppError("Message not sent", 400)
      );
    }
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    return next(
      new AppError(error, 400)
    );
  }
};