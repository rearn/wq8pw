#!/usr/bin/env python3

from unittest import TestLoader, TextTestRunner
from sys import argv, exit

if __name__ == "__main__":
    suite = TestLoader().discover('tests', pattern = "test_*.py")
    v = 1
    if len(argv) > 1:
        if argv[1] == 'verbose':
            v = 2
        elif argv[1] == 'quiet':
            v = 0
    ret = TextTestRunner(verbosity=v).run(suite)
    exit(not ret.wasSuccessful())
