const Users = require("../models/userModel");

const userCtrl = {
    getAllUsersSystem: async (req, res) => {
        try {
            const users = await Users.find().select('-password')
            res.json(users)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports = userCtrl