import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from '../../redux/userSlice';

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id);

    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='md:min-w-[75%]  mt-2 flex flex-col  pt-5'>
                        <div className='flex items-center gap-2 px-4 py-2 mb-2 text-white bg-zinc-800'>
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-12 rounded-full'>
                                    {/* <img src={selectedUser?.profilePhoto} alt="user-profile" /> */}
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p>{selectedUser?.fullName}</p>
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
                        <h1 className='text-4xl font-bold text-white'>Hi,{authUser?.fullName} </h1>
                        <h1 className='text-2xl  style={{  color: "#17252A"}} '>Let's start conversation</h1>

                    </div>
                )
            }
        </>

    )
}

export default MessageContainer