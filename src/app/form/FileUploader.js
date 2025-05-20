import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({ field, onChange }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const onDrop = acceptedFiles => {
        const file = acceptedFiles[0];  // نختار أول ملف فقط
        if (file) {
            setSelectedFile(file);  // استبدال الملف السابق بالملف الجديد

            // إرسال الملف المختار عبر onChange
            onChange({
                target: {
                    name: field.name,
                    value: file
                }
            });
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false  // تعطيل إمكانية اختيار ملفات متعددة
    });

    return (
        <div
            {...getRootProps()}
            style={{
                border: "2px dashed #aaa",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer"
            }}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>أسقط الملف هنا ...</p>
            ) : (
                <p>اسحب ملفًا هنا أو انقر لاختياره</p>
            )}

            {selectedFile && (
                <div>
                    <h4>الملف المختار:</h4>
                    <p>{selectedFile.name}</p>  {/* عرض اسم الملف الذي تم اختياره */}
                    <button
                        type="button"
                        onClick={() => {
                            setSelectedFile(null);  // إلغاء الملف الحالي
                            onChange({
                                target: {
                                    name: field.name,
                                    value: null  // إلغاء القيمة
                                }
                            });
                        }}
                    >
                        إلغاء اختيار الملف
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
