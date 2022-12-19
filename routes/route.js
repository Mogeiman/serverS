// const verifyJWT = require('../middleware/authenticate.js');
module.exports = (app, router) => {
	const userController = require('../controllers/adminControls.js');
	router.use((req,res,next) => {
		console.log("/" + req.method);
		next();
	});

	// Routes for Users

			//Adding Users
			app.post('/createAdmin', userController.addadmin);
			//Posting Login Info to Server
			app.post('/login', userController.login);
			//Starting a Session if Login info is Correct
			// app.get('/login', userController.loginSession);
			//Verifying the User if their token is the same as the token created upon sign in
			// app.get('/verifyUser',userController.authentication);
			//Logging out the user by ending all sessions
			app.get('/logOut', userController.logOut)


			


	// Defining the major path for all the routes *Not sure
	app.use('*', (req,res) => {
		res.sendFile(path.join(__dirname, '/client/build/', 'index.html'));
	});
}