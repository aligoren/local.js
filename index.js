import Local from "./local";

const locals = {
	"tr": {
		"btn": {
			"welcome": {
				"text": "Merhaba hoşgeldin"
			},
			"other": "Diğeri"
		}
	},
	"en": {
		"btn": {
			"welcome": {
				"text": "Hi Welcome"
			},
			"other": "Other"
		}
	}
}

const local = new Local({
    locals: locals,
    //locals: 'http://localhost:3000/locals.json',
    lang: 'en',
    cacheable: true
});

local.run('en')

const tr = document.querySelector(".tr");

tr.addEventListener("click", () => {
    local.run('tr');
})