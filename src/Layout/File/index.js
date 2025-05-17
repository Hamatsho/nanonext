
import "./files.css"
import { useEffect, useState } from "react";
import { fetchData } from "../../Services/api";
import { Link, useParams } from "react-router-dom";
import Title from "../../components/Title";
// import "./framework.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import DownloadLink from "react-download-link";
import { useLanguage } from "../../lang/LanguageContext";
function F() {
  return (
    <div className="file bg-white p-10 rad-10">
      <FontAwesomeIcon icon={solid.faDownload} color="grey" />
      <div className="icon txt-c">
        <img className="mt-15 mb-15" src="./fileIcons/pdf.svg" alt="" />
      </div>
      <div className="txt-c mb-10 fs-14">
        my-file.pdf lkfd kldlsklk skldsk dkfsdk dkskd{" "}
      </div>
      <p className="c-grey fs-13">
        Elzero my-file.pdf lkfd kldlsklk skldsk dkfsdk dkskd my-file.pdf lkfd
        kldlsklk skldsk dkfsdk dkskd
      </p>
      <div className="info between-flex mt-10 pt-10 fs-13 c-grey">
        <span>20/06/2020</span>
        <span>5.5MB</span>
      </div>
    </div>
  );
}
function File({name,size,date,fileName, src,id,desc}) {
 const {language} = useLanguage()
  return (
    <div key={id} className="file bg-white p-10 rad-10">
      
      <DownloadLink
        label={<FontAwesomeIcon icon={solid.faDownload} color="grey" />}
        filename={name+ "_Nano2soft"}
        exportFile={() => src}
      />
      <div className="icon txt-c">
        <img className="mt-15 mb-15" src="./fileIcons/pdf.svg" alt="" />
      </div>
      <div className="txt-c mb-10 fs-14">{name} </div>
      <p className="c-grey fs-13"
        style={language === "en" ? {textAlign:"left"} :{textAlign:"right"}}
      >{desc} </p>
      <div className="info between-flex mt-10 pt-10 fs-13 c-grey">
        <span>{date} </span>
        <span>{size} </span>
      </div>
    </div>
  );
}
function Files() {
  const [files, setFiles] = useState([])
    useEffect(() => {
      fetchData("media/files/", {
      
      })
        .then((data) => {
          console.log(data);
          setFiles(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
 
const ui = files.map((f) => {
  return (
    <File
      id={f.id}
      name={f.name}
      size={f.file.file_size}
      date={f.updated_at}
      fileName={f.file.file_name}
      src={f.file.path}
      disc={f.short_description}
    />
  );
})
  return (
    <div className="files-page containerMe">
      <div className="fileList">
        <div className="list allCat">list 2</div>
        <div className="list ">list 1 dds sad adadasd asd</div>
        <div className="list">list 3</div>
        <div className="list">list 4</div>
        <div className="list">list 4</div>
        <div className="list">list 4</div>
        <div className="list">list 4</div>
      </div>
      <div className="files-content d-grid gap-20">
        {ui}
       
      </div>
    </div>
  );

}

export default Files;