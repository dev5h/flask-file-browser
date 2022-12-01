import os
try:
    ls = os.listdir()
    for l in ls:
        print(os.path.abspath(l))
except FileNotFoundError:
    print("file not found")
