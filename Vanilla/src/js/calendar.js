import { getCalendarItem } from "./calender-item";

export class Calendar {
	constructor(ids) {
		this._curr = new Date();
		this._seletedDate = this._curr;
		this.domId = ids;
		this.dayWeekEng = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		this.monthNameEng = {
			1: "January",
			2: "February",
			3: "March",
			4: "April",
			5: "May",
			6: "June",
			7: "July",
			8: "August",
			9: "September",
			10: "October",
			11: "November",
			12: "December",
		};
		document.getElementById(this.domId.left).addEventListener('click', this.onClickGoPrevWeek.bind(this));
		document.getElementById(this.domId.right).addEventListener('click', this.onClickGoNextWeek.bind(this));
		document.getElementById(this.domId.week).addEventListener('click', this.onClickDates.bind(this))
		this._dateChangeEvent = null;
		this.updateCalendar();
	}
	set setDateChangeEvent(func){
		this._dateChangeEvent = func;
	}
	set selectedDate(date){
		this._seletedDate = new Date(date);
	}
	get selectedDate(){
		return new Date(this._seletedDate);
	}
	get curr(){
		return this._curr;
	}
	get year() {
		return this._seletedDate.getFullYear();
	}
	get month() {
		return this._seletedDate.getMonth() + 1;
	}
	get today() {
		return this._seletedDate.getDate();
	}
	get dayOfWeek() {
		return this._seletedDate.getDay();
	}
	get yyyymmdd() {
		return `${this.year}-${("0" + this.month).slice(-2)}-${(
			"0" + this.today
		).slice(-2)}`;
	}
	isToday(dateData) {
		return this._curr.toDateString() === dateData.toDateString();
	}
	getDayOfThisWeek(index){
		const time = this.selectedDate;
		const date = this.today - this.dayOfWeek + index;
		return new Date(time.setDate(date));
	}
	addSelectedClass(){
		const deleteClassLi = document.querySelector('.SELECTED');
		if(deleteClassLi) deleteClassLi.classList.remove('SELECTED')

		const selectLi = document.querySelector(`#${this.domId.week} #dates[date="${this.yyyymmdd}"]`);
		selectLi.classList.add("SELECTED")
	}
	updateCalendar(){
		const week_dom = document.getElementById(this.domId.week);
		week_dom.innerHTML = '';
		document.getElementById(this.domId.year).innerHTML = '';
		document.getElementById(this.domId.month).innerHTML = this.monthNameEng[this.month];

		this.getAllDatesElement().forEach((el) => {
			week_dom.insertAdjacentHTML("beforeend", el);
		});
	}
	getAllDatesElement() {
		return this.dayWeekEng.map((day, index) => {
			const tempDay = this.getDayOfThisWeek(index);
			const className = this.isToday(tempDay) ? "TODAY SELECTED" : "";
			return getCalendarItem(day, tempDay, className);
		});
	}
	onClickGoPrevWeek(e){
		this.selectedDate = this.getDayOfThisWeek(-1);
		this._dateChangeEvent();
		this.updateCalendar();
		this.addSelectedClass();
	}
	onClickGoNextWeek(){
		this.selectedDate = this.getDayOfThisWeek(+7);
		this._dateChangeEvent();
		this.updateCalendar();
		this.addSelectedClass();
	}
	onClickDates(e){
		let target = e.target.closest('#dates');
		if(!target) return false;

		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();

		this.selectedDate = target.getAttribute('date');
		this._dateChangeEvent();
		this.updateCalendar();
		this.addSelectedClass();
	}
}