import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";




const registerUser = asyncHandler(async(req,res) => {
     // get user details from frontend
     //validation- not empty
     //check if user already exists: username, email
     //check for images, check for avatar
     //upload them to cloudinary, avatar
     //create user object - create entry in db
     //remove password and refresh token from response
     //check for user creation
     //return res


     const {fullName, email, username, password} = req.body
     console.log("email:", email);

     // validation
     if(
          [fullName,email, username, password].some((field) =>
          field?.trim() === "")
     ){
          throw new ApiError(400, "All fields are required")
     }

     // user 
     const existedUser = User.findOne({
          $or: [{username} , { email }]
     })
     if(existedUser){
          throw new ApiError(409, "User with email or username already exists")
     }

     // images
    const avatarLocalpath = req.files?.avatar[0]?.path;
    const coverImageLocalpath =req.files?.coverImage[0]?.path;

    if(!avatarLocalpath){
     throw new ApiError(400, "Avatar file is required")
    }

    //upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalpath)
    const coverImage = await uploadOnCloudinary(coverImageLocalpath)

    if(!avatar){
      throw new ApiError(400, "Avatar file is required")
    }

    // entry in db
    const user = await User.create({
     fullName,
     avatar: avatar.url,
     coverImage: covser?.url || "",
     email,
     password,
     username: username.toLowerCase()
    })

    const createduser = await User.findById(user._id).select(
       "-password -refreshToken"
    )

    if(!createduser){
     throw new ApiError(500, "Something went wrong while registering the user")

    }

    return res.status(201).json(
     new ApiResponse(200, createduser, "User registered Successfully")
    )


})
















// const registerUser = asyncHandler(async(req,res) => {
//     // res.status(200).json({
//     //     message:"Devendra You Can"
//     // })
// })

export {registerUser}