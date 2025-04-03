// import nodemailer from "nodemailer";
// import { NextApiRequest, NextApiResponse } from "next";
// import { NextResponse } from "next/server";
// interface EmailData {
//   name: string;
//   email: string;
//   message: string;
// }

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== "POST") {
//     res.statusCode = 405;
//     return NextResponse.json({ message: "Method not allowed" });
//   }

//   const { name, email, message }: EmailData = req.body;

//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // or 'STARTTLS'
//     auth: {
//       user: "manthan.jsharma@gmail.com",
//       pass: "tgrn ntcw atcj qhzz",
//     },
//   });

//   const mailOptions = {
//     from: email,
//     to: "manthan.jsharma@gmail.com",
//     subject: `Message from ${name}`,
//     text: message,
//   };

//   //   try {
//   //     await transporter.sendMail(mailOptions);
//   //     res.status(200).json({ message: "Email sent successfully" });
//   //   } catch (error) {
//   //     console.error(error);
//   //     res.status(500).json({ message: "Error sending email" });
//   //   }
//   // };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.statusCode = 200;
//     return NextResponse.json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error(error);
//     res.statusCode = 500;
//     return NextResponse.json({ message: "Error sending email" });
//   }
// };

// export const POST = handler;
