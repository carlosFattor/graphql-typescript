import * as Mongoose from 'mongoose'
export class DataBase {
	constructor() {
		process.on('SIGINT', () => {
			Mongoose.connection.close(() => {
				process.exit(0);
			});
		});
	}

	async connect(): Promise<boolean> {
		const URI = `mongodb://localhost:27017/graphql-typescript`;
		Mongoose.set('debug', true);
		try {
			await Mongoose.connect(URI, {
				useNewUrlParser: true
			});
			console.log('Database connection successfully');
			return true;
		} catch (error) {
			console.log(`database connection error => ${error.message}`);
			return false;
		}
	}
}