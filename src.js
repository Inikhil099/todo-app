const input = document.querySelector(".task");
const ad = document.querySelector(".adding");
const display = document.querySelector(".display");
const i = '<i class="fa-solid fa-trash"></i>';
const def = document.querySelector(".default");

ad.addEventListener("click", (e)=>{
  def.remove();

  let div = document.createElement("div");
  div.className = "todos";

  let p = document.createElement("p");
  p.className = "txt";
  p.innerText = input.value;
  p.style.textTransform = 'capitalize'

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

  
  if (input.value == ""){
    div.remove()
    display.appendChild(def)
    def.innerText = "Your haven't type something to add"
    
  }
  input.value = ''


  check.addEventListener("change", () => {
    if (check.checked) {
      p.style.textDecoration = "line-through";
      p.style.textDecorationColor = "red"
    } else {
      p.style.textDecoration = "none"
    }
  });


  remove.addEventListener('click', function(e) {
    const pa = e.target.parentElement.parentElement.parentElement
    pa.remove()

    })











  

});
