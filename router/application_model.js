const secure = require("bcrypt") 
const database_access = require("../data/config")



// * add users to the datbase
// * inserts argument into user table in db access 
// * returns a user found by id
const add = async (user) => {
    const [id] = await database_access("users")
        .insert(user)
    return findById(id)
}

// * find user record with username and password 
const find = () => {
    return database_access("users").select("id", "username")
}


// * find user by filter 
const findByFilter = (filter) => {
    return database_access("users")
        .select("id", "username", "password")
        .where(filter)
}


// * find user with id
const findById = (id) => {
    return database_access("users")
        .select("id", "username")
        .where({ id }) // desctructuring id from the request 
        .first()
}

module.exports = { 
    add, 
    find,
    findByFilter,
    findById
}



