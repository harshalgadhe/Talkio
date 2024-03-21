import { useEffect, useState } from "react";
import { FaPaperPlane, FaMicrophone } from "react-icons/fa";
import { useSocketContext } from "../contexts/SocketContext";

interface MessageInterface {
    text: string;
    send_time: string;
    is_sender: boolean;
}

interface MessagePropsInterface {
    sender: string;
    receiever: string;
}

function Messages(props: MessagePropsInterface) {
    const {sender,receiever } = props;
    const [chatMessages, setChatMessages] = useState<MessageInterface[]>([]);
    const {socket} = useSocketContext();

    
    const addMessage = (message: MessageInterface) => {
        setChatMessages(prevMessages => [...prevMessages, message]);
    };

    useEffect(() => {
        const handleSendNewMessage = (arg: any) => {
            console.log(`Message Received: ${arg}`);
            addMessage({ text: arg['text'], send_time: arg['time'], is_sender: arg['is_sender'] });
        };

        socket.on('new send message', handleSendNewMessage);

        return () => {
            socket.off('new send message', handleSendNewMessage); // Unsubscribe when component unmounts
        };
    }, []);
   

    const sendMessage = () => {
        const messageInput: HTMLInputElement = document.getElementById('text-message') as HTMLInputElement;
        const message = messageInput.value;
        const time = new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        socket.emit("message", {
            'text': message,
            'time': time,
            'from': sender,
            'to': receiever,
            'is_sender': true
        });
        console.log(`Message sent from ${socket.id} i.e to user ${receiever}`)
        addMessage({ text: message, send_time: time, is_sender: true });
        messageInput.value = '';
    };

    return (
        <>
            <div className="pt-5 pb-24" id="message-container">
                {chatMessages.map((element, index) => (
                    <div key={index} className={`flex ${element.is_sender === true ? 'justify-end' : 'justify-start'} px-3`}>
                        <div className={`text-white ${element.is_sender === true ? 'bg-red-600 items-end' : 'bg-green-600'} flex flex-col m-2 py-1.5 px-3 rounded-2xl max-w-96 min-w-24`}>
                            <p>{element.text}</p>
                            <span className="text-xs mt-1">{element.send_time}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full fixed md:absolute bottom-0 h-16 border-b-1 border-gray-200 bg-white dark:border-gray-600 px-1 sm:px-4 dark:bg-gray-800">
                <div className="relative flex items-center mt-2">
                    <input type="text" onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }} id='text-message' className="rounded-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-1.5 py-1 min-[350px]:ps-3 min-[350px]:py-1.5 text-md min-[350px]:text-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type message here..." />
                    <div className="absolute inset-y-0 end-7 min-[350px]:end-14 flex items-center pe-3.5">
                        <FaPaperPlane onClick={sendMessage} className='w-4 h-4 min-[350px]:w-5 min-[350px]:h-5 text-gray-500 dark:text-gray-400 cursor-pointer' />
                    </div>
                    <div className="ms-1 sm:ms-4 w-8 min-[350px]:w-12 bg-gray-200 rounded-full h-7 min-[350px]:h-10 sm:h-11 items-center flex content-center">
                        <FaMicrophone className="ms-1 w-5 h-5 min-[350px]:ms-2.5 min-[350px]:w-6 min-[350px]:h-6 text-gray-700 dark:text-gray-600 cursor-pointer" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messages;
