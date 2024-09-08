import { Request, Response } from "express";
import User, { IUser } from "../../model/user";
import CryptoJS from 'crypto-js';

console.log(process.env.PASSWORDHASHKEY)

export const encryptPassword = (password: string): string => {
  const ciphertext = CryptoJS.AES.encrypt(password, process.env.PASSWORDHASHKEY as string).toString();
  return ciphertext;
};

// Function to decrypt a password
export const decryptPassword = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.PASSWORDHASHKEY as string);
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  return originalPassword;
};

//#region Create User
export async function createUser(request: Request, response: Response) {

  try {

    const email = request.body.email

    var targetUser = await User.findOne({ "email": email });

    if (!targetUser) {

      var encryptPass = encryptPassword(request.body.password)

      const newUser = new User({ email: request.body.email, password: encryptPass })
      await newUser.save()

      response.status(200).json({ status: "success", data: newUser._id });
    }
    else{
      response.status(400).json({ status: "failed", data: "User Already Registered" });
    }

  }

  catch (error) {

    if (error instanceof Error) {
      console.log(error.message);
      response.status(500).json({ status: "failed", data: error.message });
    }

  }
}
//#endregion

//#region  Get User Info
export async function getUserInfo(request: Request, response: Response) {

  var email = request.body.email
  var password = request.body.password

  try {
    var user = await User.findOne({ "email": email });

    if (user && user.password) {

      var decryptpass = decryptPassword(user.password)
      console.log(user.password)
      console.log(decryptpass)
      console.log(password)

      if (password == decryptpass) {
        return response.status(200).json({ status: "success", data: user._id });
      }

    }

    //return response.status(200).json({ status: "success", data: user });
    response.status(400).json({ status: "fail", data: "Invalid User" });


  }

  catch (error) {

    if (error instanceof Error) {
      console.log(error.message);
      response.status(500).json({ status: "failed", data: error.message });
    }

  }

}
//#endregion

//#region  Update User Info
export async function updateUser(request: Request, response: Response) {
  response.status(200).json({ status: "success", data: 'Update User' });
}
//#endregion


