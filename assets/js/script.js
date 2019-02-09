const cities = [
	{
		text: "Bratislava",
		time: "21:50",
		limit: "5"
	},
	{
		text: "Kosice",
		time: "18:20",
		limit: 10
	},
	{
		text: "Trnava",
		time: "21:00",
		limit: "12"
	},
	{
		text: "Trencin",
		time: "16:25",
		limit: 30
	},
	{
		text: "Martin",
		time: "16:25",
		limit: null
	},
	{
		text: "Kysuce",
		time: null,
		limit: 100
	}
];

function isValidTimeFormat(time, format = 'HH:MM'){
	if (!time) return false;
	let valid;
	switch(format) {
		case 'HH:MM':
			valid = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/g.test(time);
			break;
		default:
			valid = false;
	}
	return valid;
}

function isValidCity(city) {
	if (!city.text) return false;
	if (!city.time || !isValidTimeFormat(city.time)) return false;
	if (!city.limit || isNaN(city.limit)) return false;

	return true;
}

function prepareCityHtml(city) {
	return `<a href="#" onClick="timeDiff(this, event)" class="button" data-time="${city.time}" data-limit="${city.limit}">
				${city.text}
			</a>`;
}

function timeDiff(el, event) {
	event.preventDefault();

	if (!el) return;
	if (!isValidTimeFormat(el.dataset.time)) return;

	let time = el.dataset.time.split(':'),
		limit = el.dataset.limit,
		actual_time = new Date().getTime(),
		elem_time = new Date();

	elem_time.setHours(time[0]);
	elem_time.setMinutes(time[1]);
	elem_time = elem_time.getTime();

	let diff = Math.abs((actual_time - elem_time)/3600000);

	if ( diff < limit ) {
		el.classList.toggle('success');
	} else {
		el.classList.toggle('danger');
	}
}

function render(data, el) {
	if (!el) return;
	let html = '';

	data.map(function(i) {
		if (isValidCity(i)) {
			html += prepareCityHtml(i);
		}
	});

	el.innerHTML = html;
};

render(cities, document.querySelector('#main .inner-grid'));