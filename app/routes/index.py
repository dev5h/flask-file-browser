from app import app, render_template
import os
from pathlib import Path
@app.route("/api/")
def index_root():
    
    folder_item = []
    
    dir = os.listdir()
    for list in dir:
        if (os.path.isfile(list)):
            folder_item.append({
                "name": list,
                "type": "file"
            })
        elif (os.path.isdir(list)):
            folder_item.append({
                "name": list,
                "type": "dir"
            })

    return folder_item
    

@app.route("/api/<path:subpath>")
def index_path(subpath):
    # dir = 0
    folder_item = []
    if (os.path.exists(subpath) and os.path.isdir == True):
        dir = os.listdir(subpath)
        for list in dir:
            _abs_path = os.path.abspath(list).split("/")
            _abs_path[len(_abs_path)-1] = subpath
            _abs_path.append(list)
            abs_path = "/".join(_abs_path)
            print(abs_path)
            if (os.path.isfile(abs_path)):
                
                folder_item.append({
                    "name": list,
                    "type": "file"
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
        return "0"
    


