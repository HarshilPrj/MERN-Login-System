const loginURL = "/login";

const checkURL = async (req, res, next) => {
  const url = req.url;
  if (url === loginURL) {
    return next();
  } else {
    res.status(500).send({ 500: "Server error" });
  }
};

module.exports = checkURL;
