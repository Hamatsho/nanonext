import { useEffect, useState } from "react";
import  { SkCard } from "../../components/Card";
import "../../components/css/about.css";
import { useLanguage } from "../../lang/LanguageContext";
import { fetchData } from "../../Services/api";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

import Reload from "../../components/Reload";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

import Product from "../../components/Product";
import "./products.css";
/*import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    NavLink
} from "react-router-dom";
*/
const Products = ({ ref }) => {
    const { reftype } = useParams();
    const [searchParams] = useSearchParams();

    // const [reft, setReft] = useState(reftype);
    const [loading, setLoading] = useState(true);
    const [reloading, setReloading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const initialPage = parseInt(searchParams.get("page")) || 1;

    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const { language } = useLanguage();
    const dirction = language === "en" ? "ltr" : "rtl";

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(false);
        window.scrollTo(0, 0);
        
        fetchData(`shop/products/`, {
            params: {
                q: search,
                page: currentPage,
                per_page: 4,
                reftype: reftype,
                orderDirection: "desc",
                include: "currency",
                
            },
            headers: {
                "Accept-language": language
            }
        })
            .then(data => {
                setData(data.data);
                console.log(data);

                setTotalPages(data.meta.pagination.total_pages);
                setLoading(false);
            })
            .catch(error => {
                setTimeout(() => {
                    setError(error.message);
                    setLoading(false);
                }, 2000);
            });
        console.log("hello");
    }, [language, search, currentPage, reloading, reftype]);

    let UI = data.map((el, i) => {
        el.page = currentPage;
        return <Product data={el} />;
    });

    function handlePageChange(page) {
        setCurrentPage(page);
        navigate(`/shop/${reftype}?page=${page}`);
    }
    const handleSearch = e => setSearch(e.target.value);

    if (loading) {
        UI = (
            <>
                <SkCard dirction={dirction} />
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
        return (
            <div className="containerMe">
                <Reload onClick={reload} message={error} />
            </div>
        );
    }
    return (
        <div className={"containerMe "}>
            <Search
                query={search}
                handleSearch={handleSearch}
                dirction={dirction}
            />
            <div className={"products " + dirction}>{UI}</div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                dirction={dirction}
            />
        </div>
    );
};

export default Products;
