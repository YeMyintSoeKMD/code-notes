import React, { useState, useRef } from "react";

export const FileUpload = () => {
    
    const [uploadedImage, setUploadedImage] = useState(null);
    const imageInputRef = useRef(null);
  
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        setUploadedImage(URL.createObjectURL(file));
      }
    };
  
    const removeImage = () => {
      setUploadedImage(null);
    };

    return (<>
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                type="file"
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

            {/* Uploaded Image Preview */}
            {
                uploadedImage &&
                <div className="relative w-24 h-24 mt-4">
                <img
                    src={uploadedImage}
                    alt={`Upload`}
                    className="w-full h-full object-cover rounded-lg"
                />
                <button
                    onClick={() => removeImage()}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>
                </div>
            }
        </div>
    </>)
}
