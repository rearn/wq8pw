import unittest
import json
import des

class test_des(unittest.TestCase):
    def setUp(self):
        self.des = des.des(b'abcdefgh')

    def test_encode(self):
        ret = self.des.encode(255)
        self.assertEqual(ret, b'!\xec\xdb\xc1\xa8Z\xe0\xe2')

    def test_decode(self):
        ret = self.des.decode(b'!\xec\xdb\xc1\xa8Z\xe0\xe2')
        self.assertEqual(ret, 255)

    def test_is_under_8_octets(self):
        self.assertTrue(self.is_under_8_octets(42))
        self.assertTrue(self.is_under_8_octets(0x1145148108931919))
        self.assertFalse(self.is_under_8_octets(0x1234567890abcdef0))


if __name__ == '__main__':
    unittest.main()
