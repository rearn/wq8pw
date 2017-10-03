from Crypto.Cipher import DES

class des():
    def __init__(self, key):
        if len(key) == 8:
            self.des = DES.new(key, DES.MODE_ECB)
        else:
            raise Exception()


    def encode(self, plain_number):
        if(self.is_under_8_octets(plain_number)):
            return self.des.encrypt(plain_number.to_bytes(8, 'big'))
        else:
            raise Exception()

    def decode(self, cipher_number):
        if(self.is_under_8_octets(int.from_bytes(cipher_number, 'big'))):
            return self.des.decrypt(cipher_number)
        else:
            raise Exception()

    def is_under_8_octets(self, number):
        return number == (number & 0xffffffffffffffff)
