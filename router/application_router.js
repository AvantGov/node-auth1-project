const express = require("express")
const secure = require("bcryptjs")
const users_access = require("./application_model")
const userMiddleware = require("../middleware/validateUserSession")

const router = express.Router()

// * router endpoint for returning list of users
router.get("/users/accounts", userMiddleware.restrict(), async (req, res, next) => {
    // ! add user middleware to the function to 
    // ! validate user access 

    try {
        res.json(await users_access.find())
    } catch(error) { 
        next(error) 
    }

})


// * router endpoint for sign up 
router.post("/users", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await users_access.findBy({ username }).first()

        if (user) {
            return res.status(409).json({ message: 'username already taken'})
        };
        
        const newUser = await users_access.add({
            username: username,
            // * hashing the password for storage 
            password: await secure.hash(password, 10)
        });

        res.status(204).json(newUser);

    } catch(error) {
        next(error) 
    }
});
 

// * router endpoint for login functioanlity
router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body

        // * checks for record existence in db, assigns record to var for access
        const user = await users_access.findBy({ username }).first()
        if (!user) {
            return res.status(401).json({ message: 'invalid crededentials' });
        }

        // * compares the entered password to the hash on record 
        const passwordValid = await secure.compare(password, user.password)

        // * handling invalid responses + creating session

        if (!passwordValid) {
            return res.status(401).json({ message: 'invalid credentials' });
        }

        req.session.user = user

        res.json({ message: `welcome, ${user}!`})

    } catch(error) { 
        next(error) 
    }
});


// * router end point for logout functionality
router.post("/logout", userMiddleware.restrict(), async (req, res, next) => {
    try {
        // * removes the session record within the database 
        // * handles possible errors during destroy with next(error) router endpoint for verirified check in pages
        req.session.destroy((error) => {
            if (error) {
                next(error)
            } else {
                return res.status(204).end
            }
        })
    } catch(error) { 
        next(error) 
    }

});  