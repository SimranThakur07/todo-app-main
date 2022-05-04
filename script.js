const moon = document.getElementById('moon');


moon.addEventListener('click', function(){
    var body = document.querySelector('.todo-page')
    console.log("clicked");
    body.classList.add('dark')
    
})
const note = document.getElementById('text')
const list = document.querySelector('.main-box')
const form = document.querySelector('form')
form.addEventListener('submit', function(e){
  e.preventDefault();
  addTodo();
})
let todos = JSON.parse(localStorage.getItem("todos"))
if(todos){
todos.forEach(element => {
    addTodo(element)
});
}
function addTodo(elem) {
    let todoCall = document.createElement("div")
    todoCall.classList.add("todoCall")
    let todoNote = text.value
    if(elem){
        todoNote = elem.text
    }
    if(todoNote){
    todoCall.innerHTML =`
    <div class="list-box">
    <button class="check-btn ${elem && elem.complete ? "show": ""}"><img src="images/icon-check.svg" alt=""></button>
    <p class="ptag ${elem && elem.complete?"complete":""}"> ${todoNote} </p>
    <button class="delete-btn"><img src="images/icon-cross.svg" alt=""></button>
   </div>
  `
  list.appendChild(todoCall)
  updateList();
    }
  let remove = todoCall.querySelector('.delete-btn')
  remove.addEventListener('click', ()=>{
    todoCall.remove();
    updateList();
  })
       
  let check = todoCall.querySelector('.check-btn')
      check.addEventListener('click', ()=>{
         check.classList.toggle('show')
         todoCall.children[0].children[1].classList.add('complete')
         updateList();
      })
      text.value = "";
}

function updateList() {
    let ptag = document.querySelectorAll(".ptag")
    let arr = []
    ptag.forEach(element => {
        arr.push({
            text: element.innerText,
            complete: element.classList.contains('complete')
        })
    });
    localStorage.setItem("todos", JSON.stringify(arr))
}

let lists = document.querySelectorAll('.list li')
let todoList = document.querySelectorAll('.todoCall')

// console.log(lists);
lists.forEach(element => {
    element.addEventListener('click', ()=>{
        lists.forEach(item => {
            item.classList.remove('active')
        });
        element.classList.add('active')
        if(element.innerText == "Active"){
            todoList.forEach(elem => {
                if(!elem.children[0].children[1].classList.contains("complete")){
                    elem.style.display = "flex"
                }else{
                    elem.style.display = "none"
                }
            });
        }else if(element.innerText == "Completed"){
            todoList.forEach(elem => {
                if(elem.children[0].children[1].classList.contains("complete")){
                    elem.style.display = "flex"
                }else{
                    elem.style.display = "none"
                }
            });
        }else{
            todoList.forEach(elem => {
                    elem.style.display = "flex"
            });
        }
    })
});

const allClear = document.querySelector('.clear-item')
allClear.addEventListener('click', () => {
    todoList.forEach(elem => {
        if(elem.children[0].children[1].classList.contains("complete")){
            elem.remove()
            updateList();
        }
    });
})

const left = document.querySelector('.left')
 function setitem() {
    let leftTodo = document.querySelectorAll('.main-box .show')
    // console.log(leftTodo);
    let diff = todoList.length-leftTodo.length
    left.innerText = `${diff} items left`
}
setitem();