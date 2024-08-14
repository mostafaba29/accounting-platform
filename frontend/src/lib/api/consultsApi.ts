
import axios from "axios";

const consultUrl = 'http://localhost:8000/api/v1/consults';

export const fetchConsults = async () => {
    try {
        const response = await axios.get(consultUrl);
        return response.data.data.data;
    } catch (error) {
        throw new Error('failed to fetch consults', error);
    }
}