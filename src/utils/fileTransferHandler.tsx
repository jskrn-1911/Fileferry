type FileType = File & { preview?: string };

export const handleTransfer = async (
    files: FileType[],
    emailTo: string,
    yourEmail: string,
    title: string,
    setStep: React.Dispatch<React.SetStateAction<'initial' | 'verify' |'uploading' | 'done'>>,
    setOverallProgress: React.Dispatch<React.SetStateAction<number>>,
    setUploadProgress: React.Dispatch<React.SetStateAction<Record<string, number>>>,
    setDownloadFileUrls: React.Dispatch<React.SetStateAction<string[]>>,
    setFiles: React.Dispatch<React.SetStateAction<FileType[]>>,
) => {
    if (files.length === 0) {
        alert('Please add files to upload.');
        return;
    }
    if (!emailTo || !yourEmail || !title) {
        console.log(emailTo, yourEmail, title)
        alert('Please fill in all required fields');
        return;
    }

    setStep('uploading');
    const totalFiles = files.length;
    const progressMap = Array(totalFiles).fill(0);

    try {
        const uploadPromises = files.map((file, index) =>
            new Promise<string>(async (resolve, reject) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'file_upload_preset');

                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.cloudinary.com/v1_1/dzwusi03f/upload');

                xhr.upload.onprogress = (event) => {
                    const progress = Math.round((event.loaded * 100) / (event.total || 1));

                    progressMap[index] = progress;

                    const overallProgress = Math.round(
                        progressMap.reduce((acc, curr) => acc + curr, 0) / totalFiles,
                    );

                    setOverallProgress(overallProgress);

                    setUploadProgress((prev) => ({
                        ...prev,
                        [file.name]: progress,
                    }));
                };

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        resolve(response.secure_url);
                    } else {
                        reject(xhr.statusText);
                    }
                };

                xhr.onerror = () => reject('Upload failed');
                xhr.send(formData);
            }),
        );

        const uploadedFiles: string[] = await Promise.all(uploadPromises);

        console.log('Uploaded Files:', uploadedFiles);
        setDownloadFileUrls(uploadedFiles);
        setStep('done');
        setUploadProgress({});
        setFiles([]);
        setOverallProgress(0);
    } catch (error) {
        console.error('Error uploading files:', error);
        alert('Failed to upload files. Please try again.');
        setStep('initial');
    }
};
