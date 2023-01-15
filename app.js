// define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event 
  form.addEventListener("submit" , addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  //filter tasks event 
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks() {
    let tasks;
if(localStorage.getItem('tasks') === null){
    tasks = [];
} else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function(task){
     // Creat li element
     const li = document.createElement('li');
     //Add class 
     li.className = 'collection-item';
 // Create text node and append to il
 li.appendChild(document.createTextNode(task));
 // create new link element
 const link = document.createElement('a');
 //Add class
 link.className = 'delete-item secondary-content';
 // Add icon html
 link.innerHTML = '<i class="fa fa-remove"></i>'
 // Append the link to li 
 li.appendChild(link);
 
 //Append li to ul
 taskList.appendChild(li);

});
}
//Add Task 
function addTask(e) {
    if (taskInput.value === ''){
        alert('Add a task');
    }

    
    
    // Creat li element
    const li = document.createElement('li');
    //Add class 
    li.className = 'collection-item';
// Create text node and append to il
li.appendChild(document.createTextNode(taskInput.value));
// create new link element
const link = document.createElement('a');
//Add class
link.className = 'delete-item secondary-content';
// Add icon html
link.innerHTML = '<i class="fa fa-remove"></i>'
// Append the link to li 
li.appendChild(link);

//Append li to ul
taskList.appendChild(li);

// Store in ul
storeTaskInLocalStorage(taskInput.value);

//clear input 
taskInput.value = '';

 e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task){
let tasks;
if(localStorage.getItem('tasks') === null){
    tasks = [];
}else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}
tasks.push(task);

localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains
        ('delete-item')){
            if(confirm('Are You Sure')){
        e.target.parentElement.parentElement.remove();
      // Remove from LS 
      removeTaskFromLocalStorage
      (e.target.parentElement.parentElement);
      }
     }
    }
    //  Remove from LS
    function removeTaskFromLocalStorage(taskItem){
        let tasks;
      if(localStorage.getItem('tasks') === null){
    tasks = [];
      }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
      }

      tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
      });

      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    // Clear Tasks
    function clearTasks(){
       // taskList.innerHTML = '';

       // Faster
       while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
       }


       // https://jsperf.com/innerhtml-vs-removechild
    
     // Clear from Ls
     clearTasksFromLocalStorage();
    
    }
     // Clear Task from LS
     function clearTasksFromLocalStorage() {
        localStorage.clear();
     } 

       // Filter tasks
       function filterTasks(e) {
        const text = e.target.value.toLowerCase();

        document.querySelectorAll('.collection-item').forEach
        (function(task){
            const item = task.firstChild.textContent;
         if(item.toLocaleLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';

         }
        });
       }