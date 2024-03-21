import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocketContext } from '../contexts/SocketContext';
import { socketInstance } from '../socket';
import { useThemeContext } from '../contexts/ThemeContext';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();
    const {theme} = useThemeContext();
    const {socket, setSocket} = useSocketContext();

    const submitHandler = async (e:React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        // const phoneNumber : string = phoneNumberElement.value;
        
        const formData = new FormData(e.currentTarget);
        
        const {data} = await axios.post('http://localhost:5000/api/user/', formData , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        
        // setSocket(socketInstance(phoneNumber)!);

        // navigate(`/chat/${phoneNumber}`);
    }   

    return (
        <div className={`${theme} min-h-screen bg-gray-300 dark:bg-white flex items-center justify-center`}>
            <div className="container flex justify-center">
                <div className="bg-white dark:bg-gray-500 dark:text-white rounded-2xl shadow-2xl p-4 px-4 md:p-8 mb-6 w-full md:w-2/3">
                    <div className="flex flex-col items-center text-sm gap-y-4">
                        <div>
                            <p className="font-medium text-lg">Personal Details</p>
                            <p>Please fill out all the fields.</p>
                        </div>
                        <form id="details_form" className="text-sm gap-y-4 flex flex-col" onSubmit={(e) => submitHandler(e)}>
                            <div className='flex gap-x-3 justify-between'>
                                <div>
                                    <label htmlFor="first_name">First Name</label>
                                    <input type="text" name="first_name" id="first_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:text-gray-500" placeholder="John" required/>
                                </div>

                                <div>
                                    <label htmlFor="last_name">Last Name</label>
                                    <input type="text" name="last_name" id="last_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:text-gray-500" placeholder="Doe" />
                                </div>
                            </div>

                            <div className='flex gap-x-3 justify-between'>
                                <div className="">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:text-gray-500" placeholder="email@domain.com" />
                                </div>
                                <div>
                                    <label htmlFor="phone_number">Phone Number</label>
                                    <input type="number" name="phone_number" id="phone_number" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:text-gray-500" placeholder="0123456789" required/>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" name="profile_image_url" type="file" className="hidden" />
                                    </label>
                                </div> 

                            </div>

                            <div className="text-center">
                                <div className="inline-flex items-end">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup