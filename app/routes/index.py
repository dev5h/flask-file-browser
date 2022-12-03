from app import app, render_template
import os
from pathlib import Path
CWD = ''
ROOT_DIR = "TBD"
@app.route("/api/")
def index_root():
    global CWD, ROOT_DIR
    
    if ROOT_DIR == 'TBD':
        ROOT_DIR = os.getcwd()
    folder_item = []
    print("ROOT"+ ROOT_DIR)
    os.chdir(ROOT_DIR)
    CWD = os.getcwd()
    dir = os.listdir(ROOT_DIR)
    print(dir)
    for list in dir:
        if (os.path.isfile(list)):
            folder_item.append({
                "name": list,
                "type": "file",
                "size": os.stat(list).st_size 
            })
        elif (os.path.isdir(list)):
            folder_item.append({
                "name": list,
                "type": "dir"
            })

    return folder_item


@app.route("/api/<path:path>")
def index_path(path):
    global ROOT_DIR
    global CWD
    if ROOT_DIR == "TBD":
        ROOT_DIR = os.getcwd()
    print("ROOT"+ ROOT_DIR)
    ERROR = ''
    
    dir = 1
    subpath = os.path.join(ROOT_DIR, path)
    
    
    try:
        os.chdir(subpath)
        CWD = os.path.join(ROOT_DIR, path)
    except FileNotFoundError:
        ERROR = "File not found"
        dir = 0
    folder_item = []
    if (os.path.exists(subpath) and os.path.isdir(subpath)):
        
        dir = os.listdir(subpath)
        for list in dir:
            abs_path = os.path.abspath(list)
            # print(abs_path)
            if (os.path.isfile(abs_path)):
                
                folder_item.append({
                    "name": list,
                    "type": "file",
                    "size": os.stat(abs_path).st_size
                    
                })
            elif (os.path.isdir(abs_path)):
                folder_item.append({
                    "name": list,
                    "type": "dir"
                })
            else:
                folder_item.append({
                    "name": list,
                    "type": "unknown"
                })
    else:
        dir = 0
    if dir != 0:
        return folder_item
    else:
        return {
            "error": ERROR,            
        }