'use client'
import hero from '@/pics/hero.jpg'
import { cn } from '@/lib/utils'
import { ChatMessageItem } from '@/components/chat-message'
import { useChatScroll } from '@/hooks/use-chat-scroll'
import {
  type ChatMessage,
  useRealtimeChat,
} from '@/hooks/use-realtime-chat'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface RealtimeChatProps {
  roomName: string
  username: string
  onMessage?: (messages: ChatMessage[]) => void
  messages?: ChatMessage[]
}

/**
 * Realtime chat component styled like Messenger.
 */
export const RealtimeChat = ({
  roomName,
  username,
  onMessage,
  messages: initialMessages = [],
}: RealtimeChatProps) => {
  const { containerRef, scrollToBottom } = useChatScroll()

  const {
    messages: realtimeMessages,
    sendMessage,
    isConnected,
  } = useRealtimeChat({
    roomName,
    username,
  })

  const [newMessage, setNewMessage] = useState('')

  // Merge realtime + initial messages
  const allMessages = useMemo(() => {
    const mergedMessages = [...initialMessages, ...realtimeMessages]
    const uniqueMessages = mergedMessages.filter(
      (message, index, self) =>
        index === self.findIndex((m) => m.id === message.id)
    )
    return uniqueMessages.sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt)
    )
  }, [initialMessages, realtimeMessages])

  useEffect(() => {
    if (onMessage) onMessage(allMessages)
  }, [allMessages, onMessage])

  useEffect(() => {
    scrollToBottom({ behavior: 'smooth' })
  }, [allMessages, scrollToBottom])

  const handleSendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!newMessage.trim() || !isConnected) return
      sendMessage(newMessage)
      setNewMessage('')
    },
    [newMessage, isConnected, sendMessage]
  )

  return (
    <div className="relative flex flex-col h-screen w-full text-white antialiased">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${hero.src})` }}
      />

      {/* Overlay */}

      {/* Foreground Chat UI */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Messages */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto px-4 pt-4 pb-2 space-y-4"
        >
          {allMessages.length === 0 ? (
            <div className="text-center text-sm text-muted text-white/70">
              No messages yet. Start the conversation!
            </div>
          ) : (
            <div className="space-y-1">
              {allMessages.map((message, index) => {
                const prev = index > 0 ? allMessages[index - 1] : null
                const showHeader = !prev || prev.user.name !== message.user.name

                return (
                  <div
                    key={message.id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-300"
                  >
                    <ChatMessageItem
                      message={message}
                      isOwnMessage={message.user.name === username}
                      showHeader={showHeader}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 border-t border-white/10 p-4 bg-black/50 backdrop-blur-md sticky bottom-0"
        >
          <Input
            className={cn(
              'rounded-full bg-white/10 text-sm text-white placeholder-white/60 transition-all duration-300',
              isConnected && newMessage.trim() ? 'w-[calc(100%-40px)]' : 'w-full'
            )}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={!isConnected}
          />
          {isConnected && newMessage.trim() && (
            <Button
              className="aspect-square rounded-full p-2 animate-in fade-in slide-in-from-right-4 duration-300"
              type="submit"
              disabled={!isConnected}
            >
              <Send className="size-4 text-white" />
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}
