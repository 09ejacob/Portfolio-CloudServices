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
});
