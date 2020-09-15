const addTaskInput = document.querySelector('.add-task__input'),
   addTaskButton = document.querySelector('.add-task__button'),
   todolist = document.querySelector('.todolist'),
   searchButtonDiv = document.querySelector('.search__buttons'),
   searchButtons = document.querySelectorAll('.button__search'),
   countDiv = document.querySelector('.count-block');

let arrTodolist = [];
let arrTodolistDone = [];
let arrTodolistImportant = [];

if (localStorage.getItem('todo')) {
   arrTodolist = JSON.parse(localStorage.getItem('todo'));
   arrTodolistDone = JSON.parse(localStorage.getItem('todoCheck'))
   arrTodolistImportant = JSON.parse(localStorage.getItem('todoImportant'));
   printCount();
   printAllTasks();
}

addTaskButton.addEventListener('click', (e) => {
   if (addTaskInput.value.trim() == 0) {
      alert('Ведите задание')
   } else {
      task = {
         title: addTaskInput.value,
         check: false,
         important: false,
      }
      arrTodolist.push(task);
      printAllTasks();
      e.preventDefault();
   }

});

function printAllTasks() {
   todolist.innerHTML = '';
   arrTodolist.forEach((task, index) => {
      todolist.innerHTML += `
      <li id=${index} ${task.important ? 'important' : ''}>
         <h3 class="title" ${task.check ? 'check' : ''}>${task.title}</h3>
         <div>
            <button class="del">Удалить</button>
            <button class="mark">Отметить</button>
         </div>
      </li>
      
      `;
   });
   addTaskInput.value = '';
   localStorage.setItem('todo', JSON.stringify(arrTodolist));
};

todolist.addEventListener('click', (e) => {
   e.preventDefault();
   arrTodolist.forEach((task, index) => {
      if (e.target.textContent === 'Удалить' && Number(e.target.parentElement.parentElement.id) === index) {
         e.target.parentElement.parentElement.remove();
         arrTodolist.splice(index, 1);
      };
      if (e.target.textContent === 'Отметить' && Number(e.target.parentElement.parentElement.id) === index) {
         task.important = !task.important;
         arrTodolistImportant = arrTodolist.filter(task => task.important === true);
         localStorage.setItem('todoImportant', JSON.stringify(arrTodolistImportant));
      };
      if (e.target.textContent === task.title && Number(e.target.parentElement.id) === index) {
         task.check = !task.check;
         arrTodolistDone = arrTodolist.filter(task => task.check === true);
         localStorage.setItem('todoCheck', JSON.stringify(arrTodolistDone));
      };
      printCount();
      printAllTasks();
   })
})

searchButtons.forEach((btn) => {
   btn.addEventListener('click', () => {
      searchButtons.forEach((btn) => {
         btn.removeAttribute('activeBtn');
      })
      btn.setAttribute('activeBtn', '');
   })
})

// searchButtonDiv.addEventListener('click', (e) => {
//    switch (e.target.textContent) {
//       case 'All':

//          break;
//       case 'Done':
//          let arrTodolistDone = arrTodolist.filter(task => task.check === true)
//          console.log(arrTodolistDone);
//          break;
//       case 'Active':
//          let arrTodolistActive = arrTodolist.filter(task => task.check === false)
//          console.log(arrTodolistActive);
//          break;

//       default:
//          break;
//    }
// })

function printCount() {
   countDiv.innerHTML = `
   <div>Готово - ${arrTodolistDone.length}</div>   
   <div>Важных - ${arrTodolistImportant.length}</div>
   `;
};
printCount();