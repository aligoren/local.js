class Local {
    constructor(data) {
        this.locals = data.locals;
        this.lang = data.lang;
        this.cacheable = data.cacheable;
        this.type = '';
        this.cached = JSON.parse(localStorage.getItem('resp'));

        switch (typeof(this.locals)) {
            case 'object':
                this.type = 'object' 
                break;
            case 'string':
                this.type = 'string'
                break;
            default:
                break;
        }
        
    }

    request(locals, callback) {
        let req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open('GET', locals, true);
        req.addEventListener('load', () => {
            callback(req.response);
        })
        req.send(null);
    }

    extract(propertyName, object) {
        const parts = propertyName.split(".");
        let length = parts.length;
        let i;
        let property = object || this;

        for (i = 0; i < length; i++) {
            property = property[parts[i]];
        }

        return property;
    }

    work(locals) {
        let allDom = document.querySelectorAll('*[data-local]');
        
        if(this.cached == undefined && this.type == 'string') {
            localStorage.setItem('resp', JSON.stringify(locals));
        }
        
        allDom.forEach((k, v) => {
            let localKey = k.dataset.local.split('.');
            let translated = this.extract(k.dataset.local, locals[this.lang])
            k.innerText = translated;
        })
    }

    run(lang) {
        if(lang) {
            this.lang = lang;
        }

        if(this.type == 'object') {
            this.work(this.locals);
        } else if(this.type == 'string') {
            if(this.cached && this.cacheable) {
                this.work(this.cached);
            } else {
                this.request(this.locals, (resp) => {
                    this.work(resp);
                });
            }
        }
    }
}

module.exports = Local;