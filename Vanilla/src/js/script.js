import { showModal, setModal } from "./modal.js";
import { Calendar } from "./Calendar";
import { Todo } from "./Todo"


document.addEventListener("DOMContentLoaded", function () {

  const cal = new Calendar({
    year: "year",
    month: "month",
    week: "week",
    left: 'left',
    right: 'right'
  });
  const myTodo = new Todo(cal.yyyymmdd);

  setModal("textarea");
  document.getElementById("addItemBtn").onclick = function () {
    showModal('create')
        .then((resolve) => {
          if(resolve.type !== 'success') return;
          myTodo.addItem({contents:resolve.body, isDone:false, isImportant: false})
          myTodo.updateAllList('save', cal.yyyymmdd);
        })
  }
  cal.setDateChangeEvent = function(){
    myTodo.updateAllList('get', cal.yyyymmdd);
  }
  myTodo.setListChangedEvent = () =>{
    myTodo.updateAllList('save', cal.yyyymmdd);
  }
});
