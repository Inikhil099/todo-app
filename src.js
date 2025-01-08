const input = document.querySelector(".task");
const ad = document.querySelector(".adding");
const display = document.querySelector(".display");
const i = "fa-solid fa-trash";
const def = document.querySelector(".default");
const flter = document.querySelector(".filter");
let newArr = [];

function createTodo(a) {
  def?.remove();

  for (let i = 0; i <= input.value.length; i++) {
    if (input.value[i] == " ") {
      new swal("Don't Make An Empty TODO ");
      return;
    }
  }
  if (input.value == "") {
    new swal("Don't Make An Empty TODO ");
    return;
  } else {
    newArr.push(input.value);
    localStorage.setItem("todos", newArr);
    generate(input.value);
  }
}

ad.addEventListener("click", (e) => {
  createTodo(input.value);
  input.value = "";

  flter.addEventListener("input", (e) => {
    fil(e);
  });
});

function createOnLoad() {
  flter.addEventListener("input", (e) => {
    fil(e);
  });

  def?.remove();
  let get = localStorage.getItem("todos");
  if (localStorage.length != 0) {
    newArr = get.split(",");
    newArr = newArr.filter((e) => {
      return e != "";
    });
  }

  if (localStorage.length < 0 || newArr.length == 0) {
    localStorage.removeItem("todos");
    return;
  }

  newArr.forEach((e) => {
    generate(e);
  });
}

// filtering todos

function fil(e) {
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
      item.style.display = "flex"
      let replace = to_lower.replace(lower, `<span class="sp">${lower}</span>`);
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
}

function generate(arg) {
  const div = document.createElement("div");
  div.className = "todos";

  const p = document.createElement("p");
  p.className = "txt";
  p.innerText = arg;
  const TodoDone = () => {
    if (check.checked) {
      p.style.textDecoration = "line-through";
      p.style.textDecorationColor = "red";
    } else {
      p.style.textDecoration = "none";
    }
  };

  const ops = document.createElement("div");
  ops.className = "ops";

  const check = document.createElement("input");
  check.type = "checkbox";
  check.style.cursor = "pointer";
  check.addEventListener("change", () => {
    TodoDone();
  });

  const remove = document.createElement("i");
  remove.className = i;
  function removeTodo(e) {
    const parentElem = e.target.parentElement.parentElement;
    const firChild = parentElem.firstChild;
    parentElem.remove();
    newArr = newArr.filter((e) => {
      return e != firChild.innerText;
    });
    localStorage.setItem("todos", newArr);
  }
  remove.addEventListener("click", removeTodo);

  display.appendChild(div);
  div.appendChild(p);
  div.appendChild(ops);
  ops.appendChild(check);
  ops.appendChild(remove);
}
