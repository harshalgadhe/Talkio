import { useState } from 'react';
import { useThemeContext } from '../contexts/ThemeContext';
import ChatPanel from './ChatPanel';
import ContactsPanel from './ContactsPanel';
import { useParams } from 'react-router-dom';

function Main() {
    const {theme} = useThemeContext();
    const [receiever, setReceiever] = useState("0");
    const {id} = useParams();

    return (
        <div className={`${theme} dark:bg-gray-500`} >
            <div className="h-screen flex flex-col  md:flex-row-reverse m-auto w-full 2xl:w-2/3 dark:bg-gray-800 shadow-2xl overflow-y-auto no-scrollbar">
                <div className='md:w-2/3'>
                    <ChatPanel sender={id || ""} receiever={receiever} setReceiever={setReceiever}/>
                </div>
                <div className=" md:border-r md:border-gray-200 dark:border-gray-500 md:w-1/3 w-full">
                    <ContactsPanel sender={id || ""} receiever={receiever} setReceiever={setReceiever} />
                </div>
            </div>
        </div>
    )
}

export default Main;