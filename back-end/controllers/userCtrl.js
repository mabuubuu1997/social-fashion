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
    getUserInfor: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).select('-password')
            if(!user) return res.status(400).json({msg: "User does not exist !"})

            res.json({user})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports = userCtrl