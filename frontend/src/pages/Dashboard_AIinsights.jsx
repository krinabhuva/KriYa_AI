import React, { useEffect, useState, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import api from '../api'
import './dashboard.css'

export default function DashboardAIinsights() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your KriYa AI assistant. Ask me anything about your business data.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    try { document.documentElement.classList.add('dark') } catch (e) {}
  }, [])

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input }
    const currentHistory = [...messages]
    
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Add empty response block to stream into
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      await api.chatAI(input, currentHistory, (chunk, accumulated) => {
        setMessages(prev => {
          const updated = [...prev]
          if (updated.length > 0) {
            updated[updated.length - 1] = { role: 'assistant', content: accumulated }
          }
          return updated
        })
      })
    } catch (e) {
      console.error(e)
      setMessages(prev => {
        const updated = [...prev]
        if (updated.length > 0) {
          updated[updated.length - 1] = { 
            role: 'assistant', 
            content: 'Sorry, I encountered an error. Please verify your Anthropic API Key in the settings or try again.' 
          }
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const presetQuestion = (questionText) => {
    setInput(questionText)
  }

  return (
    <div className="flex h-screen overflow-hidden antialiased font-body-md text-body-md bg-surface">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-surface">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-margin-mobile border-b border-outline-variant/10 bg-surface/80 backdrop-blur-xl z-30">
          <div className="flex items-center gap-stack-sm">
            <span className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-on-surface">AI Insights</span>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden w-full h-full">
          {/* History Sidebar */}
          <aside className="hidden lg:flex flex-col w-[280px] bg-surface-container-lowest border-r border-outline-variant/10 shrink-0 h-full">
            <div className="p-4 border-b border-outline-variant/10">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
                <input className="w-full bg-surface-container border-0 rounded-full py-2 pl-9 pr-4 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Search history..." type="text" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              <div>
                <h3 className="font-label-sm text-label-sm text-on-surface-variant/70 px-2 mb-2 uppercase tracking-wider text-[10px]">Today</h3>
                <ul className="space-y-1">
                  <li>
                    <button className="w-full text-left px-3 py-2 rounded-lg bg-surface-container/50 border border-outline-variant/5 text-primary group transition-colors">
                      <div className="font-label-sm text-label-sm truncate">Consolidated Revenue</div>
                      <div className="font-body-sm text-[11px] text-on-surface-variant truncate mt-0.5">Show total revenue analysis</div>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container/30 text-on-surface-variant hover:text-on-surface transition-colors group">
                      <div className="font-label-sm text-label-sm truncate group-hover:text-primary transition-colors">Low stock prediction</div>
                      <div className="font-body-sm text-[11px] truncate mt-0.5 opacity-70">Check stockouts on core categories</div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Chat Window */}
          <section className="flex-1 flex flex-col h-full bg-surface relative">
            <header className="h-14 border-b border-outline-variant/10 flex items-center justify-between px-gutter shrink-0 bg-surface/50 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(91,124,240,0.4)]"></span>
                  <span className="font-label-md text-label-md text-on-surface">Kriya AI Assistant Active</span>
                </div>
                <span className="text-outline-variant">|</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Model: Claude 3 Haiku</span>
              </div>
            </header>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto px-margin-mobile md:px-margin-desktop py-stack-lg scroll-smooth">
              <div className="max-w-3xl mx-auto space-y-6 pb-36">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex gap-4 items-start ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-surface-container-high border border-outline-variant/20' 
                        : 'bg-gradient-to-br from-primary to-secondary shadow-primary/20'
                    }`}>
                      <span className={`material-symbols-outlined text-[18px] ${
                        msg.role === 'user' ? 'text-on-surface' : 'text-on-primary'
                      }`}>
                        {msg.role === 'user' ? 'person' : 'blur_on'}
                      </span>
                    </div>
                    <div className={msg.role === 'user' 
                      ? 'max-w-[80%] bg-surface-container-highest rounded-2xl rounded-tr-sm px-5 py-3 border border-outline-variant/10 shadow-sm'
                      : 'flex-1 font-body-md text-body-md text-on-surface leading-relaxed whitespace-pre-line'
                    }>
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {loading && messages[messages.length - 1]?.content === '' && (
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 mt-1 shadow-sm shadow-primary/20">
                      <span className="material-symbols-outlined text-on-primary text-[18px]">blur_on</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-surface-container-low border border-outline-variant/10">
                      <span className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Bar */}
            <div className="absolute bottom-0 left-0 w-full p-margin-mobile md:p-margin-desktop bg-gradient-to-t from-surface via-surface to-transparent pt-12">
              <div className="max-w-3xl mx-auto relative">
                {/* Suggestions */}
                <div className="absolute -top-10 left-0 flex gap-2 overflow-x-auto w-full no-scrollbar pb-2">
                  <button 
                    onClick={() => presetQuestion("Which product generated highest revenue this month?")}
                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/20 hover:border-primary/40 text-on-surface-variant hover:text-on-surface transition-colors font-label-sm text-label-sm"
                  >
                    <span className="material-symbols-outlined text-[14px]">trending_up</span> Top Revenue Item?
                  </button>
                  <button 
                    onClick={() => presetQuestion("What is my current inventory valuation and healthy level?")}
                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/20 hover:border-primary/40 text-on-surface-variant hover:text-on-surface transition-colors font-label-sm text-label-sm"
                  >
                    <span className="material-symbols-outlined text-[14px]">inventory_2</span> Valuation & Health?
                  </button>
                  <button 
                    onClick={() => presetQuestion("Are there any low stock warnings that need attention?")}
                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/20 hover:border-primary/40 text-on-surface-variant hover:text-on-surface transition-colors font-label-sm text-label-sm"
                  >
                    <span className="material-symbols-outlined text-[14px]">warning</span> Low Stock Warnings?
                  </button>
                </div>
                
                {/* TextArea Form */}
                <div className="relative bg-surface-container-low rounded-2xl border border-outline-variant/20 shadow-lg shadow-black/20 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all duration-300">
                  <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-0 resize-none py-4 pl-4 pr-16 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0 outline-none max-h-32 min-h-[56px] rounded-2xl" 
                    placeholder="Ask Kriya a question about your data..." 
                    rows={1}
                  />
                  <div className="absolute right-2 bottom-2 flex items-center gap-2">
                    <button 
                      onClick={sendMessage}
                      disabled={!input.trim() || loading}
                      className="p-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container disabled:opacity-50 transition-colors shadow-sm shadow-primary/20 flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-[20px] ml-0.5">send</span>
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="font-label-sm text-label-sm text-on-surface-variant/50">Kriya AI is powered by Claude. Verify critical business parameters independently.</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
