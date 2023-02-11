import { authService } from "../services/index.js";

// for login
const loginUser = async (req, res) => {
  try {
    const result = await authService.loginService(req.body, res);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const registerUser = (req, res) => {
  const registered = authService.registerService(req.body, res);
};

const forgetPasswordUser = (req, res) => {
  const fp = authService.fpService(req.body, res);
};

const requestForgotPassword = (req, res) => {
  authService.requestForgotPassword(req, res);
};

const resetPassword = (req, res) => {
  authService.resetPassword(req, res);
};

const snsNotify = (req, res) => {
  authService.snsNotify(req, res);
};

export const authController = {
  loginUser,
  registerUser,
  forgetPasswordUser,
  requestForgotPassword,
  resetPassword,
  snsNotify,
};
