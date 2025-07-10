import 'dotenv/config'

export async function fetchMovies(options?: { filter?: string }) {
    const apiKey = process.env.LOTR_API_KEY;
    const baseUrl = process.env.LOTR_API_BASE_URL;

    if (!apiKey || !baseUrl) {
        throw new Error("env vars 'LOTR_API_KEY' and 'LOTR_API_BASE_URL' not defined in .env file");
    }

    let url = `${baseUrl}/movie`;
    if (options?.filter) {
        url += `?${options.filter}`;
    }

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status} Message: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching movies: ${error}`);
    }
}