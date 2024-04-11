"use server";
import User from "../Models/userModel";
import connectMongoDB from "../mongodb";


export async function createUser(user:any) {
    try{
        await connectMongoDB();
        const newUser = new User(user);
        return JSON.parse(JSON.stringify(newUser))
    }
    catch(error){
        console.log(error)
    }
}