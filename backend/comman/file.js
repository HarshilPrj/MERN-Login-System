const DBconnect = require("../Database/database");

module.exports = {
    async uploadFile(req, res) {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ Message: "Please Add a file" });
        }

        const sql = "INSERT INTO users (fileName) VALUES ?";
        const values = [[req.file.filename]];
        DBconnect.query(sql, [values], (err, result) => {
            return res.send({ Message: "File is successfully uploaded" });
        });
    },
};
