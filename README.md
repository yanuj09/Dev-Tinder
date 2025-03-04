-Create a repository
-Initialize the repository
-node_modules, package.json, package-lock.json
-Install express
-Create a server
-Listen to port 7777
-Write request handlers for /test , /hello
-Install nodemon and update scripts inside package.json
-What are dependencies
-What is the use of "-g" while npm install
-Difference between caret and tilde ( ^ vs ~ )

-initialize git
-.gitignore
-Create a remote repo on github
-Push all code to remote origin
-Play with routes and route extensions ex. /hello, / , hello/2, /xyz
-Order of the routes matter a lot
-Install Postman app and make a workspace/collectio > test API call
-Write logic to handle GET, POST, PATCH, DELETE API Calls and test them on Postman
-Explore routing and use of ?, + , (), * in the routes
-Explore routing and use of ?, + , (), * in the routes
-Use of regex in routes /a/ , /.*fly$/
-Reading the query params in the routes
-Reading the dynamic routes
-Multiple Route Handlers - Play with the code
-next()
-next function and erros along with res.send();
-What is a middleware? why do we need it?
-How express JS basically handles request behind the scenes.
-difference between app.use and app.all
-write a dummy auth middleware for a admin
-write a dummy auth middleware for all user routh except /user/login
- Error handling useing wild card


-create a free cluster on MONGODB officail website(mongo Atlas)
-Install mongoose library
-Connect your application to the Database "connection url"/devtinder
- call the connectDD function and connect to the db before listenging to port 4000
-Create a user Schema & usermodel
- create Post /signup api to add data to database
- Push some documents using APIs call , make api call from post 
- Error handling using try catch

- difference between js object and json
- add the express.json middleware
- make your signup API dynamic to receive data from end user.
- user.findOne with duplicate email id which one it will give 
- API - Get user by email
API -Feed API - GET/ feed - get all the user from the database
- create delete user API
- difference between put and patch api
- create update a user
- Explore the Mongoose Documention for model
- what are options in a Model.findOneAndUpdate method, explore more about it
- Update the user api with email id

- Explore schema type options from the documention
- add require, unique , lowercase, minLength, maxLenght, trim, min, max
- add default value,
- create a custom vaidate function for gender
- improve the db DB schema - put all appropriate in each feild validation 
- add time stamp to the user schema
- API level validation on patch reques and signup post api
- add API validation for each field
- Install validator
- Explore the validator library and use validator function for password , email, and photoUrl
- never trust request.body

- Validate data in signup Api
- Install bcrypt package
- Create PasswordHash using bcrypt.hash and save the encrpted password
-Create login API
- Compare passwords and throw erros if email or password is invalid

- install cookie-parser
- just send a dummy cookie to user
- create a get profile API and check get a cookie back and read the cookie
- install jsonwebtoken
- IN login API , after email and password validation create a JWT token
- read the cookies inside your profile and find out login user
-userAuth Middleware
-Add the userAuth middle in profile api, sendConnection request
- set the expiry of jwt token and cookies to 7day
- set the expiry of the cookie
- create userSchema method to getJWT
- create userschema method to get compare the passwordINputByUser

-Explore tinder APIs
-Explore Data insides it
- Groups multiple routes into their respective routes
- Read documentation for express.Router 
- Create routes folder for managing auth, profile , request Routers
- Create authRouther, profileRouther, requestRouter
- Import these router in app.js
- Create POST/logout API
- Create PATCH/profile/edit
- Create PATCH/profile/password Api => forget password
- Make you validate all data in every POST PATCH request

- Create connection request schema 
- Send connection request API
- Proper validation of Data
- Think about all corner cases and handle that
- $or query and $and query
- Schema.pre("sava") function 
- Read more about indexes in mongodb
- Why do we need index in DB?
- What is an advantage and disadvantages of creating index.
- Read this articles about compound index on mongodb  documention  https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- ALWAYS THINKS AVOUT CORNER CASES

- write code with proper validation for this APIs -POST/request/review/:status/:userId
- Though process POST vs GET
- Read about ref and populate 
- Create GET/user/requests/received
- Create GET/user/connections


- Logic for GET/feed API
- Explore the $nin, $and , $ne and others methods