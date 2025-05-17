"use client";
import { useEffect, useState } from "react";
import Card, { SkCard } from "../../components/Card";
import "../../components/css/about.css";
import { useLanguage } from "../../lang/LanguageContext";
import { fetchData } from "../../Services/api";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

import Reload from "../../components/Reload";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

//import Product from "../../components/Product";
const exclude = `
slug,description,images,favorites_count,formataddress,end_at,
barcode,code,country_id,latitude,longitude,user_object_rating,
address,location,phone,email,website,sumRating,user_is_rating,
type_process,currency_conversions_id,currency_conversions_data,
level,price,country_long,departments_id,countRating,config_data,
`;
// const cat = "posts"
const Projects = () => {
  const { cat } = useParams();
  const [loading, setLoading] = useState(true);
  const [reloading, setReloading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
const initialPage = parseInt(searchParams.get("page")) || 1;
const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const { language } = useLanguage();
  const dirction = language === "en" ? "ltr" : "rtl";
  useEffect(() => {
    setLoading(true);
    setError(false);
    // window.scrollTo(0,0)
    // if(loading === false) return ;
    fetchData(`webbasic/${cat}`, {
      params: {
        q: search,
        page: currentPage,
        exclude: exclude,
        per_page: 2,
      },
      headers: {
        "Accept-language": language,
      },
    })
      .then((data) => {
        setData(data.data);
        setTotalPages(data.meta.pagination.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        setTimeout(() => {
          setError(error.message);
          setLoading(false);
        }, 2000);
      });
    console.log("hello");
  }, [language, search, currentPage, reloading, cat]);

  let UI = data.map((el, i) => {
    return (
      <div key={el.id}>
        <Card
          title={el.name}
          description={el.short_description}
          img={el.image ? el.image.original : "/imgs/nanologo.png"}
          more={`/${cat}/${el.id}`}
        />
      </div>
    );
  });

  function handlePageChange(page) {
    setCurrentPage(page);
navigate(`/${cat}?page=${page}`);
    }
  const handleSearch = (e) => setSearch(e.target.value);

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
      <Search query={search} handleSearch={handleSearch} dirction={dirction} />
      <div className={"containerMe grid-template " + dirction}>{UI}</div>
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
