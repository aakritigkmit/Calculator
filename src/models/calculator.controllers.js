const userModel = require('../models/operations.models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();




const history = async(req, res)=>{
	try{
		const userHistory = await userModel.findById(req.user._id);
		if(userHistory.history.length == 0) return res.status(400).json({message:"No History Found"});
		res.send(userHistory.history);
	}
	catch(err){
		console.log(err);
		res.status(400).send("Error showing history");
	}
}


const clearOperation = async(req, res)=>{
	try{
		const user = await userModel.findById(req.user._id);
		user.history.pop();
		await user.save();
		res.send("History Cleared");
	}
	catch(err){
		console.log(err);
		res.status(500).json({err:"Internal Server Error"});
	}
}

const resetOperation = async(req, res)=>{
	try{
		const user = await userModel.findById(req.user._id);
		user.history = [];
		await user.save();
		res.status(204).json("History Reset");
	}
	catch(err){
		console.log(err);
		res.status(500).json({err:"Internal Server Error"});	
	}
}

module.exports={
	signup, login, operations, history, clearOperation, resetOperation
}