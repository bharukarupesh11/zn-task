# zn-task

#Steps to create the backend project:
	
	1. Create a black directory or folder
	2. Use “npm init --yes” command to create a package.json file inside the directory.
	3. Install all your dependencies using “npm install dependency_name” command.
	4. Create index.js file at the root of the project
	5. Create .env file which contains all the configuration details of the project. 
	6. Create other folder structures as per your requirement.



#Steps to run the backend project with MongoDB:

	1. Install the MongoDB Compass in your computer.
	2. Provide the database connection url in the .env file. 
	3. Create “products” directory at the root of the project. 
	4. Run “npm start” command to run the project.
	
	Note: The Schema and Documents will get created automatically in MongoDB Compass after you 
	run the project using above command. 


#Steps to run the backend project with MySql:

You can use "nodemon app.js" OR "node app.js" command to run the backend code.
	
	
	Note: You need to do following things in order to run the backend code successfully,
		1. Create a schema in mysql with “products_listing_app” name.
		2. Give your database username as “root” and password as “admin” because the same is mentioned in the index.js file in the model directory.
		3. You must create “uploads” and “products” folder in the project directory where our backend code resides.
