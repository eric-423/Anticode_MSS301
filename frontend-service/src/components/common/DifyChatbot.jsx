import React, { useEffect } from 'react'

export default function DifyChatbot() {
  useEffect(() => {
    // Inject config script
    const configScript = document.createElement('script')
    configScript.innerHTML = `
      window.difyChatbotConfig = {
        token: '5zqS5wV8RvQSNxJ1',
        systemVariables: {},
        userVariables: {},
      }
    `
    document.body.appendChild(configScript)

    // Inject Dify script
    const difyScript = document.createElement('script')
    difyScript.src = 'https://udify.app/embed.min.js'
    difyScript.id = '5zqS5wV8RvQSNxJ1'
    difyScript.defer = true
    document.body.appendChild(difyScript)

    // Inject style
    const style = document.createElement('style')
    style.innerHTML = `
      #dify-chatbot-bubble-button {
        background-color: #1C64F2 !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
      }
    `
    document.head.appendChild(style)

    // Cleanup on unmount
    return () => {
      document.body.removeChild(configScript)
      document.body.removeChild(difyScript)
      document.head.removeChild(style)
    }
  }, [])

  return null // Không render gì, chỉ nhúng script
}
