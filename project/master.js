let todo = [];
let finishedTasks=[];

function loadTask() {
    const storedTodo = localStorage.getItem('todo');
   // const storedFinishedTasks = localStorage.getItem('finishedTasks');
    const storedFin= localStorage.getItem('finish')
    if (storedTodo) {
      todo = JSON.parse(storedTodo);
    }
    if (storedFin) {
      finishedTasks = JSON.parse(storedFin);
    }
  }

function saveTask() {
    localStorage.setItem('todo', JSON.stringify(todo));
   // localStorage.setItem('finishedTasks', JSON.stringify(finishedTasks));
    localStorage.setItem('finish',JSON.stringify(finishedTasks))
  }
loadTask();


function addFinTask(){
    let fin='';
for(let i= 0;i<finishedTasks.length;i++){
    const task =finishedTasks[i];
    const finHtml =`
            <div class="bg-blue-100/60 w-full line-through cursor-no-drop decoration-2 decoration-blue-950 px-2 lg:px-6 p-3 my-5 rounded-l-lg border-l-8 border-green-400 rounded-r-xl flex flex-col lg:flex-row justify-normal lg:justify-between lg:items-center">
                <p class="text-blue-950/60 font-semibold text-xs md:text-base lg:text-lg items-start">${task.name}</p>
                <div class="flex items-center justify-end gap-2 lg:gap-3 lg:mt-0 mt-3">
                    <p class="text-blue-950/60 font-semibold text-xs md:text-base lg:text-lg">${task.date}</p>
                    <button class="fin bg-red-500/60  w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full text-white font-semibold text-xs md:text-base lg:text-lg hover:scale-110 hover:bg-red-600 transition-all"><i class="bi bi-trash-fill"></i></button>
                </div>
            </div>
            `
            fin+=finHtml
}
document.querySelector('.finished-task').innerHTML=fin

document.querySelectorAll('.fin').forEach((btn,index)=>{
    btn.addEventListener('click',()=>{
        finishedTasks.splice(index,1)
         saveTask()
        addFinTask()
       
        renderToDo()
    })
})
}



function renderToDo() {
    let taskContainer = '';
    for (let i = 0; i < todo.length; i++) {
        const task = todo[i];
        let name = task.name;
        let date = task.date;
        //generating the html 
        let html = `
          <div class="task bg-blue-100 w-full px-2 lg:px-6 p-3 my-5 rounded-l-lg   border-l-8 border-red-400   rounded-r-xl flex flex-col lg:flex-row justify-normal lg:justify-between   lg:items-center">
          <p class="text-blue-950 font-semibold text-xs md:text-base lg:text-lg  items-start  ">${name}</p>
          <div class="flex items-center justify-end gap-2 lg:gap-3 lg:mt-0 mt-3">
          <p class=" text-blue-950 font-semibold text-xs md:text-base lg:text-lg">${date}</p>
          <button class="delete bg-red-500 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10  rounded-full text-white font-semibold text-xs md:text-base lg:text-lg hover:scale-110 hover:bg-red-600 transition-all"> <i class="bi bi-trash-fill"></i></button>
          <button class="done bg-green-500 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10  rounded-full text-white font-semibold text-xs md:text-base lg:text-lg hover:scale-110 hover:bg-green-600 transition-all"> <i class="fa-solid fa-check"></i></button>
          </div>
          </div>
          `;
        taskContainer += html;
    }
    document.querySelector('.task-container').innerHTML = taskContainer;

    // Add event listeners for delete and done buttons
    document.querySelectorAll('.delete').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            todo.splice(index, 1);
            saveTask()
            renderToDo();
           
        });
    });

    document.querySelectorAll('.done').forEach((btn, index) => {
        btn.addEventListener('click',()=>{
            const task = todo[index]
            todo.splice(index,1)
            finishedTasks.push(task)
            saveTask();
            addFinTask()
            renderToDo();

        })
    });
    document.querySelectorAll('.fin').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            finishedTasks.splice(index, 1); // Remove task from finished tasks array
            saveTask(); // Save changes to local storage
    
            // Re-render todo list
            renderToDo();
        });
    });
}

function addTask() {
    let input = document.querySelector('.inp');
    let dateInp = document.querySelector('.date');

    let addButton = document.querySelector('.add-button');
    addButton.addEventListener('click', () => {
        let value = input.value;
        let date = dateInp.value;

        if (value !== '' && date !== '') {
            todo.push({
                name: value,
                date: date,
            });
            saveTask();
            renderToDo();
        }

        input.value = '';
        dateInp.value = '';
    });
}

// Load tasks, add new tasks, and render existing tasks on page load
loadTask();
addTask();
renderToDo();
addFinTask(); 