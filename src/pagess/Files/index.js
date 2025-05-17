import { useEffect, useState } from "react";
import { fetchData } from "../../Services/api";
import Title from "../../components/Title";
// import { Link } from "react-router-dom";
import "./files.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import { useLanguage } from "../../lang/LanguageContext";
import DownloadLink from "react-download-link";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
function File({ name, size, date, fileName, src, id, desc }) {
    const { language } = useLanguage();
    return (
        <div key={id} className="file bg-white p-10 rad-10">
            <DownloadLink
                label={
                    <FontAwesomeIcon
                        icon={faDownload}
                        color="var(--second-color)"
                    />
                }
                filename={name + "_Nano2soft"}
                exportFile={() => src}
            />
            <div className="icon txt-c">
                <img className="mt-15 mb-15" src="./fileIcons/pdf.svg" alt="" />
            </div>
            <div className="txt-c mb-10 fs-14">{name} </div>
            <p
                className="c-grey fs-13"
                style={
                    language === "en"
                        ? { textAlign: "left" }
                        : { textAlign: "right" }
                }
            >
                {desc}
            </p>
            <div className="info between-flex mt-10 pt-10 fs-13 c-grey">
                <span>{date} </span>
                <span>{size} KB</span>
            </div>
        </div>
    );
}

const Files = () => {
    const [categories, setCategories] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    // const [error, setError] = useState(false);
    const [currentCat, setCurrentCat] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const { language } = useLanguage();
    const dirction = language === "en" ? "ltr" : "rtl";
    useEffect(() => {
        setLoading(true);
        fetchData("media/filelists", {
            headers: {
                "Accept-language": language
            }
        })
            .then(data => {
                console.log(data);
                setCategories(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }, [language]);
    useEffect(() => {
        setLoading2(true);
        fetchData("media/files", {
            params: {
                categories_id: currentCat === "all" ? null : currentCat,
                page: currentPage,
                // per_page:1,
                // q: encodeURIComponent(search),
                q: search
            },
            headers: {
                "Accept-language": language
            }
        })
            .then(data => {
                console.log(data, "Filess");
                setFiles(data.data);
                setLoading2(false);
                setTotalPages(data.meta.pagination.total_pages);
            })
            .catch(error => {
                console.log(error);
            });
    }, [currentCat, currentPage, search, language]);

    function handleCategory(e) {
        setCurrentPage(1);
        let targetId = e.target.getAttribute("catid");
        if (targetId !== currentCat)
            setCurrentCat(e.target.getAttribute("catid"));
        document
            .querySelectorAll(".list")
            .forEach(el => el.classList.remove("active"));
        e.target.classList.add("active");
    }

    let catUI = categories.map((cat, i) => {
        return (
            <div
                key={cat.id}
                className={"list "}
                onClick={handleCategory}
                catid={cat.id}
            >
                {cat.name}
            </div>
        );
    });

    let filesUI = files.map(f => {
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
    });
    if (filesUI.length === 0) {
        filesUI = [
            <div className="info">
                {language === "en" ? "NO Result" : "لاتوجد نتائج في هذا الصنف"}
            </div>
        ];
    }

    const SkCat = (
        <Skeleton
            containerClassName="fileList containerMe"
            height={"50px"}
            width={"100px"}
        />
    );
    if (loading) {
        catUI = [SkCat, SkCat];
    }
    const SkFile = (
        <Skeleton
            containerClassName="  d-grid gap-20 containerMe"
            height={"200px"}
            width={"200px"}
        />
    );
    if (loading2) {
        filesUI = [SkFile, SkFile, SkFile, SkFile];
    }
    function handlePageChange(page) {
        setCurrentPage(page);
    }

    function handleSearch(e) {
        setSearch(e.target.value);
    }
    return (
        <>
            <Title text={language === "en" ? "Files" : "الملفات "} />
            <div className=" files-page containerMe">
                <Search
                    query={search}
                    handleSearch={handleSearch}
                    dirction={dirction}
                />
                <div className={`fileList  ${dirction} `}>
                    <div
                        className={"list active allCat"}
                        onClick={handleCategory}
                        catid="all"
                    >
                        {language === "en" ? "All" : "الكل"}
                    </div>
                    {catUI}
                </div>

                <div className="files-content  d-grid gap-20 containerMe">
                    {filesUI}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    dirction={dirction}
                />
            </div>
        </>
    );
};

export default Files;
