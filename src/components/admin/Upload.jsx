"use client";
import { useState } from "react";
import { uploadSingleFile } from "@/services/uploadService";

export default function UploadSingleFile({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");

    // chọn file 
    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setError("");
    };

    // upload file 
    const handleUpload = async () => {
        if (!file) {
            setError("Vui lòng chọn file");
            return;
        }

        try {
            setLoading(true);
            setProgress(0);
            setError("");

            const res = await uploadSingleFile(file, setProgress);

            setImageUrl(res.file);
            const fileUrl = res.file;
            const fileName = fileUrl.split("/").pop();
            onUploadSuccess(fileName);

        } catch (err) {
            console.log(err);
            setError(err.message || "Upload thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded
xl space-y-4">
            <h2 className="text-xl font-bold">Upload ảnh</h2>

            {/* Input */}
            <input type="file" onChange={handleChange} />

            {/* Preview */}
            {preview && (
                <img
                    src={preview}
                    alt="preview"
                    className="w-full h-48 object-cover rounded-lg"
                />
            )}

            {/* Progress */}
            {loading && (
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            )}

            {/* Button */}
            <button
                onClick={handleUpload}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 
rounded-lg disabled:opacity-50"
            >
                {loading ? `Đang upload ${progress}%` : "Upload"}
            </button>

            {/* Error */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Result */}
            {imageUrl && (
                <div>
                    <p className="text-green-500">Upload thành
                        công</p>
                    <img
                        src={imageUrl}
                        alt="result"
                        className="w-full h-48 object-cover rounded
lg mt-2"
                    />
                </div>
            )}
        </div>
    );
} 