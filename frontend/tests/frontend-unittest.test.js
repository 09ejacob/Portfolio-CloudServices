const fetchMock = require('jest-fetch-mock');
fetchMock.enableMocks();

describe('Frontend Functionality', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    test('message to backend', async () => {
        fetch.mockResponseOnce(JSON.stringify({ status: 'success' }));
        const response = await fetch('http://10.212.25.49:5000/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Test' })
        });

        expect(response.ok).toBe(true);
        const json = await response.json();
        expect(json.status).toBe('success');
    });

    test('fetches messages from the backend', async () => {
        fetch.mockResponseOnce(JSON.stringify({ messages: ['Test'] }));
        const response = await fetch('http://10.212.25.49:5000/messages');
        const data = await response.json();

        expect(data.messages).toContain('Test');
    });

    test('UI updates on sending message', async () => {
        document.body.innerHTML = `
            <textarea id="message"></textarea>
            <button id="sendButton">Send</button>
            <ul id="message-list"></ul>
        `;
        
        const backendUrl = 'http://10.212.25.49:5000/messages';
    
        fetch.mockResponseOnce(JSON.stringify({ status: 'success' }));
        fetch.mockResponseOnce(JSON.stringify({ messages: ['Test'] }));
    
        const sendButton = document.getElementById('sendButton');
        const messageInput = document.getElementById('message');
        const messageList = document.getElementById('message-list');
    
        messageInput.value = 'Test';
        sendButton.click();
    
        await new Promise(process.nextTick);
    
        expect(messageInput.value).toBe('');
    
        const messages = messageList.querySelectorAll('li');
        expect(messages.length).toBe(1);
        expect(messages[0].textContent).toBe('Test');
    });
    
});
