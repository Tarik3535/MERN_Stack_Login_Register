const app = require("express")();
const mongo = require('mongodb').MongoClient;

const handlebars = require("express-handlebars");
const handlebarshelpers = require("handlebars-helpers")();
const path = require("path");

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));


app.engine("handlebars", handlebars({
    defaultLayout: "main",
    layoutsDir: `${__dirname}/views/layouts/`,
    helpers: handlebarshelpers
}));

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "handlebars");


const MongoURL = "mongodb+srv://quntu_admin:quntu_admin@cluster0.cxq9d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = 8080

mongo.connect(MongoURL, { useNewUrlParser: true, useUnifiedTopology: true
 },(err,client) => {	
	//Connect Control Database
	if(err) console.log("❌ 💾 Database Error : " + err);
	console.log('💾 MongoDB Connection is Successful')
	
	/*
	//Create Collection
	const db = client.db('kisi');
	db.createCollection('kisiler', (err,result) => {
		if(err) console.log("❌ 💾 Error: " + err);
		
		console.log('Create Collection is Successful');
		
	});
	
	//Data Add
	let data = { name: 'tarik', lastName: 'ulker'};
	db.collection('kisiler').insertOne(data, (err,result) => {
		if(err) console.log("❌ 💾 Error: " + err);
		console.log('✅ User added');		
	})
	
	//Multiple Data Add
	
	let datas = [
			{name: 'Tarik', lastName: 'Ulker'},
			{name: 'Nazmiye', lastName: 'Ulker'},
			{name: 'Fadime', lastName: 'Ulker'},
			{name: 'Hakan', lastName: 'Ulker'},
	]
	
	db.collection('Family').insertMany(datas, (err,result) => {
		if(err) console.log("❌ 💾 Error: " + err);
		console.log(`${ result.insertedCount } data saved`);
	})
	
	//Search Data
	
	const db = client.db('kisi');
	let searched = {name: 'Mustafa' , lastName: 'Ulker'};	
	db.collection('Family').findOne(searched, (err, result) => {
    if (err) throw err;
		
		if(result == null) {
			console.log(`${ searched.name } ${ searched.lastName } Adında Aile üyesi bulunamamıştır xD`);
		}
		
    console.log(result); //False ise null döndürür.
  });
	*/
	
		app.post("/signup", (req,res) => {
			
			//console.log(req.body.username);
			//console.log(req.body.password);
			//console.log(req.body)
			
			const { username, password} = req.body;
			
			const db = client.db('MERN_STACK');
			
			let usernameControl = {username: req.body.username};
			
			db.collection('users').findOne(usernameControl, (err, result) => {
				if (err) throw err;
				
				res.json(result);
				
				console.log("result: " + result);
				
				
				if(result == null){
					
					
					let userData = { username: req.body.username, password: req.body.password};
			
					db.collection('users').insertOne(userData, (err,result) => {
						if(err) console.log("❌ 💾 Database Error : " + err);
						//console.log("User successfully registered");
						res.render("index", { username })
					})
					
					
					console.log("save user")
				}else{
					console.log("Bu kullanıcı adı zaten kullanılmakta.")
				}
				
			});
			
			
		})
	
		app.post("/login", (req,res) => {
			
			console.log(req.body)
			
			const { username, password} = req.body;
			
			const db = client.db('MERN_STACK');
			
			let userControl = {username: req.body.username, password: req.body.password};
			
			db.collection('users').findOne(userControl, (err, result) => {
				if (err) throw err;
				
				res.json(result);
				
				console.log("result: " + result);
				
				
				if(result == null){
					console.log("undefined user")
				}else{
					console.log("logined user")
				}
				
			});
			
			
		})
	
		
	
		
	
		
})


app.get('/', (req,res) => {
	res.render('index');
})

app.get("/express", (req,res) => {
	res.send("✅ Express is Running!");
})

app.listen(PORT, () => {
	console.log(`Server is Started on PORT: ${ PORT }`)
})