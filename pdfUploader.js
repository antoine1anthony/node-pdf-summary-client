// Description: Uploads a single PDF file to the PDF summary endpoint (node script)
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import ora from 'ora';

async function uploadPDF(pdfFilePath) {
  try {
    // Create a FormData object
    const formData = new FormData();

    // Append the PDF file to the FormData object (use the key 'pdfs')
    const pdfData = fs.readFileSync(pdfFilePath);
    formData.append('pdfs', pdfData, path.basename(pdfFilePath));

    // Create a spinner instance
    const spinner = ora('Uploading PDF...').start(); // Start the spinner with a message

    // Start the response timer
    console.time('Response Time');

    // Send the PDF file to the endpoint
    const response = await axios.post(
      'http://127.0.0.1:8000/pdfsummary',
      formData,
      {
        headers: formData.getHeaders(),
      },
    );

    // Stop the response timer
    console.timeEnd('Response Time');

    // Stop the spinner
    spinner.stop();

    // Handle the response from the endpoint
    if (response.status === 200) {
      const responseData = response.data;
      console.log('Success: PDF API processed successfully');

      // Create a directory with the name of the PDF file to save the response data
      const responseDirectory = path.join(
        'ResponseData',
        path.basename(pdfFilePath, '.pdf'),
      );
      fs.mkdirSync(responseDirectory, { recursive: true });
      console.log('responseDirectory: ', responseDirectory);

      // Save each field of the response data as a separate file in the created directory
      const fields = [
        'summary',
        'notes',
        'notes_summary',
        'essential_info',
        'blog_post',
      ];
      fields.forEach((field) => {
        if (responseData[field]) {
          const filePath = path.join(responseDirectory, `${field}.txt`);
          console.log('filePath: ', filePath);
          fs.writeFileSync(filePath, responseData[field]);
          console.log(`Success: PDF ${field}.txt file processed successfully`);
        }
      });
    } else {
      throw new Error('Error: Failed to process PDF');
    }
  } catch (error) {
    // Stop the spinner if there is an error
    spinner.stop();
    console.error('Error:', error);
  }
}

// Start the script timer
console.time('Script Time');

// Directory containing the PDF files
const pdfDirectory = 'PDFs';

// Read the contents of the PDFs directory
const files = fs.readdirSync(pdfDirectory);

// Filter the files to include only PDF files
const pdfFilePaths = files
  .filter((file) => path.extname(file).toLowerCase() === '.pdf')
  .map((file) => path.join(pdfDirectory, file));

if (pdfFilePaths.length > 0) {
  // Iterate over each PDF file path and call the uploadPDF function for each file
  Promise.all(pdfFilePaths.map(uploadPDF))
    .then(() => {
      // Stop the script timer after all PDFs have been processed
      console.timeEnd('Script Time');
    })
    .catch((error) => {
      console.error('Error:', error);
      // Stop the script timer in case of error
      console.timeEnd('Script Time');
    });
} else {
  console.error('Error: No PDF files found in the specified directory');
  // Stop the script timer if no PDF files are found
  console.timeEnd('Script Time');
}
