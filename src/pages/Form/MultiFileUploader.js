import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const MultiFileUploader = ({field, onChange }) => {
    const [files, setFiles] = useState([]);

    const onDrop = acceptedFiles => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setFiles(prevFiles => {
                const updatedFiles = [...prevFiles, ...acceptedFiles];
                onChange({
                  target:{
                    name:field.name,
                    value:updatedFiles
                  }
                }); // تمرير الملفات للأب
                return updatedFiles;
            });
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true // السماح بتحميل عدة ملفات
    });

    const removeFile = (index) => {
        setFiles(prevFiles => {
            const updatedFiles = prevFiles.filter((_, i) => i !== index);
            onChange({
              target:{
                name:field.name,
                value:updatedFiles
              }
            }); // تمرير الملفات بعد الحذف للأب
            return updatedFiles;
        });
    };

    return (
        <div>
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
                    <p>أسقط الملفات هنا ...</p>
                ) : (
                    <p>اسحب الملفات هنا أو انقر لاختيارها</p>
                )}
            </div>

            {files.length > 0 && (
                <div>
                    <h4>الملفات المختارة:</h4>
                    <ul>
                        {files.map((file, index) => (
                            <li key={index} style={{ marginBottom: "10px" }}>
                                {file.name}{" "}
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    style={{
                                        marginLeft: "10px",
                                        color: "red",
                                        backgroundColor: "transparent",
                                        border: "none",
                                        cursor: "pointer"
                                    }}
                                >
                                    إلغاء
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MultiFileUploader;
