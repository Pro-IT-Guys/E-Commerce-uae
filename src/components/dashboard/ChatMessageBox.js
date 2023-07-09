import { Box, Button, Divider, Typography } from '@mui/material'
import { ContextData } from 'context/dataProviderContext'
import React, { useContext, useEffect, useRef, useState } from 'react'
import InputEmoji from 'react-input-emoji'
import { ButtonAnimate } from '../animate'
import { CustomIcons } from 'public/static/mui-icons'
import MessageItem from '../chat/MessageItem'
import ChatMessageBoxItem from './ChatMessageBoxItem'
import { sendMessage } from 'apis/chat.api'

const ChatMessageBox = ({
  selectedChatMessage,
  setSelectedChatMessage,
  chat,
  socket,
}) => {
  const boxRef = useRef(null)
  const { currentlyLoggedIn } = useContext(ContextData)
  const [inputMeassage, setInputMessage] = useState('')

  const sender = chat?.members?.find(
    member => member?._id === currentlyLoggedIn?._id
  )

  // Scroll to the last message when the message list updates
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight
    }
  }, [])

  // Main functions==========>
  const handleInputMessage = text => {
    setInputMessage(text)
  }

  const handleSendMessage = async () => {
    const chatId = chat?.chatId
    const senderId = currentlyLoggedIn?._id

    const newMessage = await sendMessage({
      chatId,
      senderId,
      text: inputMeassage,
    })

    setSelectedChatMessage([...selectedChatMessage, newMessage?.data])
    const receiverId = chat?._id

    socket.emit('sendMessage', {
      senderId,
      receiverId,
      createdAt: newMessage?.data?.createdAt,
      text: inputMeassage,
    })

    // setSendMessageBase(true)
    setInputMessage('')
  }

  return (
    <div className="h-[70vh] border rounded">
      <div
        // anchorEl={anchorRef}
        sx={{
          width: {
            xs: 280,
            sm: 320,
            md: 500,
          },
          transformOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          marginTop: '-65px',
          marginLeft: '-10px',
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {sender?.name?.firstName} {sender?.name?.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {sender?.email}
          </Typography>
        </Box>

        <Divider />

        <Box
          ref={boxRef}
          //   sx={{
          //     maxHeight: '250px',
          //     overflowY: 'auto',
          //   }}
          className="h-[60vh] overflow-y-scroll"
        >
          {selectedChatMessage?.map((item, index) => (
            <ChatMessageBoxItem
              key={index}
              message={item}
              chat={chat}
              user={currentlyLoggedIn}
            />
          ))}
        </Box>

        <Box
          sx={{ paddingBottom: 1.5, display: 'flex', px: 2.8 }}
          className="mb-0"
        >
          <InputEmoji value={inputMeassage} onChange={handleInputMessage} />
          <ButtonAnimate mediumClick={true}>
            <Button onClick={handleSendMessage}>
              <CustomIcons.SendIcon />
            </Button>
          </ButtonAnimate>
        </Box>
      </div>
    </div>
  )
}

export default ChatMessageBox
