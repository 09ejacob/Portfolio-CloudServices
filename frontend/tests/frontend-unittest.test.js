const fetchMock = require('jest-fetch-mock');
fetchMock.enableMocks();

describe('Frontend Functionality', () => {
    /**
     * Reset mock fetch calls before each test
     */
    beforeEach(() => {
        fetch.resetMocks();
    });


    /**
     * Test send message from frontend to backend
     */
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

    /**
     * Test retrieving message from backend
     */
    test('fetches messages from the backend', async () => {
        fetch.mockResponseOnce(JSON.stringify({ messages: ['Test'] }));
        const response = await fetch('http://10.212.25.49:5000/messages');
        const data = await response.json();

        expect(data.messages).toContain('Test');
    });

    /**
     * Test that UI updates properly after sending message
     */
    test('UI updates on sending message', async () => {
        document.body.innerHTML = `
            <textarea id="message"></textarea>
            <button id="sendButton">Send</button>
            <ul id="message-list"></ul>
        `;
    
        const backendUrl = 'http://10.212.25.49:5000/messages';
    
        fetch.mockResponseOnce(JSON.stringify({ status: 'success' })); // POST response
        fetch.mockResponseOnce(JSON.stringify({ messages: ['Test'] })); // GET response
    
        const sendButton = document.getElementById('sendButton');
        const messageInput = document.getElementById('message');
        const messageList = document.getElementById('message-list');
    
        messageInput.value = 'Test';
        
        sendButton.addEventListener('click', async () => {
            const message = messageInput.value;
            await fetch(backendUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });
            const response = await fetch(backendUrl);
            const data = await response.json();
    
            messageInput.value = '';
            messageList.innerHTML = '';
            data.messages.forEach((msg) => {
                const li = document.createElement('li');
                li.textContent = msg;
                messageList.appendChild(li);
            });
        });
    
        sendButton.click();
        await new Promise((resolve) => setTimeout(resolve, 50));
    
        expect(messageInput.value).toBe('');
        expect(messageList.children.length).toBe(1);
        expect(messageList.children[0].textContent).toBe('Test');
    });
    
    
});
