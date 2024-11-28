import requests

BACKEND_URL = "http://10.212.25.49:5000/messages"
FRONTEND_URL = "http://10.212.26.212"

def test_e2e():
    payload = {"message": "Test E2E message"}
    response = requests.post(BACKEND_URL, json=payload)
    assert response.status_code == 200, "Failed to send message"

    response = requests.get(BACKEND_URL)
    assert response.status_code == 200, "Failed to retrieve messages"
    messages = response.json()["messages"]
    assert "Test E2E message" in messages, "Message not stored in backend"

    response = requests.get(FRONTEND_URL)
    assert response.status_code == 200, "Frontend not reachable"
    assert "Test E2E message" in response.text, "Message not displayed on frontend"

    print("E2E Test Passed")

if __name__ == "__main__":
    test_e2e()
