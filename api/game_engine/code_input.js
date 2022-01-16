class Code {
    constructor(code) {
        this.code = code;
        this.max_length = 131071;
        this.valid = false; // Whitelisting validation
        this.whitelist = {}; // Whitelisting syntax
    }
    validate() {
        if (this.code.length > this.max_length) {
            this.valid = false;
            return;
        }

        this.valid = true;
    }
}
