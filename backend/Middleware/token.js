const verifyToken = (req,res,next) => {
    console.log("working");
    next();
}

module.exports = verifyToken;