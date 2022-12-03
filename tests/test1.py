import os
# try:
#     ls = os.listdir()
#     for l in ls:
#         print(os.path.abspath(l))
# except FileNotFoundError:
#     print("file not found")

try:
    os.chdir("jnejdfjdf")
    pass
except FileNotFoundError:
    print("File doesn't exists")
