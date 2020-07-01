export const getTodoItem = function (el, index) {
	return `<li id="todoItem" class="${(el.isDone)?'done':'do'}" data-order="${index}">
				<span data-action="onToggleDone" class="fa ${(el.isDone?'fa-check-circle-o':'fa-circle-o')}"></span>
				<span data-action="onToggleImportant" class="fa ${(el.isImportant?'fa-star':'fa-star-o')}"></span>
				<div data-action="onTodoItemModify" >${el.contents}</div>
			</li>`;
}