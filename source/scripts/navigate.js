const fs = require("fs");

function shift_item(from, to, item){
  fs.readFile("./data/data.json", function(err, data){
    if(err){
      console.log("File Error:", err);
    } else {
      data = JSON.parse(data);
      delete data[from][data[from].indexOf(item)]
      data[to].push(item);
      data[from] = data[from].filter(Boolean);
      data = JSON.stringify(data);
      fs.writeFile("./data/data.json", data, function(err){
        if(err){
          console.log("File Write Error:", err);
        }
      });
    }
  })
}

function slugify(value){
  value = value.toLowerCase();
  value = value.replace(/\s+/g, "_");
  return value;
}

function add_buffer(item, id){
  document.getElementById(id).remove();
  var element = document.getElementById("scrum-buffer-list");
  var snippet = "";

  snippet += '<div class="scrum-buffer-item scrum-item" id="' + slugify(item) + '">';
  snippet += '<span class="push" onclick="push(event)" value="right"> > </span>';
  snippet += '<span class="scrum-buffer-item-span">' + item;
  snippet += '</span>';
  snippet += '</div>';
  element.innerHTML += snippet;
}

function add_inprogress(item, id){
  document.getElementById(id).remove();
  var element = document.getElementById("scrum-inprogress-list");
  var snippet = "";

  snippet += '<div class="scrum-inprogress-item scrum-item" id="' + slugify(item) + '">';
  snippet += '<span class="push" onclick="push(event)" value="right"> > </span>';
  snippet += '<span class="push" onclick="push(event)" value="left"> < </span>';
  snippet += '<span class="scrum-inprogress-item-span">' + item + '</span>';
  snippet += '</div>';

  element.innerHTML += snippet; 
}

function add_ready(item, id){
  document.getElementById(id).remove();
  var element = document.getElementById("scrum-ready-list");
  var snippet = "";

  snippet += '<div class="scrum-ready-item scrum-item" id="' + slugify(item) + '">';
  snippet += '<span class="push" onclick="push(event)" value="left"> < </span>';
  snippet += '<span class="scrum-ready-item-span">' + item + '</span>';
  snippet += '</div>';

  element.innerHTML += snippet;
}

function push(eve){
  var direction  = eve.srcElement.attributes.value.value;
  var parent_ele = eve.path[1];
  var class_name = parent_ele.attributes.class.value.split(" ")[0];
  var ele_id = parent_ele.attributes.id.value;
  var shift_to;

  if(class_name == "scrum-buffer-item"){
    doc_ele = document.getElementById(ele_id).children[1];
    if(direction == "right"){
      add_inprogress(doc_ele.innerText, ele_id);
      shift_item("buffer", "inprogress", doc_ele.innerText);
    }
  }
  else if(class_name == "scrum-inprogress-item"){
    doc_ele = document.getElementById(ele_id).children[2];
    if(direction == "right"){
      add_ready(doc_ele.innerText, ele_id);
      shift_item("inprogress", "ready", doc_ele.innerText);
    }
    else if(direction == "left"){
      add_buffer(doc_ele.innerText, ele_id);
      shift_item("inprogress", "buffer", doc_ele.innerText);
    }
  }
  else if(class_name == "scrum-ready-item"){
    doc_ele = document.getElementById(ele_id).children[1];
    if(direction == "left"){
      add_inprogress(doc_ele.innerText, ele_id);
      shift_item("ready", "inprogress", doc_ele.innerText);
    }
  }
}
