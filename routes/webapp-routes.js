const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.render('web-app', { user: req.user });
});

module.exports = router;
