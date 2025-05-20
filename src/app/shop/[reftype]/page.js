"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";

import { SkCard } from "@/components/Card";
//import "@/components/css/about.css";
import { useLanguage } from "@/lang/LanguageContext";
import { fetchData } from "@/Services/api";
import Pagination from "@/components/Pagination/";
import Search from "@/components/Search/";
import Reload from "@/components/Reload";
import Product from "@/components/Product";
import "./products.css";

const Products = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const reftype = params.reftype;
    const initialPage = parseInt(searchParams.get("page") || "1");

    const [loading, setLoading] = useState(true);
    const [reloading, setReloading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    const { language } = useLanguage();
    const dirction = language === "en" ? "ltr" : "rtl";

    useEffect(() => {
        setLoading(true);
        setError(false);
        window.scrollTo(0, 0);

        fetchData(`shop/products/`, {
            params: {
                q: search,
                page: currentPage,
                
                reftype: reftype,
                
                include: "currency"
            },
            headers: {
                "Accept-language": language
            }
        })
            .then(data => {
                setData(data.data);
                setTotalPages(data.meta.pagination.total_pages);
                setPagination(data.meta.pagination);
                
                setLoading(false);
            })
            .catch(error => {
                setTimeout(() => {
                    setError(error.message);
                    setLoading(false);
                }, 2000);
            });
    }, [language, search, currentPage, reloading, reftype]);

    const UI = loading
        ? (
            <>
                <SkCard dirction={dirction} />
                <SkCard dirction={dirction} />
                <SkCard dirction={dirction} />
                <SkCard dirction={dirction} />
            </>
        )
        : data.map((el, i) => (
            <Product key={i} data={{ ...el, page: currentPage }} />
        ));

    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.push(`/shop/${reftype}?page=${page}`);
    };

    const handleSearch = (e) => {
        router.push(`/shop/${reftype}?page=${currentPage}`);
      if(e.target.value !== "") {
      //  setCurrentPage(null)
      }
        setSearch(e.target.value);
    };

    const reload = () => {
        setError(false);
        setReloading(!reloading);
    };

    if (error) {
        return (
            <div className="containerMe">
                <Reload onClick={reload} message={error} />
            </div>
        );
    }

    return (
        <div className="containerMe hidePaddingMobiel">
            <Search
                query={search}
                handleSearch={handleSearch}
                dirction={dirction}
            />
            <div className={"products " + dirction}>{UI}</div>
            <Pagination
                currentPage={pagination.current_page}
                totalPages={pagination.total_pages}
                handlePageChange={handlePageChange}
                dirction={dirction}
            />
        </div>
    );
};

export default Products;
