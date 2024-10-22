import axios from "axios";

const api = axios.create({
	baseURL: "https://frontend-take-home-service.fetch.com",
	headers: {
		"x-api-key": process.env.NEXT_PUBLIC_API_KEY,
	},
});

export default api;
