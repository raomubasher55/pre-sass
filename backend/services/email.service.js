const sendEmail = require('../utils/sendEmail');

/**
 * Send verification email
 * @param {string} email - Recipient's email address
 * @param {string} token - Verification token
 * @param {string} code - Optional verification code
 * @returns {Promise<void>}
 */
const sendVerificationEmail = async (email, token, code) => {
//   const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const verificationLink = `http://localhost:4000/api/v1/store/verify-email?token=${token}`;

  const subject = 'Verify Your Email';
  const message = `Please verify your email address using this link: ${verificationLink} or code: ${code}`;
  const html = `
    <h1>Email Verification</h1>
    <p>Please verify your email by clicking the link below:</p>  
    <a href="${verificationLink}">Verify Email</a> 
    <p>Or use this verification code: <strong>${code}</strong></p>
  `;

  await sendEmail({ email, subject, message, html });
};


/**
 * Send password reset email
 * @param {string} email - Recipient's email address
 * @param {string} token - Password reset token
 * @returns {Promise<void>}
 */
const sendPasswordResetEmail = async (email, token , host , protocol) => {
    const resetUrl = `${protocol}://${host}/api/v1/password/reset/${token}`;
    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email, please ignore it.`;
  
    const subject = 'Reset Your Password';
    const html = `
      <h1>Password Reset</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
    `;
  
    await sendEmail({ email, subject, message, html });
  };

/**
 * Send welcome email
 * @param {string} email - Recipient's email address
 * @param {string} name - User's name
 * @returns {Promise<void>}
 */
const sendWelcomeEmail = async (email, name) => {
  const subject = 'Welcome to Our Platform!';
  const message = `Welcome ${name}! We're excited to have you on board.`;
  const html = `
    <h1>Welcome to Our Platform, ${name}!</h1>
    <p>We're thrilled to have you here. Feel free to explore and enjoy our services.</p>
  `;

  await sendEmail({ email, subject, message, html });
};

/**
 * Send promotional email
 * @param {string} email - Recipient's email address
 * @param {string} promotion - Details about the promotion
 * @returns {Promise<void>}
 */
const sendPromotionalEmail = async (email, promotion) => {
  const subject = 'Exciting Promotion Just for You!';
  const message = `Check out this amazing offer: ${promotion}`;
  const html = `
    <h1>Don't Miss Out!</h1>
    <p>${promotion}</p>
  `;

  await sendEmail({ email, subject, message, html });
};

/**
 * Send account suspension email
 * @param {string} email - Recipient's email address
 * @param {string} reason - Reason for account suspension
 * @returns {Promise<void>}
 */
const sendAccountSuspensionEmail = async (email, reason) => {
  const subject = 'Your Account Has Been Suspended';
  const message = `Your account has been suspended for the following reason: ${reason}`;
  const html = `
    <h1>Account Suspension</h1>
    <p>Your account has been suspended due to: ${reason}</p>
    <p>Please contact support for further assistance.</p>
  `;

  await sendEmail({ email, subject, message, html });
};

/**
 * Send password change confirmation email
 * @param {string} email - Recipient's email address
 * @returns {Promise<void>}
 */
const sendPasswordChangeConfirmationEmail = async (email) => {
  const subject = 'Password Changed Successfully';
  const message = `Your password has been changed successfully. If you did not initiate this change, contact support immediately.`;
  const html = `
    <h1>Password Changed</h1>
    <p>Your password has been updated. If you didn't make this change, please contact support immediately.</p>
  `;

  await sendEmail({ email, subject, message, html });
};

/**
 * Send payment confirmation email
 * @param {string} email - Recipient's email address
 * @param {string} transactionId - Transaction ID
 * @param {string} amount - Payment amount
 * @returns {Promise<void>}
 */
const sendPaymentConfirmationEmail = async (email, transactionId, amount) => {
  const subject = 'Payment Confirmation';
  const message = `Your payment of ${amount} has been successfully processed. Transaction ID: ${transactionId}`;
  const html = `
    <h1>Payment Confirmed</h1>
    <p>Your payment of ${amount} has been processed successfully.</p>
    <p>Transaction ID: <strong>${transactionId}</strong></p>
  `;

  await sendEmail({ email, subject, message, html });
};

/**
 * Send account deletion email
 * @param {string} email - Recipient's email address
 * @param {string} name - User's name
 * @returns {Promise<void>}
 */
const sendAccountDeletionEmail = async (email, name) => {
  const subject = 'Account Deletion Confirmation';
  const message = `Dear ${name}, your account has been deleted successfully.`;
  const html = `
    <h1>Account Deleted</h1>
    <p>Dear ${name},</p>
    <p>Your account has been deleted successfully. We're sad to see you go!</p>
  `;

  await sendEmail({ email, subject, message, html });
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail,
  sendPromotionalEmail,
  sendAccountSuspensionEmail,
  sendPasswordChangeConfirmationEmail,
  sendPaymentConfirmationEmail,
  sendAccountDeletionEmail,
};
