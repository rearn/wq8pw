import base64


def base64encode(s):
    if len(s) != 8:
        return None
    return base64.urlsafe_b64encode(s).decode('utf-8')[:-1]


def base32encode(s):
    if len(s) != 8:
        return None
    return base64.b32encode(s).decode('utf-8')[:-3].lower()


def base64decode(s):
    if len(s) == 11:
        s += '='
    else:
        return None
    return base64.urlsafe_b64decode(s)


def base32decode(s):
    if len(s) == 13:
        s += '==='
    else:
        return None
    return base64.b32decode(s.upper(), casefold=True, map01='l')
