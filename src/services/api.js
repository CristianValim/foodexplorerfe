import axios from "axios";

export const api = axios.create({
	//Prod
	baseURL: "https://foodexplorer-api-a607.onrender.com",

	//Dev
    //baseURL: "http://localhost:3000",
});