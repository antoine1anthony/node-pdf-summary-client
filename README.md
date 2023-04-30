# PDF Uploader with Timing and Response Saving README

This is a Node.js script that uploads all PDF files in a specified directory to the PDF summary endpoint, measures the time taken for processing, and saves the response data as separate files for each field in the response. This script is a helpful utility to automate the process of uploading, summarizing, and saving the results of multiple PDF files from a directory.

## Prerequisites

Before using this script, ensure that you have the following software installed on your machine:

1\. Node.js (version 14 or higher)

## Installation

To use this script, follow these steps:

1\. Download or clone the repository containing the script.

2\. Open a terminal and navigate to the directory containing the script.

3\. Run `npm install` to install the required dependencies (axios, form-data, ora, and path).

## Usage

To run the script, use the following command:

```

node <script_filename>

```

Replace `<script_filename>` with the name of the script file (e.g., `pdf_uploader_with_timing.js`).

By default, the script looks for PDF files in a directory named `PDFs`. If you want to change the directory, modify the value of the `pdfDirectory` variable in the script.

For example, if you want to use a directory named `my_pdfs`, update the script as follows:

```javascript

// Directory containing the PDF files

const pdfDirectory = 'my_pdfs';

```

## Output

The script measures the total time taken by the script, as well as the time taken for processing each response. It displays a spinner while the PDF files are being uploaded.

Once the upload and processing are complete, the script saves the response data in a separate directory for each PDF file, located under a parent directory named `ResponseData`. The response data fields are saved as separate `.txt` files.

If the files are processed successfully, you'll see a "Success: PDF API processed successfully" message, along with the paths to the saved response data files. If there's an error during the upload or processing, an appropriate error message will be displayed.

If there are no PDF files in the specified directory, the script will display an "Error: No PDF files found in the specified directory" message.

## Notes

This script assumes that the PDF summary endpoint is located at `http://127.0.0.1:8000/pdfsummary`. If the endpoint is hosted on a different address, you should update the URL in the `axios.post` function call.

This script only supports PDF files. If the specified directory contains non-PDF files, they will be ignored.

If you need to add additional headers, such as authentication tokens, you can modify the `headers` object in the `axios.post` function call.

You can customize the response fields to save by modifying the `fields` array in the script. Currently, it saves the following fields: 'summary', 'notes', 'notes_summary', 'essential_info', and 'blog_post'.