const User = require("../models/user");
const {uploadOnCloudinary,deleteFromCloudinary} = require("../utils/cloudinary.js")
const { ApiResponse } = require("../utils/ApiResponse.js");

const getAuthUser = async (req, res) => {
	if (!req.user) {
		return res.status(404).json({ message: `User Not Found` });
	}
	res.status(200).json({
		data: req.user,
	});
};

const getAllUsers = async (req, res) => {
	const allUsers = await User.find({ _id: { $ne: req.user._id } })
		.select("-password")
		.sort({ _id: -1 });
	res.status(200).send({ data: allUsers });
};

//upload user profile
const uploadUserProfile = async (req, res) => {
	if (!req.user) {
        return res.status(400).json({ message: "No User Found" });
    }
    const profileLocalPath = req.file?.path; // req.file contains the uploaded file from the frontend
    //console.log(profileLocalPath);
	if (!profileLocalPath) {
        return res.status(400).json({ message: "No file uploaded" });
    }

	const profile= await uploadOnCloudinary(profileLocalPath);
	if(!profile.url){
		return res.status(500).json({ message: "Error uploading profile"});
	}

	//take old avatar url from db and delete it from cloudinary
    const existingUser = await User.findById(req.user?._id).select("image");
    // Store the old avatar URL
    const oldProfile = existingUser?.image;
    const deleteResponse = await deleteFromCloudinary(oldProfile);
    //console.log("deleteResponse: ",deleteResponse);

    const user =await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                image:profile.url
            }
        },
        {
            new:true
        }
    ).select("-password")

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(
        new ApiResponse(200,user,"profile updated Successfully")
    );
};

module.exports = { getAuthUser, getAllUsers, uploadUserProfile };
