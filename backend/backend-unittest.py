import unittest
from app import app

class TestBackend(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_post_message(self):
        response = self.app.post('/messages', json={'message': 'Test post'})
        self.assertEqual(response.status_code, 200)
        self.assertIn('success', response.json['status'])

    def test_get_messages(self):
        self.app.post('/messages', json={'message': 'Test get message'})
        response = self.app.get('/messages')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Test get message', response.json['messages'])

if __name__ == '__main__':
    unittest.main()