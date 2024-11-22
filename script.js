/*
import OpenAI from "openai";
const openai = new OpenAI();
const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
        {"role": "user", "content": "write a haiku about ai"}
    ]
});
*/

// script.js
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Function to add a message to the chat box
function addMessage(content, sender = 'user') {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);

  const bubbleDiv = document.createElement('div');
  bubbleDiv.classList.add('bubble');
  bubbleDiv.textContent = content;

  messageDiv.appendChild(bubbleDiv);
  chatBox.appendChild(messageDiv);

  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
}

// Function to handle sending a message
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // Add the user's message to the chat
  addMessage(message, 'user');
  userInput.value = '';

  // Send the message to the backend API
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    // Add the bot's response to the chat
    const botReply = data.choices[0].message.content;
    addMessage(botReply, 'bot');
  } catch (error) {
    console.error('Error communicating with the server:', error);
    addMessage('Something went wrong. Please try again.', 'bot');
  }
}

// Add event listener to the send button
sendButton.addEventListener('click', sendMessage);

// Add event listener for pressing Enter in the input box
userInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
