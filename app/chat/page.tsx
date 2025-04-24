'use client'

import React, { useEffect, useState } from 'react'
import { RealtimeChat } from '@/components/realtime-chat'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Page = () => {
  const [open, setOpen] = useState(true)
  const [username, setUsername] = useState('')
  const [roomName, setRoomName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (username.trim() && roomName.trim()) {
      setOpen(false)
      setSubmitted(true)
    }
  }

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground antialiased">
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join a Chat Room</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleSubmit} className="w-full">Enter</Button>
        </DialogContent>
      </Dialog>

      {submitted && <RealtimeChat roomName={roomName} username={username} />}
    </div>
  )
}

export default Page
