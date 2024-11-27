
import Link from 'next/link';
import React, { useCallback, useState } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdCloudDone } from 'react-icons/io';
import { LuPlus } from 'react-icons/lu';

type FileType = File & { preview?: string };

interface UploadProgress {
    [key: string]: number;
}

const FileUploader: React.FC = () => {
    const [files, setFiles] = useState<FileType[]>([]);
    const [emailTo, setEmailTo] = useState<string>('');
    const [yourEmail, setYourEmail] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({})
    const [step, setStep] = useState<'initial' | 'uploading' | 'done'>('initial');

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        setIsDragging(false)
    }, [])

    const onDragEnter = () => setIsDragging(true)
    const onDragLeave = () => setIsDragging(false)

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true,
        onDragEnter,
        onDragLeave,
    })

    // const handleTransfer = async () => {
    //    setStep('uploading')
    //    setTimeout(() => {
    //      setStep('done')
    //    },2000)
    // }

    const handleTransfer = async () => {
        setStep("uploading");
    
        // Simulate file upload progress
        const files = ["file1", "file2", "file3"]; // Example file keys
        files.forEach((file, index) => {
          setTimeout(() => {
            setUploadProgress((prevProgress) => ({
              ...prevProgress,
              [file]: (index + 1) * 33, // Simulate progressive updates
            }));
          }, index * 1000); // Update every second
        });
    
        setTimeout(() => {
          setStep("done");
          setUploadProgress({});
        }, files.length * 1000 + 1000); // Wait until all updates are simulated
      };

    const removeFile = (fileName: string) => {
        setFiles((files) => files.filter((file) => file.name !== fileName))
    }

    const sendAnother = () => {
        setStep('initial')
        setEmailTo('')
        setFiles([])
        setTitle('')
        setMessage('')
    }

    return (
        <div className='px-14 py-14  h-full w-full text-slate-950'>
            {step === 'initial' && (
                <div
                    className={`w-full max-w-sm p-5 bg-white shadow-lg rounded-md ${isDragging ? 'border-2 border-dashed border-gray-600 ' : 'cursor-pointer'
                        }`}
                    {...getRootProps()}
                >
                    <input {...getInputProps()} />
                    {isDragging && (
                        <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-10 text-gray-700">
                            <LuPlus className="text-3xl" />
                            <p className="text-lg">Drop files here</p>
                        </div>
                    )}
                    <div className={`${isDragging ? 'blur-sm' : ''}`}>
                        <div className="flex items-center gap-4 mb-4 cursor-pointer" onClick={open}>
                            <button className="w-8 h-8 flex items-center justify-center bg-gray-700 text-white rounded-full">
                                <LuPlus />
                            </button>
                            <div>
                                <span className="font-semibold">{files.length > 0 ? 'Add more files' : 'Add files'}</span>
                                <span className="block text-sm text-gray-500 underline">Or select a folder</span>
                            </div>
                        </div>
                        <div className="max-h-40 overflow-y-auto mb-4">
                            {files.map((file) => (
                                <div key={file.name} className="flex items-center justify-between p-2 border-b border-gray-200">
                                    <p className="truncate text-sm w-4/5">{file.name}</p>
                                    <AiOutlineClose
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => removeFile(file.name)}
                                    />
                                    {uploadProgress[file.name] && (
                                        <ProgressBar
                                            now={uploadProgress[file.name]}
                                            label={`${uploadProgress[file.name]}%`}
                                            className="w-full bg-gray-300 text-xs text-gray-700"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="space-y-3">
                            <input
                                type="email"
                                placeholder="Your email"
                                value={yourEmail}
                                onChange={(e) => setYourEmail(e.target.value)}
                                className="w-full p-2 border-b border-gray-400 focus:outline-none"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email to"
                                value={emailTo}
                                onChange={(e) => setEmailTo(e.target.value)}
                                className="w-full p-2 border-b border-gray-400 focus:outline-none"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Project name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border-b border-gray-400 focus:outline-none"
                                required
                            />
                            <textarea
                                placeholder="Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-2 border border-gray-400 rounded focus:outline-none"
                            />
                        </div>
                        <button
                            className="w-full py-3 mt-4 bg-gray-700 text-white text-sm uppercase tracking-wider rounded"
                            onClick={handleTransfer}
                        >
                            Transfer
                        </button>
                    </div>
                </div>
            )}

            {step === 'uploading' && (
                <div className="flex flex-col items-center justify-center min-h-[341px] text-center">
                    <div className="w-16 h-16 border-4 border-gray-700 rounded-full animate-spin mb-4"></div>
                    <p className="mb-4">Uploading...</p>
                    <div className="w-full max-h-40 overflow-y-auto space-y-2">
                        {Object.keys(uploadProgress).map((fileName) => (
                            <div key={fileName}>
                                <p className="text-sm">{fileName}</p>
                                <ProgressBar
                                    now={uploadProgress[fileName]}
                                    label={`${uploadProgress[fileName]}%`}
                                    className="w-full bg-gray-300 text-xs text-gray-700"
                                />
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-sm text-gray-600">Do not close this window until we complete the transfer.</p>
                </div>
            )}

            {step === 'done' && (
                <div className="flex flex-col items-center justify-center min-h-[341px] text-center space-y-4">
                    <IoMdCloudDone className="text-6xl text-gray-700" />
                    <p className="text-lg">Youre done!</p>
                    <p>The transfer email has been sent.</p>
                    <Link href="/" >
                        <p className="text-gray-700 underline" onClick={sendAnother}>Send another?</p>
                    </Link>
                    <div className="w-full max-h-40 overflow-y-auto space-y-2">
                        {/* {fileKeys.map((key, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <span className="truncate">{truncateFileName(key.split('/').pop()!)}</span>
                                <button
                                    className="text-gray-500"
                                    onClick={() => downloadFile(key, key.split('/').pop()!)}
                                >
                                    <AiOutlineDownload />
                                </button>
                            </div>
                        ))} */}
                    </div>
                    <button
                        className="w-full py-3 bg-gray-700 text-white text-sm uppercase tracking-wider rounded"
                        // onClick={downloadAllFiles}
                    >
                        Download All Files
                    </button>
                </div>
            )}

        </div>
    )
}

export default FileUploader;