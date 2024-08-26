const jwt = require("jsonwebtoken");


const authenticate = async (req, res, next) => {
    let jwtToken

    const authHeader = req.headers['authorization']

    if (authHeader !== undefined) {
        jwtToken = authHeader.split(" ")[1]
    }
    if (jwtToken === undefined) {
        res.status(401);
        res.send("Invalid JWT Token");
    }
    else {
        jwt.verify(jwtToken, "MY_SECRET_TOKEN", async(err, payload) => {
            if (err) {
                res.status(401);
                res.send("Invalid JWT Token");
            }
            else {
                req.user=payload.userId;
                next()
            }
        })
    }
}

module.exports = authenticate