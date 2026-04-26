import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://localhost:7116/api",
    timeout: 1000,
});

axiosInstance
    .get("/route")
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });
axiosInstance
    .post("/route")
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });