import { CiSearch } from 'react-icons/ci';
import { FaCircle } from 'react-icons/fa';

interface ContactInterface {
    id: number,
    first_name: string;
    last_name: string;
    phone_number: string;
    status: string;
    avatar: string;
}

interface ContactsPanelInterface {
    sender: string;
    receiever: string;
    setReceiever: React.Dispatch<React.SetStateAction<string>>;
}

function ContactsPanel(props: ContactsPanelInterface) {

    const {sender, receiever, setReceiever} = props;

    const data: Array<ContactInterface> = [
        {   
            id: 1,
            first_name: '12345',
            last_name: 'gadhe',
            phone_number: '12345',
            status: 'online',
            avatar: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {   
            id: 2,
            first_name: '9022817520',
            last_name: 'dfhfghfgh',
            phone_number: '9022817520',
            status: 'oj',
            avatar: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }
    ];

    return (
        <div className={`${receiever==="0"?'block':'hidden md:block'}`}>
            <div className="h-20 border-b border-gray-200 dark:border-gray-400 mx-auto px-3 py-4 mt-20 md:mt-0 2xl:px-8 dark:bg-gray-600">
                <div className="relative">
                    <input type="text" id="email-address-icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:ps-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Contacts..." />
                    <div className="absolute inset-y-0 end-0 flex items-center pe-3.5">
                        <CiSearch className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                    </div>
                </div>
            </div>
            <div>
                {data.map((element, index) => (
                    <div key={index} className={`${element.phone_number === sender? 'hidden':'block'} w-full border-b border-gray-200 dark:text-white dark:border-gray-500 py-5 px-2 lg:p-3 flex items-center cursor-pointer`} onClick={() => setReceiever(element.phone_number)}>
                        <div className='w-1/6 '>
                            <img src={element.avatar} className="border border-gray-300 rounded-full h-8 w-8 sm:h-12 sm:w-12" />
                        </div>
                        <div className='w-2/3'>
                            <p className='truncate ps-2'>{element.first_name} {element.last_name}</p>
                        </div>
                        <div className='w-1/6'>
                            {element.status === 'online' ? <FaCircle color='green'className='mx-auto sm:w-5 sm:h-5'/> : <FaCircle className='text-gray-400 mx-auto sm:w-5 sm:h-5'/>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContactsPanel;