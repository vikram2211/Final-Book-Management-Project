const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    console.log("Authentication");
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
