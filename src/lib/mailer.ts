// src/app/helpers/mailer.ts

import nodemailer from "nodemailer";
import User from "@/lib/config/models/UserModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Create a hash token based on the user's ID
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update the user document in the database with the generated token and expiry time
    if (emailType === "VERIFY") {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
        { new: true }
      );
    }

    // Create a nodemailer transport
    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "abdulrhman.mahmoud44@gmail.com",
        pass: process.env.GMAIL_SECRET,
      },
    });

    // Compose email options
    const mailOptions = {
      from: "abdulrhman.mahmoud44@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "",
      html: `<p>Click <a href="${
        process.env.NEXTAUTH_URL
      }/Auth/verifyemail?token=${hashedToken}">here</a> to 
                ${emailType === "VERIFY" ? "Verify your email" : ""}</p>`,
    };
    // Send the email
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
