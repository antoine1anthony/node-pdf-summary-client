# PDF Uploader README

This is a Node.js script that uploads one or more PDF files to the PDF summary endpoint. After successful upload, the endpoint processes the PDF files and returns the results. This script is a helpful utility to automate the process of uploading and summarizing PDF files.

## Prerequisites

Before using this script, ensure that you have the following software installed on your machine:

1\. Node.js (version 14 or higher)

## Installation

To use this script, follow these steps:

1\. Download or clone the repository containing the script.

2\. Open a terminal and navigate to the directory containing the script.

3\. Run `npm install` to install the required dependencies (axios, form-data, and ora).

## Usage

To run the script, use the following command:

```

node <script_filename> <pdf_file_path_1> <pdf_file_path_2> ...

```

Replace `<script_filename>` with the name of the script file (e.g., `pdf_uploader.js`), and provide the paths to the PDF files you want to upload as arguments. You can provide any number of PDF files as arguments, separated by spaces.

For example, if you have two PDF files named `file1.pdf` and `file2.pdf` in the same directory as the script, you can run the following command:

```

node pdf_uploader.js file1.pdf file2.pdf

```

## Output

The script displays a spinner while the PDF files are being uploaded. Once the upload and processing are complete, it prints the results to the console.

If the files are processed successfully, you'll see a "Success: PDFs processed successfully" message, along with the response data from the endpoint. If there's an error during the upload or processing, an appropriate error message will be displayed.

## Notes

This script assumes that the PDF summary endpoint is located at `http://127.0.0.1:8000/pdfsummary`. If the endpoint is hosted on a different address, you should update the URL in the `axios.post` function call.

This script only supports PDF files. If you try to upload a non-PDF file, the endpoint may return an error.

If you need to add additional headers, such as authentication tokens, you can modify the `headers` object in the `axios.post` function call.