
# M4A to MP4 Converter

A Node.js-based backend application that converts M4A files to MP4 format using **FFmpeg**. This API allows users to upload an M4A file and receive the converted MP4 file as a response.

---

## Features

- Upload M4A files via an API endpoint.
- Convert M4A files to MP4 using **FFmpeg**.
- Stream the converted file back to the client for download.
- Automatically cleans up temporary files after conversion.

---

## Requirements

1. **Node.js** (version 14 or above)
2. **FFmpeg** (installed and available in the system PATH)
   - [Download FFmpeg](https://ffmpeg.org/download.html)
3. **npm** (comes with Node.js)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kashanshah/m4a-to-mp4-converter.git
   cd m4a-to-mp4-converter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure **FFmpeg** is installed on your system:
   - **Mac**: `brew install ffmpeg`
   - **Ubuntu**: `sudo apt install ffmpeg`
   - **Windows**: [Follow this guide](https://ffmpeg.org/download.html).

4. Run the server:
   ```bash
   node app.js
   ```

5. Access the server at `http://localhost:3000`.

---

## Usage

### API Endpoint

**POST** `/convert/mp4`

#### Request:
- Upload an M4A file using a `multipart/form-data` request.
- Use the `file` field to specify the file to upload.

#### Response:
- The server streams the converted MP4 file as a downloadable response.

### Example using Postman:
1. Open Postman and create a new **POST** request.
2. Enter `http://localhost:3000/convert/mp4` as the URL.
3. Under the **Body** tab, select **form-data** and add a key:
   - Key: `video`
   - Value: Upload your M4A file.
4. Click **Send** to receive the converted MP4 file.

---

## Author

**Kashan Shah**  
- **Websites**: [www.kashanshah.com](https://www.kashanshah.com)
- **Company**: [Teknoffice Technologies Inc.](https://www.teknoffice.com)

---

## Contributions

Contributions are welcome! Feel free to fork the repository and submit a pull request with your enhancements.

---

## Support

For any questions or support, please contact **Kashan Shah** at:  
- **Email**: [info@teknoffice.com](mailto:info@teknoffice.com)  
- **Websites**: [www.kashanshah.com](https://www.kashanshah.com), [www.teknoffice.com](https://www.teknoffice.com)

---
