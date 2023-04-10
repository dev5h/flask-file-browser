var path_array = [];
//Initiating pathbar:
function init_pathbar(path_ = "?") {
  if (path_ == "?") {
    path_array = path_.substring(1).split("/");
  } else {
    path_array =
      path_[0] == "/" ? path_.substring(1).split("/") : path_.split("/");
  }
  path_array = path_array.filter((e) => e != "");
  if (path_array.length > 0) {
    let offset = `<div class="pathbar_item" onclick="load_flist('/')">•••</div><img class="path_bar_arrow" src="/static/assets/ic_right.svg"/>`;
    let redirect = "/";
    path_array.forEach((item, id) => {
      redirect += item + "/";
      if (id + 1 == path_array.length) {
        offset += `
      <div style="color:lime" class="pathbar_item">${item}</div> `;
      } else {
        offset += `
    <div onclick="load_flist('${redirect.substring(
      0,
      redirect.length - 1
    )}')" class="pathbar_item">${item}</div><img class="path_bar_arrow" src="/static/assets/ic_right.svg"/>
    `;
      }
    });
    path_bar.innerHTML = offset;
  } else {
    // console.log("root");
  }
}
init_pathbar();

//Loading file list
function load_flist(path_ = "?") {
  console.log("I am Clicked", path_);

  var fetch_uri;
  if (path_ == "?") {
    fetch_uri = "api" + path;
  } else {
    fetch_uri = "api" + path_;
  }

  fetch(fetch_uri)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      // console.log(data);
      let vertex = "";
      data.forEach((item, id) => {
        if (item.type == "dir") {
          vertex += `
        <div class='ls-dir' dir-name='${item.name}'>
        <img src="/static/assets/ic_folder.svg" alt="" class="dir_ic" />
          <div class='title'> ${item.name}</div>
        </div>
        `;
        } else if (item.type == "file") {
          vertex += `
        <div class='ls-file'>
          <div class='title'> ${item.name}</div>
          <div class='size'> ${item.size}K</div>
        </div>
        `;
        }
      });
      file_list_container.innerHTML = vertex;
      const dirs = document.querySelectorAll(".ls-dir");
      for (var i = 0; i < dirs.length; i++) {
        dirs[i].addEventListener("click", function () {
          load_flist(path + this.getAttribute("dir-name"));
          path = path + this.getAttribute("dir-name") + "/";
          init_pathbar(path.substring(0, path.length - 1));
          console.log("Path array", path_array);
        });
      }
    });
}
load_flist();
