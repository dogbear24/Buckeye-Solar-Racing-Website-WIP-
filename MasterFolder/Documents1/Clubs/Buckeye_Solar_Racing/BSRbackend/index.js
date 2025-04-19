// Imports express framework and CORS middleware
const express = require('express'); // Simplifies process of building web servers
const cors = require('cors');   // Allows server to handle requests from different origins

const { google } = require('googleapis'); // Imports googleapis library for interacting with Google APIs

const app = express();  // Creates instance of express application
app.use(cors());    // Enables Cors for all routes
app.use(express.json());    // Middleware parses incoming JSON requests

// Path to service account key file
const SERVICE_ACCOUNT_FILE = "C:\\Users\\jason\\OneDrive\\Documents1\\GitHub\\Website\\MasterFolder\\Documents1\\Clubs\\Buckeye_Solar_Racing\\BSRbackend\\project2-444805-205f402e520a.json";

// ID of the Google Spreadsheet
const SPREADSHEET_ID = "1DuknXGtTtH_TPSaFHdxghTKHmpLe6Kd-mbVPsNbzoDM"; // ID of the spreadsheet to read from

// Authenticates with Google API using service account credentials and constructs the service
const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
}); // Scopes define the level of access the application has to the Google API

const sheets = google.sheets({ version: 'v4', auth }); // Creates an instance of the Sheets API client

async function readSheet(range) {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: range,
        }); // Reads data from the specified range in the spreadsheet
        console.log(`Data fetched from Google Sheets (${range}):`, response.data.values); // Add this line
        return response.data.values; // Returns the values from the specified range in the spreadsheet
    } catch (error) {
        console.error('Error reading data from Google Sheets:', error.response ? error.response.data : error.message); // Add detailed error logging
        throw error;
    }
}

let cachedData = null;
let currentRow = 1;

async function updateData() {
    try {
        const range = `Sheet1!A${currentRow}:B${currentRow + 1}`;
        cachedData = await readSheet(range);
        console.log('Data updated:', cachedData);
        // Update the row for the next fetch
        currentRow += 2;
    } catch (error) {
        console.error('Error updating data:', error);
    }
}

// Update data every 10 seconds
setInterval(updateData, 1000);

// Initial data fetch
updateData();

app.get('/', (req, res) => {
    res.send('Hello from the backend');
}); // Defines basic route, responds with message

app.get('/api/data', (req, res) => { // Defines route for fetching data from Google Sheets
    if (cachedData) {
        res.json({ data: cachedData }); // Sends the cached data as a JSON response
    } else {
        res.status(500).send('Data not available');
    }
}); // Defines route for fetching data from Google Sheets

const port = process.env.PORT || 5000; // Sets port for server to listen on, Checks for port specified in environment variables first, otherwise defaults to port 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); // Starts server and listens for incoming requests on specified port. Callback function logs message