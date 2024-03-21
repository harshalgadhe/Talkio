import DBClient from "../DB/db.config.js";
const prisma = DBClient.getInstance().prisma

export const contactsWithStatus = async (req, res) => {
    const user = parseInt(req.params.userid);
    const contacts = await prisma.connections.findMany({
        where : {
            user1 : user
        }   
    })

    return res.json({status: 200, data: contacts})
}


export const createConnection = async (user1, user2) => {
    try {  

        const addConnection = await prisma.connections.create({
            data: {
                user1: user1,
                user2: user2
            }
        });

        console.log({ status: 200, data: addConnection, msg: "added new connection" });
    } catch (error) {
        console.error('Error creating connection:', error);
    }
}
