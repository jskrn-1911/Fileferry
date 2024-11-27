
// import React, { useState } from 'react'

// type FileType = File & { preview?: string };

// interface UploadProgress {
//     [key: string]: number;
// }

const FileUploader: React.FC = () => {
    // const [files, setFiles] = useState<FileType[]>([]);
    // const [emailTo, setEmailTo] = useState<string>('');
    // const [yourEmail, setYourEmail] = useState<string>('');
    // const [title, setTitle] = useState<string>('');
    // const [message, setMessage] = useState<string>('');
    // const [step, setStep] = useState<'initial' | 'uploading' | 'done'>('initial');
    return (
        <div className='px-14 py-14  h-full w-full text-slate-950'>
            <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-md space-y-6">
                {/* Add Files Section */}
                <div className=" border-2 border-dashed border-gray-300 rounded-lg p-1">
                    <button
                        className="text-blue-600 font-semibold hover:underline focus:outline-none"
                        type="button"
                    >
                        + Add files
                    </button>
                    <p className="text-sm text-gray-500 mt-2">Or select a folder</p>
                </div>

                {/* Limit Information */}
                {/* <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">Up to 2 GB free</p>
                    <button
                        className="text-xs text-purple-600 hover:underline focus:outline-none"
                        type="button"
                    >
                        Increase limit
                    </button>
                </div> */}

                {/* Input Fields */}
                <div className="space-y-3">
                    <input
                        type="email"
                        placeholder="Email to (0 of 3)"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-300 focus:outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Your email"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-300 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-300 focus:outline-none"
                    />
                    <textarea
                        placeholder="Message"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-300 focus:outline-none"
                        rows={3}
                    ></textarea>
                </div>

                {/* Transfer Button */}
                <button
                    className="w-full bg-blue-500 text-white rounded-md py-2 font-semibold hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    type="button"
                >
                    Transfer
                </button>
            </div>
        </div>
    )
}

export default FileUploader;