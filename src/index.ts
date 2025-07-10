import 'dotenv/config'

async function fetchMovies() {
    const apiKey = process.env.LOTR_API_KEY;
    const baseUrl = process.env.LOTR_API_BASE_URL;

    if (!apiKey || !baseUrl) {
        console.error("env vars 'LOTR_API_KEY' and 'LOTR_API_BASE_URL' not defined in .env file");
        process.exit(1); // indicate failure to CI
    }

    try {
        const response = await fetch(`${baseUrl}/movie`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            console.error(`HTTP Error! Status: ${response.status} Message: ${response.statusText}`);
            process.exit(1);
        }

        const data = await response.json();
        console.log(`Response data follows:  ${JSON.stringify(data,null, 2)}\r\n`);
    } catch (error) {
        console.error(`Error fetching movies: ${error}`);
        process.exit(1);
    }
}

fetchMovies()