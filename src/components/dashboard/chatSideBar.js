import { getChats, getMessageOfChatId } from 'apis/chat.api'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ChatUserItem from './chatUserItem'
import ChatMessageBox from './ChatMessageBox'
import { io } from 'socket.io-client'
import { ContextData } from 'context/dataProviderContext'
import { getUserById } from 'apis/user.api'

const ChatSideBar = () => {
  const socket = useRef()
  const { currentlyLoggedIn } = useContext(ContextData)
  const [onlineUsers, setOnlineUsers] = useState([])

  // =======================Socket part ends============================>
  const [chats, setChats] = useState([])
  const [selectedChatId, setSelectedChatId] = useState('')
  const [selectedChatMessage, setSelectedChatMessage] = useState([])
  const [chat, setChat] = useState(null)

  useEffect(() => {
    const getChatAll = async () => {
      const res = await getChats()
      setChats(res?.data)
    }
    getChatAll()
  }, [])

  // Socket pat start============================>
  useEffect(() => {
    socket.current = io('http://localhost:8080')
    socket.current.emit('join', currentlyLoggedIn?._id)
    socket.current.on('activeUsers', users => {
      setOnlineUsers(users)
    })
  }, [currentlyLoggedIn])

  // Get message from the user
  useEffect(() => {
    if (socket.current) {
      socket.current.on('getMessage', data => {
        setSelectedChatMessage(prev => [...prev, data])
      })
    }
  }, [socket.current])

  // Socket part end============================>

  let chatUser = []
  // get all chats user without admin
  const userChat = chats?.map(chat => {
    chat?.members?.map(member => {
      // console.log(member);
      if (member?.role !== 'admin') {
        member.chatId = chat?._id
        chatUser.push(member)
      }
    })
  })

  //   get message by chatId
  useEffect(() => {
    if (selectedChatId) {
      const getMessageOfChatIdAll = async () => {
        const res = await getMessageOfChatId(selectedChatId)
        setSelectedChatMessage(res?.data)
      }
      getMessageOfChatIdAll()
    }
  }, [selectedChatId])

  return (
    <div className="mt-5 flex mx-10">
      <div className="h-[70vh] w-[20%] border rounded bg-white space-y-2 p-2 overflow-y-scroll">
        {chatUser?.map(user => (
          <ChatUserItem
            user={user}
            setSelectedChatId={setSelectedChatId}
            key={user?._id}
            setChat={setChat}
          />
        ))}
      </div>

      <div className="w-[80%]">
        <ChatMessageBox
          selectedChatMessage={selectedChatMessage}
          setSelectedChatMessage={setSelectedChatMessage}
          selectedChatId={selectedChatId}
          chat={chat}
          socket={socket.current}
        />
      </div>
    </div>
  )
}

export default ChatSideBar
