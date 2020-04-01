const userCtrl = require('../controllers/user.controller');

module.exports = app => {
    app.post('/api/users/register',userCtrl.register);
    app.post('/api/users/login',userCtrl.login);
    app.delete('/api/users/logout',userCtrl.logout);
    
}