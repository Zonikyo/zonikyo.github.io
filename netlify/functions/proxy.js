const fetch = require('node-fetch');

exports.handler = async (event) => {
    try {
        const { pageURL } = JSON.parse(event.body);

        if (!pageURL) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: 'Invalid URL' }),
            };
        }

        const response = await fetch(pageURL);
        const htmlContent = await response.text();

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, htmlContent }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: 'Internal Server Error' }),
        };
    }
};