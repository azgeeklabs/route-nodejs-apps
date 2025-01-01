import { User } from "../../database/models/user.model.js";
import { SystemError } from "../utils/systemError.js";

const isUserExist = async (req, res, next) => {
  if (!req.body.email) {
    return next(new SystemError("Email is required", 400));
  }
  const isUserExist = await User.findOne({
    email: req.body.email.toLowerCase(),
  });
  if (isUserExist) {
    // return res.status(409).json({ message: "User already exists" });
    return next(new SystemError("User already exists", 409));
  }
  next();
};

export { isUserExist };
