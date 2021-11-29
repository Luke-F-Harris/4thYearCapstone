const codes = require('../database/models/codes');
const db = require('../database/connect');
const { normal_sanitizer, email_verifier } = require('../services/sanitize');
const userAuth = require('../services/auth').userAuth;
const { logger } = require('../services/logging');
require('../services/logging').logger

module.exports = function (app) {
    app.post('/api/codes/create', (req, res) => {
        let creator = req.body.creator;
        let code = req.body.code;
        let ranking = req.body.ranking;

        if (!code || !creator || !ranking) {

            res.status(400).json({
                message: 'Bad Request'
            });
            logger.warning('Bad Request, missing fields');
        } else {
            codes.query(codes.insert_code(creator, code, ranking), (err, result) => {
                if (err) {
                    logger.error(err);
                    res.status(500)
                    res.json({
                        message: 'Internal Server Error'
                    });
                } else {
                    // logger.log("Success");
                    res.status(200)
                    res.json({
                        message: 'Success'
                    });
                }
            });
        }
    });
}