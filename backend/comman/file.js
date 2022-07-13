const DBconnect = require("../Database/config ");

module.exports = {
    async uploadFile(req, res) {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ Message: "Please Add a file" });
        }

        const sql = "INSERT INTO users (fileName) VALUES (' " + req.file.filename + " ')";
        DBconnect.query(sql, (err, result) => {
            return res.send({Message: 'File is successfully uploaded'})
        });
    },
};
