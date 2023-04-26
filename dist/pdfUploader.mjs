import axios from 'axios';
const FormData = require('form-data');
import * as fs from 'fs';
async function uploadPDF(pdfFilePath) {
    try {
        // Read the PDF file as binary data
        const pdfData = fs.readFileSync(pdfFilePath);
        // Create a FormData object and append the PDF data
        const formData = new FormData();
        formData.append('file', pdfData, 'uploaded_pdf.pdf');
        const ora = (await import('ora')).default;
        // Create a spinner instance and start it
        const spinner = ora('Uploading PDF...').start();
        // Send the PDF file to the Azure Function
        const response = await axios.post('https://gentlegiantschatbot.azurewebsites.net/api/pdfsummaryfunction', formData, {
            headers: formData.getHeaders(),
        });
        // Stop the spinner
        spinner.stop();
        // Handle the response from the Azure Function
        if (response.status === 200) {
            const responseData = response.data;
            console.log("responseData: ", JSON.stringify(responseData));
            // Use the response data (e.g., display the summary, notes, and essentials summary)
            console.log('Success: PDF processed successfully');
        }
        else {
            console.error('Error: Failed to process PDF');
        }
    }
    catch (error) {
        console.error('Error:', error.message);
    }
}
const pdfFilePath = process.argv[2];
if (pdfFilePath) {
    uploadPDF(pdfFilePath);
}
else {
    console.error('Error: Please provide a PDF file path');
}
//# sourceMappingURL=pdfUploader.js.map