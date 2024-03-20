import {useNavigate} from "react-router-dom";
import { useSocketContext } from "../contexts/SocketContext";
import { socketInstance } from "../socket";

function Homepage() {
    
    const navigate = useNavigate();
    const {socket, setSocket} = useSocketContext();

    const submitHandler = (e:React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        const phoneNumberElement :HTMLInputElement = document.getElementById('phonenumber')! as HTMLInputElement;
        const phoneNumber : string = phoneNumberElement.value;
    
        setSocket(socketInstance(phoneNumber)!);

        navigate(`/chat/${phoneNumber}`);
    }   

    return (
        <form className="max-w-sm mx-auto mt-8" onSubmit={(e) => submitHandler(e)}>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                <input id="phonenumber" type="number" className="border border-gray-300 p-2 shadow-xl rounded-2xl" placeholder="Phone Number" required />
            </div>
            <button type="submit" className="text-white shadow-xl bg-blue-600 rounded-2xl p-2">Start Session</button>
        </form>
    )
}

export default Homepage