const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    console.log("Authentication");

    const token = req.headers["x-api-key"] ;
    if(!token) {
      return res
      .status(400)
      .send({ status: false, message: "Token must be present.", });
    }

    const decodedToken = jwt.verify( token, "thisIsTheSecretKeyForToken(@#$%^&*)" );
    if(!decodedToken) {
      return res
      .status(401)
      .send({ status: false, message: "Invalid Token.", });
    }

    // req.decodedToken = decodedToken;
    // return res
    //   .status(200)
    //   .send({ status: true, message: "Success", data: "auth" });

    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// const authorisation = async (req, res, next) => {
//   try {
//     console.log("Authorisation");
//     // return res
//     //   .status(200)
//     //   .send({ status: true, message: "Success", data: "auth" });

//     next();
//   } catch (error) {
//     return res.status(500).send({ status: false, message: error.message });
//   }
// };

module.exports = {
  auth,
};
