const normal_sanitizer = (str) => {
    return str.replace(/[^a-zA-Z0-9 !@#$%^&*.]/g, '');
}

const email_verifier = (str) => {
    return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(str);
}

module.exports = {
    normal_sanitizer,
    email_verifier
}