import pyDes


class des():
    def __init__(self, key):
        if len(key) == 8:
            self.__des = pyDes.des(key, pyDes.ECB)
        else:
            raise Exception()

    def encode(self, plain_number):
        if(self.__is_under_8_octets(plain_number)):
            return self.__des.encrypt(plain_number.to_bytes(8, 'big'))
        else:
            return None

    def decode(self, cipher_number):
        if(self.__is_under_8_octets(int.from_bytes(cipher_number, 'big'))):
            ret = self.__des.decrypt(cipher_number)
            return int.from_bytes(ret, 'big')
        else:
            return None

    def __is_under_8_octets(self, number):
        return number == (number & 0xffffffffffffffff)
