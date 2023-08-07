import mongoose, { ConnectionOptions } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);

	const dbConnection: string | undefined = process.env.DB_CONNECTION;
	const dbHost: string | undefined = process.env.DB_HOST;
	const dbPort: string | undefined = process.env.DB_PORT;
	const dbName: string | undefined = process.env.DB_DATABASE;
	const dbUserName: string | undefined = encodeURIComponent(
		process.env.DB_USERNAME || ""
	);
	const dbPwd: string | undefined = encodeURIComponent(
		process.env.DB_PASSWORD || ""
	);

	const MONGODB_URL = `${dbConnection}://${dbHost}:${dbPort}/${dbName}`;

	if (!MONGODB_URL) return console.log("Missing MongoDB URL");

	if (isConnected) {
		console.log("MongoDB connection already established");
		return;
	}

	try {
		const mongooseOptions: ConnectionOptions = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		};

		await mongoose.connect(MONGODB_URL, mongooseOptions);

		isConnected = true;
		console.log("MongoDB connected");
	} catch (error) {
		console.log(error);
	}
};
