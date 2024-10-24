const input = document.querySelector(".task");
const ad = document.querySelector(".adding");
const display = document.querySelector(".display");
const i = "fa-solid fa-trash";
const def = document.querySelector(".default");
const flter = document.querySelector(".filter");

let count = 1;

if (localStorage.length != 0) {
  count = localStorage.length;
}
else {
  count = 1;}

ad.addEventListener("click", (e) => {
  def.remove();

  let div = document.createElement("div");
  div.className = "todos";
  div.value = count;

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

  display.appendChild(div);
  div.appendChild(p);
  div.appendChild(ops);
  ops.appendChild(check);
  ops.appendChild(remove);


 if (input.value != "") {
  localStorage.setItem(`item${count}`, input.value);
  count = count + 1;
 }

  check.addEventListener("change", () => {
    if (check.checked) {
      p.style.textDecoration = "line-through";
      p.style.textDecorationColor = "red";
    } else {
      p.style.textDecoration = "none";
    }
  });

  remove.addEventListener("click", (e) => {
    let pa = e.target.parentElement.parentElement;
    localStorage.removeItem(`item${pa.value}`)
    pa.remove();

    count = count - 1;
  });


  if (input.value == "") {
    div.remove();
    display.appendChild(def);
    def.innerText = "Your haven't type something to add";
    if (localStorage.length == 0 ) {
      count = 1;
    }
    else{
      count = localStorage.length;
    }
    Swal.fire("You Cannot Make An Empty TODO");
  }

  input.value = "";

  flter.addEventListener("input", (e) => {
    let val = flter.value;
    let lower = val.toLowerCase();
    let all_todos = document.querySelectorAll(".todos");

    all_todos.forEach((item) => {
      let para = item.firstChild;
      let to_lower = para.innerText.toLowerCase();
      let condition = to_lower.includes(lower) || to_lower == lower;

      if (condition != true) {
        item.style.display = 'none'
      }
      if (condition == true) {
        item.classList.add("filtered");
        let replace = to_lower.replace(lower, `<span class="sp">${lower}</span>`);
        para.innerHTML = replace;
        para.style.textTransform = 'none'
      }
      if (flter.value == "") {
        item.style.display = 'flex'
        let span = document.querySelectorAll(".sp");
        span.forEach((e) => {
          e.replaceWith(e.innerText);
        });
      }

    });
  });
});


const load = () => {

  for (let b = 1; b <= localStorage.length; b++) {

    let l = localStorage.getItem(`item${b}`)
    let div = document.createElement("div");
    div.className = "todos";
    div.value = b;
    if (l == undefined || l == null || l == "") {
      localStorage.removeItem(`item${localStorage.length}`)
      continue;
    }

    let p = document.createElement("p");
    p.className = "txt";
    p.innerHTML = l;

    let ops = document.createElement("div");
    ops.className = "ops";

    let check = document.createElement("input");
    check.type = "checkbox";
    check.className = "ch"
    check.style.cursor = "pointer";

    let remove = document.createElement("i");
    remove.className = i;

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

    remove.addEventListener("click",(e)=> {
      let pa = e.target.parentElement.parentElement;
      localStorage.removeItem(`item${pa.value}`)
      pa.remove();
      console.log(pa.value);
      count = localStorage.length;
    });

  }
}