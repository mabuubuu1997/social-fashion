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
    updateUserInfor: async (req, res) => {
        try {
            const { avatar, name, address, gender, story } = req.body
            if(!name) return res.status(400).json({msg: "Please add your name."})

            await Users.findOneAndUpdate({_id: req.user._id}, {
                avatar, name, address, gender, story
            })

            res.json({msg: "Update Success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports = userCtrl