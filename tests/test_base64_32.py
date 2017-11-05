import unittest
import base64_32


class test_des(unittest.TestCase):
    def test_base64encode(self):
        self.assertEqual(base64_32.base64encode(b'!\xec\xdb\xc1\xa8Z\xe0\xe2'), 'Iezbwaha4OI')
        self.assertEqual(base64_32.base64encode(b'11451442'), 'MTE0NTE0NDI')
        self.assertEqual(base64_32.base64encode(b'\xfe\xfe\xfe\xfe\xff\xff\xff\xff'), '_v7-_v____8')
        self.assertIsNone(base64_32.base64encode(b'114514'))


    def test_base32encode(self):
        self.assertEqual(base64_32.base32encode(b'!\xec\xdb\xc1\xa8Z\xe0\xe2'), 'ehwnxqnillqoe')
        self.assertEqual(base64_32.base32encode(b'11451442'), 'geytinjrgq2de')
        self.assertEqual(base64_32.base32encode(b'\xfe\xfe\xfe\xfe\xff\xff\xff\xff'), '737p57x777776')
        self.assertIsNone(base64_32.base32encode(b'114514'))

    def test_base64decode(self):
        self.assertEqual(base64_32.base64decode('Iezbwaha4OI'), b'!\xec\xdb\xc1\xa8Z\xe0\xe2')
        self.assertEqual(base64_32.base64decode('MTE0NTE0NDI'), b'11451442')
        self.assertEqual(base64_32.base64decode('_v7-_v____8'), b'\xfe\xfe\xfe\xfe\xff\xff\xff\xff')
        self.assertIsNone(base64_32.base64decode('12345678'))
        self.assertIsNone(base64_32.base64decode('favicon.ico'))

    def test_base32decode(self):
        self.assertEqual(base64_32.base32decode('ehwnxqnillqoe'), b'!\xec\xdb\xc1\xa8Z\xe0\xe2')
        self.assertEqual(base64_32.base32decode('ehwnxqni11q0e'), b'!\xec\xdb\xc1\xa8Z\xe0\xe2')
        self.assertEqual(base64_32.base32decode('geytinjrgq2de'), b'11451442')
        self.assertEqual(base64_32.base32decode('737p57x777776'), b'\xfe\xfe\xfe\xfe\xff\xff\xff\xff')
        self.assertIsNone(base64_32.base32decode('12345678'))
        self.assertIsNone(base64_32.base32decode('123456_654321'))


if __name__ == '__main__':
    unittest.main()
