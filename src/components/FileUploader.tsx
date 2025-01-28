import Link from 'next/link';
import React, { useCallback, useState } from 'react'
import { handleTransfer } from '@/utils/fileTransferHandler';
import { signIn, useSession } from 'next-auth/react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineClose, AiOutlineCopy, AiOutlineDownload } from 'react-icons/ai';
import { LuPlus } from 'react-icons/lu';
import { IoMdCloudDone } from 'react-icons/io';
import { ProgressBar } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type FileType = File & { preview?: string };

interface UploadProgress {
    [key: string]: number;
}

const FileUploader: React.FC = () => {
    const { data: session } = useSession();

    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [step, setStep] = useState<'initial' | 'verify' | 'uploading' | 'done'>('initial');

    const [files, setFiles] = useState<FileType[]>([]);
    const [emailTo, setEmailTo] = useState<string>('');
    const [yourEmail, setYourEmail] = useState<string>(session?.user?.email || '');
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({})
    const [overallProgress, setOverallProgress] = useState<number>(0)

    const [downloadFileUrls, setDownloadFileUrls] = useState<string[]>([]);

    const [errorMessage, setErrorMessage] = useState<string>('');

    const [verificationCode, setVerificationCode] = useState<string>('');
    const [enteredCode, setEnteredCode] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const MAX_FILE_SIZE = 250 * 1024 * 1024; // 250 MB for non-premium users
    const PREMIUM_MAX_FILE_SIZE = 500 * 1024 * 1024; // 500 MB for signed-in users
    const PREMIUM_USER_MAX_SIZE = 1024 * 1024 * 1024; // 1 GB for premium users

    const totalFileSize = files.reduce((acc, file) => acc + file.size, 0);
    // const totalFileSizeInMB = (totalFileSize / 1024 / 1024).toFixed(2); // in mb
    const isFileSizeExceeded = session?.user?.isPremium
        ? totalFileSize > PREMIUM_USER_MAX_SIZE
        : session?.user?.email
            ? totalFileSize > PREMIUM_MAX_FILE_SIZE
            : totalFileSize > MAX_FILE_SIZE;

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        setIsDragging(false)
        setErrorMessage('');
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

    const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

    const handleSendVerificationCode = async () => {
        setLoading(true);
        const code = generateCode();
        setVerificationCode(code);
        try {
            const response = await fetch('/api/send-verification-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    toEmail: yourEmail,
                    code: code,
                }),
            });

            if (response.ok) {
                console.log(`code sent to email ${yourEmail}`)
                setStep("verify")
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Failed to send verification code.');
            }
        } catch (error) {
            setErrorMessage('Failed to send verification code.');
            console.log("Error:", error)
        } finally {
            setLoading(false)
        }
    };

    const handleVerifyCode = () => {
        if (enteredCode === verificationCode) {

            handleTransfer(files, emailTo, yourEmail, title, setStep, setOverallProgress, setUploadProgress, setDownloadFileUrls, setFiles,)
            setEnteredCode("");
        } else {
            setErrorMessage('Incorrect verification code.');
        }
    };

    const handleTransferClick = () => {
        if (isFileSizeExceeded) {
            let limitMessage = '';
            if (session?.user?.isPremium) {
                limitMessage = `Total file size exceeds the 1 GB limit for premium users.`;
            } else if (session?.user?.email) {
                limitMessage = `Total file size exceeds the 500 MB limit for signed-in users upgrade to premium to access more limit.`;
            } else {
                limitMessage = `Total file size exceeds the 250 MB limit for non-logged-in users.`;
            }
            setErrorMessage(limitMessage);
            console.log(limitMessage)
            return;
        }

        if (!session?.user) {
            handleSendVerificationCode(); // send the verification code
            return;
        }

        const emailToUse = yourEmail || session?.user?.email || ''; 

        if (!yourEmail) {
            console.log("your email is not entered.", emailToUse);
            setYourEmail(emailToUse);
        }

        handleTransfer(files, emailTo, yourEmail || emailToUse, title, setStep, setOverallProgress, setUploadProgress, setDownloadFileUrls, setFiles,)
    }

    const removeFile = (fileName: string) => {
        setFiles((files) => files.filter((file) => file.name !== fileName))
    }

    const sendAnother = () => {
        setStep('initial');
        setFiles([]);
        setEmailTo('');
        setYourEmail('');
        setTitle('');
        setMessage('');
        setUploadProgress({});
    }

    const truncateFileName = (name: string) => {
        const maxLength = 20;
        return name.length <= maxLength ? name : `${name.substr(0, maxLength)}...`;
    };

    return (
        <div className='md:ps-14 xl:pe-14 md:pe-0 px-0 flex items-center justify-center  py-14  h-full w-full text-slate-950'>
            {step === 'initial' && (
                <div
                    className={`w-full max-w-[300px] p-5 bg-white shadow-lg rounded-md ${isDragging ? 'border-2 border-dashed border-gray-600' : 'cursor-pointer'
                        }`}
                    {...getRootProps()}
                >
                    <div className="box-data-container p-1 h-[310px] overflow-y-auto">
                        <input {...getInputProps()} />
                        {isDragging && (
                            <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-10 text-gray-700">
                                <LuPlus className="text-5xl  m-4 p-2 border-2 rounded-full" />
                                <p className="text-lg">Drop files here</p>
                            </div>
                        )}
                        <div className={`${isDragging ? 'blur-sm' : ''}`}>
                            <div className="flex items-center gap-4 mb-4 cursor-pointer" onClick={open}>
                                <button className="w-8 h-8 flex items-center justify-center bg-slate-950 hover:bg-slate-900 text-white rounded-full">
                                    <LuPlus />
                                </button>
                                <div>
                                    <span className="font-semibold">{files.length > 0 ? 'Add more files' : 'Add files'}</span>
                                    <span className="block text-sm text-gray-500 underline">{files.length === 0 ? 'Or select a folder' : ''}</span>
                                </div>
                                {/* <div className="relative">
                                    <AiOutlineInfoCircle
                                        className="text-gray-500 cursor-pointer hover:text-gray-700"
                                        size={20}
                                        onClick={() => setErrorMessage('Click to login and upgrade to increase the file limit.')}
                                        title="Click to see options"
                                    />
                                    {errorMessage && (
                                        <div className="absolute top-6 left-0 bg-white shadow-lg p-2 text-sm text-gray-700 rounded-md">
                                            {session?.user?.email
                                                ? session?.user?.isPremium
                                                    ? 'Upgrade to premium for 1 GB file limit'
                                                    : 'Login to extend your file size limit to 500 MB.'
                                                : 'Login to extend file size limit to 500 MB.'}
                                        </div>
                                    )}
                                </div> */}
                            </div>
                            <div className="mb-4">
                                {files.map((file) => (
                                    <div key={file.name} className="flex items-center justify-between p-2 border-b border-gray-200">
                                        <p className="truncate text-sm w-4/5">{file.name}</p>
                                        <AiOutlineClose
                                            className="text-slate-950 cursor-pointer"
                                            onClick={() => removeFile(file.name)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    value={session?.user?.email || yourEmail}
                                    onChange={(e) => setYourEmail(e.target.value)}
                                    className="w-full p-2 border-b border-gray-400 focus:outline-none"
                                    required
                                    disabled={!!session?.user}
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
                                    placeholder="Title"
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
                        </div>
                    </div>
                    <div className="p-5 pt-4">
                        <button
                            className="w-full py-3 bg-gray-700 text-white text-sm uppercase tracking-wider rounded"
                            onClick={handleTransferClick}
                            disabled={loading}
                        >
                            {loading ? "sending..." : "Transfer"}
                        </button>
                    </div>
                </div>
            )}
            {step === 'verify' && (
                <div className="w-full max-w-[300px] p-5 bg-white shadow-lg rounded-md cursor-pointer">
                    <div className="box-data-container p-1 h-[310px] overflow-y-auto">
                        <div className="flex flex-col items-center justify-center min-h-[341px] text-center">
                            <p>A verification code has been sent to your email.</p>
                            <input
                                className='border-b border-gray-400'
                                type="text"
                                value={enteredCode}
                                onChange={(e) => setEnteredCode(e.target.value)}
                                placeholder="Enter the verification code"
                                required
                            />
                            <button className='bg-slate-900 text-white p-2 m-2 rounded-sm' onClick={handleVerifyCode}>Verify Code</button>
                            {errorMessage && <p>{errorMessage}</p>}
                            <p>Or One Click Login for hassle-free experience <span onClick={() => signIn("google")}>Log In</span></p>
                        </div>
                    </div>
                </div>
            )}
            {step === 'uploading' && (
                <div className="w-full max-w-[300px] p-5 bg-white shadow-lg rounded-md cursor-pointer">
                    <div className="box-data-container p-1 h-[310px] overflow-y-auto">
                        <div className="flex flex-col items-center justify-center min-h-[341px] text-center">
                            <div className="w-24 h-24 mb-4">
                                <CircularProgressbar
                                    value={overallProgress}
                                    text={`${Math.round(overallProgress)}%`}
                                    styles={buildStyles({
                                        textSize: "14px",
                                        pathColor: "#020617",
                                        textColor: "#020617",
                                        trailColor: "#d6d6d6",
                                    })}
                                />
                            </div>
                            <p className="mb-4">Uploading...</p>
                            <div className="w-full max-h-40 overflow-y-auto space-y-2">
                                {Object.keys(uploadProgress).map((fileName) => (
                                    <div key={fileName}>
                                        <p className="text-sm">{fileName}</p>
                                        <ProgressBar
                                            now={uploadProgress[fileName]}
                                            label={`${uploadProgress[fileName]}%`}
                                            className="w-full bg-gray-300 text-xs text-slate-950"
                                        />
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-sm text-gray-600">Do not close this window until the transfer is completed.</p>
                        </div>
                    </div>
                </div>
            )}
            {step === 'done' && (
                <div className="w-full max-w-[300px] p-5 bg-white shadow-lg rounded-md cursor-pointer  overflow-y-auto">
                    <div className="flex flex-col items-center justify-center min-h-[341px] text-center space-y-4">
                        <IoMdCloudDone className="text-6xl text-gray-700" />
                        <p className="text-lg">Youre done!</p>
                        <p>The transfer email has been sent.</p>
                        <Link href="/" >
                            <p className="text-gray-700 underline" onClick={sendAnother}>Send another?</p>
                        </Link>
                        <div className="w-full max-h-40 overflow-y-auto space-y-2">
                            {downloadFileUrls.map((key, index) => (
                                <div key={index} className="flex justify-between items-center space-x-2">
                                    <span className="truncate">{truncateFileName(key.split('/').pop()!)}</span>
                                    <button
                                        className="text-gray-500"
                                    // onClick={() => downloadFile(key, key.split('/').pop()!)}
                                    >
                                        <AiOutlineDownload />
                                    </button>
                                    <button
                                        className="text-gray-500"
                                        onClick={() => {
                                            navigator.clipboard.writeText(key);
                                            alert('Link copied to clipboard!'); // Optional: Confirmation
                                        }}
                                    >
                                        <AiOutlineCopy />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="w-full">
                            <button
                                className="w-full py-3 bg-gray-700 text-white text-sm uppercase tracking-wider rounded"
                            // onClick={downloadAllFiles}
                            >
                                Download All Files
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FileUploader;