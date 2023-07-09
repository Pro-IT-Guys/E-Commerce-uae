import React from 'react'
import Page from 'src/components/Page'
import ChatSideBar from 'src/components/dashboard/chatSideBar'
import DashboardLayout from 'src/layouts/dashboard'

const Chat = () => {
  return (
    <DashboardLayout>
      <Page title="AYMi | Support">
        <h1 className="font-bold text-2xl">Support</h1>
        <div className="flex gap-2 text-sm mt-3 text-[#636262]">
          <p>Dashboard - </p>
          <p>Tickets - </p>
          <p>Chat</p>
        </div>

        <div>
          <ChatSideBar />
        </div>
      </Page>
    </DashboardLayout>
  )
}

export default Chat
