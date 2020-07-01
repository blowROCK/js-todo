import {showModal} from "./modal";
import {getTodoItem} from "./Todo-item";

const Storage = window.localStorage;


export class Todo {
	constructor(yyyymmdd) {
		this._todoList = this.getStorage(yyyymmdd);
		this._listChangedEvent = null;

		this.doUl = document.getElementById('doUl');
		this.doneUl = document.getElementById('doneUl');

		this.doUl.addEventListener('click', this.onClickTodoList.bind(this));
		this.doneUl.addEventListener('click', this.onClickTodoList.bind(this));
		this.updateAllList('get', yyyymmdd);
	}
	set setListChangedEvent(callback){
		this._listChangedEvent = callback;
	}
	set setList(list) {
		this._todoList = list;
	}
	get getList() {
		return this._todoList;
	}
	toggleDone(index){
		this._todoList[index].isDone = !this._todoList[index].isDone;
	}
	toggleImportant(index){
		this._todoList[index].isImportant = !this._todoList[index].isImportant;
	}
	addItem({contents, isDone, isImportant}) {
		this._todoList.push({contents, isDone, isImportant});
	}
	modifyItem(index, {contents}){
		this._todoList[index].contents = contents;
	}
	deleteItem(index){
		this._todoList.splice(index, 1)
	}
	saveStorage(yyyymmdd) {
		Storage.setItem("Todo.list-"+yyyymmdd, JSON.stringify(this._todoList));
	}
	getStorage(yyyymmdd) {
		const storageList = Storage.getItem("Todo.list-"+yyyymmdd);
		if(storageList === null) return [];
		return JSON.parse(storageList);
	}
	updateAllList(type, yyyymmdd) {
		if(type === 'get') this.setList = this.getStorage(yyyymmdd);

		this.doneUl.innerHTML = '';
		this.doUl.innerHTML = '';

		this._todoList.forEach((el, index)=>{
			const liTag = htmlToElements(getTodoItem(el, index));
			if(el.isDone){
				this.doneUl.appendChild(liTag);
			}else if(el.isImportant){
				this.doUl.insertBefore(liTag, this.doUl.childNodes[0]);
			}else{
				this.doUl.appendChild(liTag);
			}
		})
		if(type === 'save') this.saveStorage(yyyymmdd);
	}
	onClickTodoList(e){
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
		const action = e.target.dataset.action;
		const li = e.target.closest('#todoItem');
		const order = li.dataset.order;
		this[action](order);
	}
	onToggleDone(order){
		this.toggleDone(order);
		this._listChangedEvent();
	}
	onToggleImportant(order){
		this.toggleImportant(order);
		this._listChangedEvent();
	}
	onTodoItemModify(order){
		showModal('modify', this._todoList[order].contents)
			.then((resolve)=>{
				if(resolve.type === 'success'){
					this.modifyItem(order,{contents:resolve.body})
				}else if(resolve.type === 'delete'){
					this.deleteItem(order);
				}
				this._listChangedEvent();
			})
			.catch((err)=>{});
		return false;
	}
}

// 유틸
function htmlToElements(htmlString) {
	const div = document.createElement('div');
	div.innerHTML = htmlString.trim();
	return div.firstChild;
}