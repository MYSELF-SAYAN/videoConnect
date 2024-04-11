"use server";
import User from "../Models/userModel";
import connectMongoDB from "../mongodb";


export async function createUser(user:any) {
    try{
        await connectMongoDB();
        const newUser =await User.create(user);
        return JSON.parse(JSON.stringify(newUser))
    }
    catch(error){
        console.log(error)
    }
}