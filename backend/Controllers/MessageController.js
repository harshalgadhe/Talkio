import DBClient from "../DB/db.config.js";
const prisma = DBClient.getInstance().prisma;
import { createConnection } from './ConnectionsController.js';

export const createMessage = async(req, res) => {
  const {from_user, to_user, text} = req.body;

  const newMessage = await prisma.Messages.create({
    data: {
        from_user : from_user,
        to_user : to_user,
        text: text
    },
  });

  const new_user1 = from_user < to_user ? from_user : to_user;
  const new_user2 = from_user < to_user ? to_user : from_user;
  console.log(new_user1)

  const connectionExist = await prisma.connections.findUnique({
        where: {
            user1_user2: {
                user1: new_user1,
                user2: new_user2,
            },
        },
    }); 

  if(!connectionExist){
    createConnection(new_user1, new_user2)
  }

  return res.json({ status: 200, data: newMessage, msg: "Message created." });
}

export const retrieveMessage = async(req, res) => {  
    const user1 = parseInt(req.params.user1)
    const user2 = parseInt(req.params.user2)

   console.log(user1 +" " + user2)
    try{
        const msg = await prisma.Messages.findMany({
            where: {
                OR: [
                    {
                        from_user : user1,
                        to_user : user2,
                    },
                    {
                        from_user : user2,
                        to_user : user1,
                    },
                  ],
              },
              orderBy: {
                createdAt: 'desc' // Optional: You can specify the order of messages
              },
              take: 10,
        })
        console.log("message:",msg)
    return res.json({status: 200, data: msg })
    }catch(error){
        console.log("Error fetching message:" , error);
        return res.json({status: 500, data: error});
    }
}
