"use client";
import { useEffect, useState } from "react";
import Card, { SkCard } from "@/components/Card/index.js";
//import "@/components/css/about.css";
import { useLanguage } from "@/lang/LanguageContext";
import { fetchData } from "@/Services/api";
import Pagination from "@/components/Pagination/";
import Search from "@/components/Search/";
import Reload from "@/components/Reload";
 
import { useParams, useSearchParams, useRouter } from "next/navigation";

const exclude = `
slug,description,images,favorites_count,formataddress,end_at,
barcode,code,country_id,latitude,longitude,user_object_rating,
address,location,phone,email,website,sumRating,user_is_rating,
type_process,currency_conversions_id,currency_conversions_data,
level,price,country_long,departments_id,countRating,config_data,
`;

const Projects = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const cat = params.cat;
    const initialPage = parseInt(searchParams.get("page")) || 1;

    const [loading, setLoading] = useState(true);
    const [reloading, setReloading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const { language } = useLanguage();
    const dirction = language === "en" ? "ltr" : "rtl";

    useEffect(() => {
        setLoading(true);
        setError(false);
        fetchData(`webbasic/${cat}`, {
            params: {
                q: search,
                page: search ? null : currentPage,

                per_page: 2
            },
            headers: {
                "Accept-language": language
            }
        })
            .then(data => {
                setData(data.data);
                setTotalPages(data.meta.pagination.total_pages);
                setLoading(false);
            })
            .catch(error => {
                setTimeout(() => {
                    setError(error.message);
                    setLoading(false);
                }, 2000);
            });
    }, [language, search, currentPage, reloading, cat]);

    let UI = data.map(el => (
        <div key={el.id}>
            <Card
                title={el.name}
                description={el.short_description}
                img={el.image ? el.image.original : "/imgs/nanologo.png"}
                more={`/web/${cat}/${el.id}`}
            />
        </div>
    ));

    function handlePageChange(page) {
        setCurrentPage(page);
        router.push(`/web/${cat}?page=${page}`);
    }

    const handleSearch = e => setSearch(e.target.value);

    if (loading) {
        UI = (
            <>
                <SkCard dirction={dirction} />
                <SkCard dirction={dirction} />
                <SkCard dirction={dirction} />
            </>
        );
    }

    function reload() {
        setError(false);
        setReloading(!reloading);
    }

    if (error) {
        UI = <Reload message={error} onClick={reload} />;
    }

    return (
        <div className="projects">
            <Search
                query={search}
                handleSearch={handleSearch}
                dirction={dirction}
            />
            <div className={"containerMe gridTemplate " + dirction}>{UI}</div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                dirction={dirction}
            />
        </div>
    );
};

export default Projects;
