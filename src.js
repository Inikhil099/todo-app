const input = document.querySelector(".task");
const ad = document.querySelector(".adding");
const display = document.querySelector(".display");
const i = "fa-solid fa-trash";
const def = document.querySelector(".default");
const filterInput = document.querySelector(".filter");
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
  }
  else {
    newArr.push(input.value);
    localStorage.setItem("todos", newArr);
    generate(a);
  }
}

ad.addEventListener("click", (e) => {
  createTodo(input.value);
  input.value = "";

  filterInput.addEventListener("input", (e) => {
    fil(e);
  });
});

const TodoDone = (e) => {
  if (e.target.checked) {
    e.target.parentElement.parentElement.firstChild.className = "checked"
  } else {
    e.target.parentElement.parentElement.firstChild.className = "txt";
  }
};

function createOnLoad() {
  filterInput.addEventListener("input", (e) => {
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

function fil(e) {
  let val = filterInput.value;
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
    if (filterInput.value == "") {
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

  let p = document.createElement("p");
  p.className = "txt";
  p.innerText = arg;

  const options = document.createElement("div");
  options.className = "options";

  const check = document.createElement("input");
  check.className = "check"
  check.type = "checkbox";
  check.style.cursor = "pointer";
  check.addEventListener("change", (event) => {
    TodoDone(event);
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

  const edit = document.createElement("i")
  edit.className = "fa-solid fa-pencil edit options"
  edit.addEventListener("click",(e)=>{
    EditTodo(e)
  })

  display.appendChild(div);
  div.appendChild(p);
  div.appendChild(options);
  options.appendChild(edit)
  options.appendChild(check);
  options.appendChild(remove);
}

function EditTodo(e) {
  e.target.style.display = "none"
  let para = e.target.parentElement.parentElement;
  let before = para.innerText;
  let editInput = document.createElement("input")
  editInput.type = "text"
  editInput.className = "editinput"
  para.firstChild.remove()
  para.insertBefore(editInput,para.firstChild)
  editInput.value = before;
  editInput.focus()
  editInput.addEventListener("blur",()=>{
    
    let p = document.createElement('p')
    p.className = "txt"
    p.innerText = editInput.value;
    editInput.remove()
    para.insertBefore(p,para.firstChild)
    e.target.style.display = "inline"

    if (editInput.value == "") {
      p.innerText = before;
      return;
    }
    for (let i = 0; i <= editInput.value.length; i++) {
      if (editInput.value[i] == " ") {
        p.innerText = before;
        return;
      }
    }
    let indx = newArr.indexOf(before)
    newArr[indx] = editInput.value;
    localStorage.setItem("todos",newArr)
  })
}