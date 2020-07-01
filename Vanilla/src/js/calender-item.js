export const getCalendarItem = function (day, tempDay, className) {
	return `<li id="dates" class="${className}" date="${tempDay.toISOString().slice(0, 10)}">
                <div>${day}</div>
                <div>${tempDay.getDate()}</div>
              </li>`;
}