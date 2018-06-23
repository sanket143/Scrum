const fs = require("fs");

var push_char = document.getElementsByClassName("push");

console.log(push_char);

push_char.onclick = function(){
  console.log(this.value);
}
