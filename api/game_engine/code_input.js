class Code {
    constructor(code) {
        this.code = code;
        this.max_length = 131071;
        this.valid = false; // Whitelisting
    }
    validate() {
        if (this.code.length > this.max_length) {
            this.valid = false;
            return;
        }

        this.valid = true;
    }
}