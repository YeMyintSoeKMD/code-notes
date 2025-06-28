import React, { useState, useRef } from "react";

export const MultiFileUpload = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const imageInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const files = event.target.files;
        if (files) {
        const newImages = Array.from(files).map((file) =>
            URL.createObjectURL(file)
        );
        setUploadedImages((prev) => [...prev, ...newImages]);
        }
    };

    const removeImage = (index) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (<>
        {/* Image Upload */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                ref={imageInputRef}
                />
                <button
                type="button"
                onClick={() => imageInputRef.current && imageInputRef.current.click()}
                className="cursor-pointer focus:outline-none"
                >
                <CloudArrowUpIcon className="h-10 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload images or drag and drop</p>
                </button>
            </div>

            {/* Uploaded Images Preview */}
            {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {uploadedImages.map((image, index) => (
                    <div key={index} className="relative">
                    <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                    </div>
                ))}
                </div>
            )}
        </div>
    </>)
}
