const validator = require("validator")

const validateUserData = (req) => {
    const { FirstName, email, password } = req.body;
    if (!FirstName) {
        throw new Error("Enter First Name")
    }
    else if (!(email || validator.isEmail(email))) {
         throw new Error("Email is Invalid");
    }
    else if (!(validator.isStrongPassword(password))) {
          throw new Error(
            "Password is weak. try some strong password which contain { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}"
          );
    }
}

module.exports = validateUserData;