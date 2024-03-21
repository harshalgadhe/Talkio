import DBClient from "../DB/db.config.js";
import firebase from "firebase-admin";
import fs from "fs";
import path from "path";

const prisma = DBClient.getInstance().prisma;


export const createUser = async(req, res) => {
    const {  first_name, last_name , email, phone_number } = req.body;
    const imageFile = req.file;
    let response;

    if(imageFile){
        response = await uploadFileToBucket(imageFile);
        
        if(response["profile_image_path"] === "") {
            return response;
        }
        console.log(`this is response ${await response}`);
    }

    const findUser = await prisma.Users.findUnique({
        where: {
            phone_number: phone_number,
        },
    }); 
   
    if(findUser){
        return res.json({
            status: 400,
            message: "phone number already exists...",
        });
    }
  
    await prisma.Users.create({
        data: {
            first_name : first_name,
            last_name: last_name, 
            email: email, 
            phone_number : phone_number, 
            profile_image_url : response?response["profile_image_path"]:null
        },
    });

    console.log("Successfully created user");
  
    return res.json({
        "message": "Successfully created new user"
    });
}

const uploadFileToBucket = async (imageFile) => {
    const storage = firebase.storage();
    const bucket = storage.bucket(process.env.FIREBASE_BUCKET_NAME);

    try {
        await bucket.upload(imageFile.path, {
            destination: imageFile.filename
        });
        console.log('File uploaded successfully.');

        await fs.unlink(imageFile.path , () => {
            console.log('File deleted successfully.');
        });

        return {
            "profile_image_path": imageFile.filename,
            "status": 200,
            "message": "File uploaded successfully"
        }

    } catch (error) {
        console.error('Error uploading file:', error);
        return {
            "status": error.code,
            "message": error.message
        }
    }
}

  
export const getUser = async(req, res) => {
    const phone = req.params.phone;

    const user = await prisma.users.findUnique({
        where: {
            phone_number : phone
        }
    })
    return res.json({status: 200, data: user })
}


  