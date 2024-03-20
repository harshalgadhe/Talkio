import { useThemeContext } from '../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import Messages from './Messages';
import ChatRecommend from './ChatRecommend';

interface ChatPanelProps {
    sender:string;
    receiever: string;
    setReceiever: React.Dispatch<React.SetStateAction<string>>;
}

function ChatPanel(props:ChatPanelProps) {

    const { theme, setTheme } = useThemeContext();
    const { sender, receiever, setReceiever} = props;

    const toggleTheme = () => {
        setTheme((prev: string) => (prev === 'light' ? 'dark' : 'light'));
    }

    return (
        <div className='h-full relative flex flex-col'>
            <div className="fixed md:relative w-full dark:bg-gray-600 items-center justify-between h-20 border-b border-gray-200 dark:border-gray-400 px-2 flex">
                <div className='flex ps-1 py-2 sm:px-5 gap-0.5 min-[350px]:gap-2'>
                    <div className= {`${receiever==='0'?'hidden':'block'} block md:hidden pt-2 cursor-pointer pr-2`}>
                        <IoIosArrowBack className='text-gray-600 dark:text-gray-100' onClick={() => setReceiever("0")}/>
                    </div>
                    <img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="border border-gray-300 rounded-full h-8 w-8 sm:h-12 sm:w-12" />
                    <p className="font-mono pt-0.5 md:pt-2 text-xl sm:text-2xl dark:text-white">Talkio</p>
                </div>
                <div className='flex pe-0 min-[350px]:pe-3'>
                    <div className='me-1 sm:me-5 flex dark:justify-end border cursor-pointer border-gray-300 w-10 h-5 sm:w-12 sm:h-6 bg-white dark:bg-gray-400 rounded-xl' onClick={toggleTheme}>
                        {theme === 'dark' ? 
                            <div className='flex items-center ps-0.5 sm:ps-1 bg-gray-100 h-full rounded-full w-5 sm:w-6'>
                                <FaMoon className='text-gray-600' />
                            </div> :
                            <div className='flex items-center ps-0.5 sm:ps-1 bg-gray-500 h-full rounded-full w-5 sm:w-6'>
                                <FaSun color='white' />
                            </div>
                        }
                    </div>
                    <BsThreeDotsVertical className='cursor-pointer text-gray-600 dark:text-white w-5 h-5 sm:w-6 sm:h-6'/>
                </div>
            </div>
            <div className={`${receiever==="0"?'hidden md:block':'block'} pt-20 md:pt-0 flex flex-col flex-1 text-white justify-between overflow-y-auto no-scrollbar`}>
                {receiever!=="0" ? <Messages sender={sender} receiever={receiever}/>: <ChatRecommend />}
            </div>
        </div>
    )
}

export default ChatPanel
