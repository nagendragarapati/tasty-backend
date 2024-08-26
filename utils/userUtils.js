const User = require('../models/userModel')


exports.validateUserData = (userData) => {
    const { fullName, email, password } = userData
    let statusMsg = ""

    if (fullName.length < 3) {
        statusMsg = "Name should be morethan 3 letters"
    }
    else if (!email.includes("@gmail.com")) {
        statusMsg = "Please enter valid email id"
    }
    else if (password.length < 8) {
        statusMsg = "Password must be morethan 7 letters"
    }
    else {
        statusMsg = "No error"
    }
    return {
        statusMsg,
        isValid: statusMsg === "No error" ? true : false,
    }
}

