const jwt = require("jsonwebtoken");
const User = require("../models/User");
exports.isAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    console.log({token});

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.userId);
        if(!user){
            return res.json({ success: false, message: "invalid Token!" });
        }
        req.user = user;
        next();
    } catch (error) {
      console.log("Error:", error.message);
        if (error.name === "JsonWebTokenError") {
            return res.json({ success: false, message: "unauthorized access!" });
        }
        if (error.name === "TokenExpiredError") {
            return res.json({ success: false, message: "son expired try sign in!" });
        }

        res.res.json({ success: false, message: "Internal server error!" });
    }

  } else {
    console.log("No token found!");
    res.json({ success: false, message: "No token found!" });
  }
};


