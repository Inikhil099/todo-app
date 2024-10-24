const input = document.querySelector(".task");
const ad = document.querySelector(".adding");
const display = document.querySelector(".display");
// const i = '<i class="fa-solid fa-trash"></i>';
const i = "fa-solid fa-trash";
const def = document.querySelector(".default");
const flter = document.querySelector(".filter");
let cnt = 1;
let list_count = 1;

ad.addEventListener("click", (e) => {
  
  def.remove();

  let div = document.createElement("div");
  div.className = "todos";
  div.value = cnt;
  cnt = cnt + 1;

  let p = document.createElement("p");
  p.className = "txt";
  p.innerText = input.value;

  let ops = document.createElement("div");
  ops.className = "ops";

  let check = document.createElement("input");
  check.type = "checkbox";
  check.style.cursor = "pointer";

  let remove = document.createElement("i");
  remove.className = i;
  remove.style.cursor = "pointer"

  display.appendChild(div);
  div.appendChild(p);
  div.appendChild(ops);
  ops.appendChild(check);
  ops.appendChild(remove);

  localStorage.setItem(`list${list_count}`,[input.value]);
  list_count = list_count + 1;

  if (input.value == "") {
    div.remove();
    display.appendChild(def);
    def.innerText = "Your haven't type something to add";

    if (localStorage.length != 0) {
      cnt = localStorage.length;
      list_count = localStorage.length; 
    }
    else{
      cnt = 1;
      list_count = 1;
    }
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
    let pa = e.target.parentElement.parentElement;
    console.log(pa.value);
    pa.remove();
    localStorage.removeItem(`list${pa.value}`)
    cnt = localStorage.length;
  });

  flter.addEventListener("input", (e) => {
    let val = flter.value;
    let lower = val.toLowerCase();
    let all_todos = document.querySelectorAll(".todos");

    all_todos.forEach((item) => {
      let para = item.firstChild;
      let to_lower = para.innerText.toLowerCase();
      let condition = to_lower.includes(lower) || to_lower == lower;

      if (condition != true) {
        item.style.display = "none";
      }
      if (condition == true) {
        item.classList.add("filtered");
        let replace = to_lower.replace(
          lower,
          `<span class="sp">${lower}</span>`
        );
        para.innerHTML = replace;
      }
      if (flter.value == "") {
        item.style.display = "flex";
        let span = document.querySelectorAll(".sp");
        span.forEach((e) => {
          e.replaceWith(e.innerText);
        });
      }
    });
  });
});

const load = () => {
  if (localStorage.length != 0) {
    cnt = localStorage.length;
  }
  else{
    cnt = 1;
  }
  
  for (let b = 1; b <= localStorage.length; b++) {
    let l = localStorage.getItem(`list${b}`);
    if (l==null) {
      continue;
    }
    
    let div = document.createElement("div");
    div.className = "todos";
    div.value = b;

    let p = document.createElement("p");
    p.className = "txt";
    p.innerText = l;

    let ops = document.createElement("div");
    ops.className = "ops";

    let check = document.createElement("input");
    check.type = "checkbox";
    check.style.cursor = "pointer";

    let remove = document.createElement("i");
    remove.className = i;
    // remove.innerHTML = i;

    display.appendChild(div);
    div.appendChild(p);
    div.appendChild(ops);
    ops.appendChild(check);
    ops.appendChild(remove);


    check.addEventListener("change", () => {
      if (check.checked) {
        p.style.textDecoration = "line-through";
        p.style.textDecorationColor = "red";
      } else {
        p.style.textDecoration = "none";
      }
    });
  
    remove.addEventListener("click", (e)=> {
      let pa = e.target.parentElement.parentElement;
      console.log(pa.value);
      pa.remove();
      localStorage.removeItem(`list${pa.value}`)
      cnt = cnt - 1;
    });
  }
};
