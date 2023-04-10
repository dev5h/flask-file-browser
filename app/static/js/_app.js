var path_bar_items = [];
var uri = "/api";
const addPathBarItem = (item) => {};

function init_pathbar() {
  var buffer = `<div class="pathbar_item" data-index="-1" data-path="/">•••</div><img class="path_bar_arrow" src="/static/assets/ic_right.svg"/>`;
  path_bar_items.forEach((item, i) => {
    buffer += `<div class="pathbar_item" data-index="${i}" data-path="${item}">${item}</div><img class="path_bar_arrow" src="/static/assets/ic_right.svg"/>`;
  });
  path_bar.innerHTML = buffer;
  var bar_paths = document.querySelectorAll(".pathbar_item");
  for (var i = 0; i < bar_paths.length; i++) {
    bar_paths[i].addEventListener("click", function (e) {
      let slice_idx = parseInt(e.currentTarget.getAttribute("data-index")) + 1;
      open_bar_path(slice_idx);
    });
  }
}
init_pathbar();

//Open Bar Path

var open_bar_path = (slice_idx) => {
  if (slice_idx == 0) {
    path_bar_items = [];
    uri = "/api";
  } else {
    path_bar_items = path_bar_items.slice(0, slice_idx);
    uri = "/api/" + path_bar_items.join("/");
  }

  init_pathbar();
  listDir(uri);
};

//A function to open a new path...
const openPath = (path_) => {
  uri += "/" + path_;
  listDir(uri);
};

function listDir(path_) {
  let fetch_uri = path_;
  fetch(fetch_uri)
    .then((resp) => resp.json())
    .then((data) => {
      var buffer = "";
      if (data.length == 0) {
        file_list_container.innerHTML = `<h1>Empty</h1>`;
      }
      data.forEach((item, i) => {
        if (item.type == "dir") {
          buffer += `
            <div class='ls-dir' dir-name='${item.name}'>
                <img src="/static/assets/ic_folder.svg" alt="" class="dir_ic" />
                <div class='title'> ${item.name}</div>
            </div>
            `;
        } else {
          buffer += `
            <div class='ls-file'>
                <div class="file_icon_pack">
                    
                    <img src="/static/assets/ic_file.svg" class="file_ic"/>
                    <div class='title'> ${item.name}</div>
                </div>
                <div class='size'> ${item.size}K</div>
          </div>
            `;
        }
      });
      file_list_container.innerHTML = buffer;
      //Checking click event for directories
      var dirs = document.querySelectorAll(".ls-dir");
      for (var i = 0; i < dirs.length; i++) {
        dirs[i].addEventListener("click", (e) => {
          openPath(e.currentTarget.getAttribute("dir-name"));
          path_bar_items.push(e.currentTarget.getAttribute("dir-name"));
          init_pathbar();
        });
      }
    });
}

listDir("/api");
