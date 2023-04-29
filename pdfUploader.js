// Description: Uploads PDF files to the PDF summary endpoint (node script)
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

async function uploadPDFs(pdfFilePaths) {
  try {
    // Create a FormData object
    const formData = new FormData();

    console.log('pdfFilePaths: ', pdfFilePaths);

    // Append each PDF file to the FormData object (use the key 'pdfs')
    pdfFilePaths.forEach((pdfFilePath, index) => {
      const pdfData = fs.readFileSync(pdfFilePath);
      formData.append('pdfs', pdfData, `uploaded_pdf_${index}.pdf`);
    });

    const ora = (await import('ora')).default;

    // Create a spinner instance and start it
    const spinner = ora('Uploading PDFs...').start();

    // Send the PDF files to the endpoint
    const response = await axios.post(
      'http://127.0.0.1:8000/pdfsummary',
      formData,
      {
        headers: formData.getHeaders(),
      },
    );

    // Stop the spinner
    spinner.stop();

    // Handle the response from the endpoint
    if (response.status === 200) {
      const responseData = response.data;
      console.log('responseData: ', responseData);
      console.log('Success: PDFs processed successfully');
    } else {
      throw new Error('Error: Failed to process PDFs');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const pdfFilePaths = process.argv.slice(2);

if (pdfFilePaths.length > 0) {
  uploadPDFs(pdfFilePaths);
} else {
  console.error('Error: Please provide one or more PDF file paths');
}
