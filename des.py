from Crypto.Cipher import DES

class des():
    def __init__(self, key):
        if len(key) == 8:
            self.des = DES.new(key, DES.MODE_ECB)
        else:
            raise Exception()


    def encode(self, plain_number):
        byte = plain_number.to_bytes(8, 'big')
        if(self.is_under_8_octets(byte)):
            return self.des.encrypt(byte)
        else:
            raise Exception()

    def decode(self, cipher_number):
        if(self.is_under_8_octets(cipher_number)):
            return self.des.decrypt(cipher_number)
        else:
            raise Exception()

    def is_under_8_octets(self, number):
        return number == (number & 0xffffffffffffffff)
