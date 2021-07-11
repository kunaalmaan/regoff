const mongoose = require('mongoose');
const Official = require('../models/official');

mongoose.connect('mongodb://localhost:27017/regoff', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async() => {
	await Official.deleteMany({});
	for(let i=0; i<6;i++){
		const c= new Official({ name: 'Kunal',
							  description: 'absvdgdhd',
							  phone: '7891928405',
							  email: 'k.shaurya'});
		await c.save();
	}
	
	
}

seedDB();