const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.findOneAndUpdate({ userName: req.params.userName }, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ status: 'failed', message: 'User not found!' });
    res.status(201).json({
      status: 'success',
      data: {
        updatedUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};
exports.deactivateUserAccount = async (req, res) => {
  try {
    const foundedUSer = await userModel.findOne({
      userName: req.body.userName,
    });
    if (!foundedUSer) {
      return res.status(404).json({
        status: 'failed',
        data: { message: 'User not found!' },
      });
    }

    foundedUSer.isDeleted = true;
    const d = await foundedUSer.save();
    res.status(200).json({
      status: 'deactivated',
      message: 'Account deactivated successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

exports.changeUserRole = async (req, res) => {
  try {
    console.log(req.params.userName);
    if (req.role != 'admin') return res.status(403).json({ status: 'failed', message: 'You are not authorized!' });
    const foundedUser = await userModel.findOne({
      userName: req.params.userName,
    });
    console.log(foundedUser);
    if (!foundedUser) return res.status(404).json({ status: 'failed', message: 'User not found!' });
    const { role } = req.body;
    foundedUser.role = role;
    const token = jwt.sign(
      {
        userId: foundedUser._id,
        role,
        isDeleted: foundedUser.isDeleted,
      },
      process.env.JWT_SECRET
    );
    foundedUser.token = token;
    await foundedUser.save();
    res.status(200).json({
      status: 'success',
      data: {
        foundedUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      err: err.message,
    });
  }
};
