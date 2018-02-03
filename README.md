# local.js

Localization script for web sites which has the multiple languages.

# Usage

**HTML Element**

Html element must have **data-local** element. The values of all attributes must be defined as follows:

```html
<button data-local="btn.welcome.text"></button>

<button data-local="btn.other"></button>
```

These values will be defined in the json language object.

**import local.js file**

After that import local.js file like below

```javascript
import Local from "./local";
```

**Init local.js**

Parameters:

    locals: JSON object. That must be declared.
    lang: Default language prefix that you declared in your JSON language Object | optional
    cacheable: Boolean variable. When you work remote file you can use this feature

```javascript
const local = new Local({
    locals: locals,
    lang: 'en',
    cacheable: false
});
```

## With Static Json Variable

**JSON structure**

You can declare nested json structure

```javascript
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
```

**Run local.js**

You must set default language prefix if you did not set with constructor.

```javascript
local.run('en')
```

That all!

## With Remote Json File

Your json language file must be same as above json structure.

**JSON Structure**

```json
{
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
```

When local.js run first time language object will store in localStorage. If you set cacheable property to true, your script will not send http requests again. It will use localStorage instead of http request.

```javascript
const local = new Local({
    locals: 'http://localhost:3000/locals.json'
    cacheable: true
});

local.run('tr');
```

## Another Example

If you want to change language dynamic you can use like this:

```javascript
const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
    local.run('tr');
})
```