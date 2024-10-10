const input = document.querySelector(".task");
const ad = document.querySelector(".adding");
const display = document.querySelector(".display");
const i = '<i class="fa-solid fa-trash"></i>';
const def = document.querySelector(".default");
const flter = document.querySelector(".filter");

ad.addEventListener("click", (e) => {
  
  def.remove();
  // if (display.innerHTML == false) {
  //   document.body.style.backgroundColor = 'green'
  // }

  let div = document.createElement("div");
  div.className = "todos";

  let p = document.createElement("p");
  p.className = "txt";
  p.innerText = input.value;
  p.style.textTransform = "capitalize";

  let ops = document.createElement("div");
  ops.className = "ops";

  let check = document.createElement("input");
  check.type = "checkbox";
  check.style.cursor = "pointer";

  let remove = document.createElement("button");
  remove.className = "remove";
  remove.innerHTML = i;

  display.appendChild(div);
  div.appendChild(p);
  div.appendChild(ops);
  ops.appendChild(check);
  ops.appendChild(remove);
  console.log(div.value);

  if (input.value == "") {
    div.remove();
    display.appendChild(def);
    def.innerText = "Your haven't type something to add";
  }
  input.value = "";

  check.addEventListener("change", () => {
    if (check.checked) {
      p.style.textDecoration = "line-through";
      p.style.textDecorationColor = "red";
    } else {
      p.style.textDecoration = "none";
    }
  });

  remove.addEventListener("click", function (e) {
    const pa = e.target.parentElement.parentElement.parentElement;
    pa.remove();
  });

  flter.addEventListener("input", (e) => {
    let val = flter.value;
    let lower = val.toLowerCase()
    console.log(val);

    let all = document.querySelectorAll(".todos");
    all.forEach((item, index) => {
      item.value = index;
      let para = item.firstChild;
      let tl = para.innerText.toLowerCase()
      let condition = tl.includes(val)
      if (flter.value == '') {
        para.style.color = 'black'
      }

      else if (condition == true) {
        item.style.backgroundColor = 'black'
        document.querySelectorAll('i').forEach((e)=>{e.style.color = 'white'})
        para.style.color = 'white'
      }
      
    });
    
    
  });








});
