import requests

BACKEND_URL = "http://10.212.25.49:5000/messages"
FRONTEND_URL = "http://10.212.26.212"

def test_e2e():
    # Test Backend POST /messages
    payload = {"message": "Test E2E message"}
    response = requests.post(BACKEND_URL, json=payload)
    assert response.status_code == 200, f"Failed to send message to backend. Status code: {response.status_code}"

    # Test Backend GET /messages
    response = requests.get(BACKEND_URL)
    assert response.status_code == 200, f"Failed to retrieve messages from backend. Status code: {response.status_code}"
    messages = response.json()["messages"]
    assert "Test E2E message" in messages, f"Message not stored in backend. Messages: {messages}"

    # Test Frontend
    response = requests.get(FRONTEND_URL)
    print(response.text)
    assert response.status_code == 200, f"Frontend not reachable. Status code: {response.status_code}"
    assert "Test E2E message" in response.text, f"Message not displayed on frontend. Frontend returned: {response.text}"

    print("E2E Test Passed")

if __name__ == "__main__":
    test_e2e()
