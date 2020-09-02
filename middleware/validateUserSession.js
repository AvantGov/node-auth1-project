// * import depends (??) 
const secure = require("bcryptjs")
const application_access = require("../router/application_model")

function restrict () {
    const authError = {
        message: "invalid credentials"
    }

    return async (req, res, next) => {
        try {
            if (!req.session || req.session.user) {
                res.status(401).json(authError)
            }

            next()
        } catch(error) { 
            next(error) 
        }
    };
};

modules.export = {
    restrict
}


