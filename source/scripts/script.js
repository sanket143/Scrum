const fs = require("fs");

function async(data, callback){
  callback(data);
}

function slugify(value){
  value = value.toLowerCase();
  value = value.replace(/\s+/g, "_");
  return value;
}

function add_buffer_in_list(item){
  fs.readFile("./data/data.json", function(err, data){
    if(err){
      console.log("File Error:", err);
    } else {
      data = JSON.parse(data);
      data.buffer.push(item);

      data = JSON.stringify(data);
      fs.writeFile("./data/data.json", data, function(err){
        if(err){
          console.log("File Write Error:",err);

          let notify = new Notification("Scrum", {
            body: "Error Occured in adding new Buffer."
          });

          notify.onclick = function(){}
        } else {
          let notify = new Notification("Scrum", {
            body: "\"" + item + "\" successfully added to your Buffer"
          });

          notify.onclick = function(){
          }
        }
      });
    }
  });

  var buffer_list = document.getElementById("scrum-buffer-list");
  html = "";
  html += '<div class="scrum-buffer-item scrum-item" id="' + slugify(item) + '">';
  html += '<span class="push" onclick="push(event)" value="right"> > </span>';
  html += '<span class="scrum-buffer-item-span">' + item;
  html += '</span> ';
  html += '</div>';

  buffer_list.innerHTML += html;
}

fs.readFile("./data/data.json", function(err, data){
  if(err){
    console.log("File Error:", err);
  } else {
    var jsonObj = JSON.parse(data.toString());
    async(jsonObj, function(data){
      var html = "";
      var buffer_list = document.getElementById("scrum-buffer-list");
      data.buffer.forEach(function(item){
        html = "";
        html += '<div class="scrum-buffer-item scrum-item" id="' + slugify(item) + '">';
        html += '<span class="push" onclick="push(event)" value="right"> > </span>';
        html += '<span class="scrum-buffer-item-span">' + item;
        html += '</span>';
        html += '</div>';

        buffer_list.innerHTML += html;
      })
    });

    async(jsonObj, function(data){
      var html;
      var inprogress_list = document.getElementById("scrum-inprogress-list");
      data.inprogress.forEach(function(item){
        html = "";
        html += '<div class="scrum-inprogress-item scrum-item" id="' + slugify(item) + '">';
        html += '<span class="push" onclick="push(event)" value="right"> > </span>';
        html += '<span class="push" onclick="push(event)" value="left"> < </span>';
        html += '<span class="scrum-inprogress-item-span">' + item;
        html += '</span>';
        html += '</div>';

        inprogress_list.innerHTML += html;
      });
    });

    async(jsonObj, function(data){
      var html = "";
      var ready_list = document.getElementById("scrum-ready-list");
      data.ready.forEach(function(item){
        html = "";
        html += '<div class="scrum-ready-item scrum-item" id="' + slugify(item) + '">';
        html += '<span class="push" onclick="push(event)" value="left"> < </span>';
        html += '<span class="scrum-ready-item-span">' + item;
        html += '</span>';
        html += '</div>';

        ready_list.innerHTML += html;
      })
    });
  }
});

const add_buffer = document.getElementById("add-buffer");

function buffer_on_blur(){
  if(add_buffer.innerText.replace(/\s+/g, "").length === 0){
    add_buffer.innerHTML = "<span class='add-new-buffer'>+</span> Add New Buffer</div>";
  }
}

add_buffer.onclick = function(){
  this.innerHTML = "";
}

add_buffer.onblur = function(){
  buffer_on_blur();
}

add_buffer.onkeypress = function(eve){
  if(eve.keyCode == 13){
    add_buffer_in_list(add_buffer.innerText);
    add_buffer.innerHTML = "";
    add_buffer.blur();
    buffer_on_blur();
  }
}
/* TO NOTIFY?

document.getElementById("click").onclick = function(){
  let notify = new Notification("Scrum", {
    body: "New Buffer Added :)"
  });

  notify.onclick = function(){
    console.log("Notification Clicked");
  }
}
*/
