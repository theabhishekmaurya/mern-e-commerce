const jwt=require("jsonwebtoken")

module.exports = verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        return reject(err);
      }

      resolve(user);
    });
  });
};
