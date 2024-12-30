const input = document.querySelector(".task");
const ad = document.querySelector(".adding");
const display = document.querySelector(".display");
const i = "fa-solid fa-trash";
const def = document.querySelector(".default");
const flter = document.querySelector(".filter");
let newArr = [];

function createTodo(a) {
  def?.remove();
  if (input.value != "") {
    newArr.push(input.value);
  }
  localStorage.setItem("todos", newArr);
  console.log(newArr);

  let div = document.createElement("div");
  div.className = "todos";

  if (input.value == "") {
    div.remove();
    // display.appendChild(def);
    // def.innerText = "Your TODOS";
    new swal("Don't Make An Empty TODO ");
    return;
  }

  let p = document.createElement("p");
  p.className = "txt";
  p.innerText = a;
  const TodoDone = () => {
    if (check.checked) {
      p.style.textDecoration = "line-through";
      p.style.textDecorationColor = "red";
    } else {
      p.style.textDecoration = "none";
    }
  };

  let ops = document.createElement("div");
  ops.className = "ops";

  let check = document.createElement("input");
  check.type = "checkbox";
  check.style.cursor = "pointer";
  check.addEventListener("change", () => {
    TodoDone();
  });

  let remove = document.createElement("i");
  remove.className = i;
  function removeTodo(e) {
    let parentElem = e.target.parentElement.parentElement;
    let firChild = parentElem.firstChild;
    parentElem.remove();

    newArr = newArr.filter((e) => {
      console.log(firChild.innerText);

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

ad.addEventListener("click", (e) => {
  createTodo(input.value);
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

function createOnLoad() {
  let get = localStorage.getItem("todos");
  newArr = get.split(",");
  newArr = newArr.filter((e) => {
    e != " ";
  });
  console.log(newArr);
  if (localStorage.length < 1 || newArr.length < 1) {
    return;
  }

  newArr.forEach((e) => {
    let div = document.createElement("div");
    div.className = "todos";

    let p = document.createElement("p");
    p.className = "txt";
    p.innerText = e;
    const TodoDone = () => {
      if (check.checked) {
        p.style.textDecoration = "line-through";
        p.style.textDecorationColor = "red";
      } else {
        p.style.textDecoration = "none";
      }
    };

    let ops = document.createElement("div");
    ops.className = "ops";

    let check = document.createElement("input");
    check.type = "checkbox";
    check.style.cursor = "pointer";
    check.addEventListener("change", () => {
      TodoDone();
    });

    let remove = document.createElement("i");
    remove.className = i;
    function removeTodo(e) {
      let parentElem = e.target.parentElement.parentElement;
      let firChild = parentElem.firstChild;
      parentElem.remove();
      newArr = newArr.filter((e) => {
        console.log(firChild.innerText);

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
  });
}
