import unittest
from app import app

# This is a test suite for the Flask backend of the web based chat application
class TestBackend(unittest.TestCase):
    def setUp(self): # Set up test environment
        self.app = app.test_client()
        self.app.testing = True

    def test_post_message(self): # Test sending a message
        response = self.app.post('/messages', json={'message': 'Test post'})
        self.assertEqual(response.status_code, 200)
        self.assertIn('success', response.json['status'])

    def test_get_messages(self): # Test retrieving messages from backend
        self.app.post('/messages', json={'message': 'Test get message'})
        response = self.app.get('/messages')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Test get message', response.json['messages'])
    
    def test_post_empty_message(self): # Test posting an empty message to backend
        response = self.app.post('/messages', json={})
        self.assertEqual(response.status_code, 200)
        self.assertIn('success', response.json['status'])

    def test_get_empty_messages(self): # Test retrievin messages when backend has no messages stored
        response = self.app.get('/messages')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['messages'], [])

    def test_post_and_get_messages(self): # Test sending and retrieving a message together
        self.app.post('/messages', json={'message': 'Integration test message'})
        response = self.app.get('/messages')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Integration test message', response.json['messages'])

if __name__ == '__main__':
    unittest.main()