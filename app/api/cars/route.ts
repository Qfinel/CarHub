import { CarState } from "@/types";

export const POST = async (req: Request): Promise<Response> => {

    const filters = await req.json()

    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${filters.manufacturer}&year=${filters.year}&model=${filters.model}&limit=${filters.limit}&fuel_type=${filters.fuel}`;

    const API_KEY = process.env.RAPID_API_KEY || ""
    const API_HOST = process.env.RAPID_API_HOST || ""

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST,
        }
    };

    try {
        const response = await fetch(url, options)
        const result = await response.json()

        return new Response(JSON.stringify(result), {status: 200})
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch the cars", {status: 500})
    }
}