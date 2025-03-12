

// State of the app
const todos = ["Walk the dog", "Water the plants", "Sand the chairs"];
// HTML element references
const addTodoInput = document.getElementById("input-element");
const addTodoButton = document.getElementById("add-btn-element");
const todosList = document.getElementById("todos-list");
// Initialize the view
for (const todo of todos) {
  todosList.append(renderTodoInReadMode(todo));
}

addTodoInput.addEventListener("input", () => {
  addTodoButton.disabled = addTodoInput.value.length < 3;
});

addTodoInput.addEventListener("keydown", ({ key }) => {
  if (key === "Enter" && addTodoInput.value.length >= 3) {
    addTodo();
  }
});


addTodoButton.addEventListener("click", () => {
  addTodo();
});

// Functions
function renderTodoInReadMode(todo) {
  // TODO: implement me!
  
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = todo;
  li.appendChild(span);

  li.addEventListener("dblclick", () => {
    const idx = todos.indexOf(todo);
    todosList.replaceChild(
      renderTodoInEditMode(todo),
      todosList.childNodes[idx]
    );
  });

  const button = document.createElement("button");
  button.textContent = "Done";

  button.addEventListener("click", () => {
    // removeTodo(todos.indexOf(todo));
    strikeTodo(todos.indexOf(todo))
  });

  li.appendChild(span);

  li.appendChild(button)

  return li;
}

function renderTodoInEditMode(todo){
    const li = document.createElement('li');
    const input = document.createElement('input');
    const saveButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    input.addEventListener("input",()=>{
        saveButton.disabled=input.value.length<=3;
    })
    

    input.value = todo;  // ✅ Corrected
    saveButton.textContent = "Save";
    cancelButton.textContent = "Cancel";
    
    saveButton.addEventListener('click',()=>{

        const idx = todos.indexOf(todo);
        todo=input.value;

        updateTodo(idx,todo);
        
        todosList.replaceChild(renderTodoInReadMode(todo),todosList.childNodes[idx])
        
    })


    

    cancelButton.addEventListener("click", () => {
        const idx = todos.indexOf(todo);
        if (idx !== -1) {
          todosList.replaceChild(renderTodoInReadMode(todo), todosList.childNodes[idx]);
        }
      });

    li.append(input);
    li.append(saveButton);
    li.append(cancelButton);
      

    return li;

}

function addTodo() {
    const description = addTodoInput.value;

    const idx = todos.indexOf(description);

    if(idx!==-1){
        alert('redudant tasks are not allowed');
        
        return;
    }


    todos.push(description)



    const todoElement = renderTodoInReadMode(description);
    todosList.appendChild(todoElement);
    const speakOutText = `todo with description,${description} added successfully`

    readOut(speakOutText);

    addTodoInput.value = ''
    addTodoButton.disabled=true;
}

function removeTodo(index) {
    if (index > -1) {
      todos.splice(index, 1); // ✅ First, remove the item from the state (array)
      todosList.removeChild(todosList.childNodes[index]); // ✅ Then remove it from the DOM
    }
  }
  

function updateTodo(index,value){
   if(index>-1){
    todos[index]=value;
    
   }
}

function strikeTodo(index){
    if(index>-1){
        todosList.replaceChild(renderStrikeTodo(index), todosList.childNodes[index]);
    }
}

function renderStrikeTodo(index){
    const li = document.createElement('li')
    const todo = renderTodoInReadMode(todos[index]);
    const span = todo.querySelector('span');
    const strikedEl = document.createElement('s');

    li.append(strikedEl);
    strikedEl.textContent=span.textContent;

    return li;
}







const readOut = (text) => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text); // ✅ Use `text` directly
  
    // Get available voices
    const voices = synth.getVoices();
  
    if (voices.length > 0) {
      utterThis.voice = voices[0]; // ✅ Use the first available voice
    }
  
    synth.speak(utterThis);
  };
  