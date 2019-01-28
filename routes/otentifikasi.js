const router = require("express").Router();
const db = require("../konek");
const bodyParser = require("body-parser");
router.use(bodyParser.json());


router.post("/signup", (req, res) => {
    let data = req.body;

    if ((req.body.hasOwnProperty('email') && req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password')) == false) {
        res.send("You need a complete email, username, and password to sign up!");
    }
    else {
        let sql = `SELECT * FROM users WHERE username = '${req.body.username}' OR email = '${req.body.email}'`;
        db.query(sql, (err, result) => {
            if (err) {
                throw err
            }
            else if (result.length > 0) {
                res.send({
                    "signup": "failed",
                    "status": "Anda sudah terdaftar dengan username/email yang sama!"
                });
            }
            else {
                let sql = `INSERT INTO users SET ?`;
                db.query(sql, data, (err, result) => {
                    res.send({
                        "username": req.body.username,
                        "email": req.body.email,
                        "status": "Signup sukses"
                    });
                })
            }
        })
    }
});


router.post("/login", (req, res) => {
    if (req.body.hasOwnProperty('email') && req.body.hasOwnProperty('username')) {
        res.send("Please choose either email or username! You can't use both.");
    }
    else if (!req.body.hasOwnProperty('password')) {
        res.send("You need a password to log in");
    }
    else {
        let sql = `SELECT * FROM users WHERE username = '${req.body.username}' OR email = '${req.body.email}'`;
        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            else if (result == 0) {
                res.send({
                    "login": "failed",
                    "status": "Akun tidak terdaftar"
                });
            }
            else {
                if (req.body.password != result[0].password) {
                    res.send({
                        "login": "failed",
                        "status": "Password salah"
                    });
                }
                else {
                    res.send({
                        "login": "ok",
                        "status": "Login sukses"
                    });
                }
            }
        })
    }
});




module.exports = router;
