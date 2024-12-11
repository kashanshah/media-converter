document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('convertForm');
    const fileInput = document.getElementById('file');
    const submitButton = document.getElementById('submitButton');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('uploadProgress');
    const uploadSpeed = document.getElementById('uploadSpeed');
    const processingMessage = document.getElementById('processingMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!fileInput.files.length) {
            alert('Please select a file to upload!');
            return;
        }

        submitButton.disabled = true;
        progressContainer.style.display = 'block';
        processingMessage.style.display = 'none';

        const file = fileInput.files[0];
        const format = document.getElementById('format').value;
        const formData = new FormData();
        formData.append(format === 'mp4' ? 'video' : 'audio', file);

        const startTime = Date.now();
        try {
            const response = await fetch(`/v1/convert/${format}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'x-api-key': 'free_user_key',
                },
                onUploadProgress: (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = Math.round((event.loaded / event.total) * 100);
                        progressBar.style.width = `${percentComplete}%`;
                        progressBar.textContent = `${percentComplete}%`;
                        const elapsedTime = (Date.now() - startTime) / 1000; // seconds
                        const uploadSpeedValue = (event.loaded / elapsedTime / 1024).toFixed(2); // KB/s
                        uploadSpeed.textContent = `Upload Speed: ${uploadSpeedValue} KB/s`;
                    }
                },
            });

            if (response.ok) {
                progressBar.style.width = '100%';
                progressBar.textContent = '100%';
                processingMessage.style.display = 'block';

                const blob = await response.blob();
                const downloadUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = file.name.split('.')[0] + '.' + format;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error}`);
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            submitButton.disabled = false;
            progressContainer.style.display = 'none';
            processingMessage.style.display = 'none';
        }
    });
});
