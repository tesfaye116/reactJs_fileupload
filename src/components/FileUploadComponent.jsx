import axios from "axios";
import { useState, useEffect } from "react";

const FileUploadComponent = () => {
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState("Choose File");
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState("");
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("http://localhost:5000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                    if (uploadPercentage === 100) {
                        setTimeout(() => setUploadPercentage(0), 10000);
                    }
                },
            });


            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath });

            setMessage("File Uploaded");
            setFilename("Choose File");
        } catch (err) {
            if (err.response.status === 500) {
                setMessage("There was a problem with the server");
            } else {
                setMessage(err.response.data.msg);
            }
            setUploadPercentage(0);
        }
    };
    return (
        <>
            <div className="flex justify-center items-center  m-4">
                <form onSubmit={onSubmit}>
                    <div className="max-w-xl">
                        <label
                            className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                setFile(e.dataTransfer.files[0]);
                                setFilename(e.dataTransfer.files[0].name);
                            }}
                        >
                            <span className="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="font-medium text-gray-600">
                                    Drop files to Attach, or
                                    <span className="text-blue-600 underline">   {filename}
                                    </span>
                                </span>
                            </span>
                            <input type="file" name="Upload" onChange={onChange} className="hidden" />
                        </label>
                    </div>
                    <div className="flex justify-center items-center m-4">
                        <div className="w-full h-4 bg-gray-300 rounded-full">
                            <div className="w-full h-4 bg-blue-500 rounded-full" style={{ width: `${uploadPercentage}%` }}></div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center m-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-32 flex items-center justify-center"
                        >
                            <i className="fas fa-upload mr-2"></i>Upload
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FileUploadComponent;