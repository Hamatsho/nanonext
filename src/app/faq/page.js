"use client";
import { useEffect, useState } from "react";
import { fetchData } from "@/Services/api";
import Title from "@/components/Title";
import Loader from "@/components/Loader"
// import { Link } from "react-router-dom";
import "./faq.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import { useLanguage } from "@/lang/LanguageContext";
import Pagination from "@/components/Pagination/";
import Search from "@/components/Search/";

function Question({ question, answer, id, answers }) {
    const [showAnswer, setShowAnswer] = useState(false);
    function handle() {
        showAnswer ? setShowAnswer(false) : setShowAnswer(true);
    }
    const answersUi = answers.map((ans, i) => {
        return (
            <div
                key={i}
                dangerouslySetInnerHTML={{ __html: ans.content_html }}
            ></div>
        );
    });
    const { language } = useLanguage();
    const dirction = language === "en" ? "ltr" : "rtl";
    return (
        <div className="ques" key={id}>
            <div className={`name ${dirction}`} onClick={handle}>
                <FontAwesomeIcon
                    icon={showAnswer ? faChevronUp : faChevronDown}
                />
                <h4 className="">{question}</h4>
            </div>
            <div
                className={`answer ${dirction}`}
                style={
                    showAnswer
                        ? {
                              width: "100%",
                              height: "auto",
                              padding: "20px",
                              maxHeight: "fit-content"
                          }
                        : {}
                }
            >
                {answersUi}
            </div>
        </div>
    );
}
const Faq = () => {
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(null);
    const [loading2, setLoading2] = useState(null);
    // const [error, setError] = useState(false);
    const [currentCat, setCurrentCat] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const { language } = useLanguage();
    const dirction = language === "en" ? "ltr" : "rtl";
    useEffect(() => {
        setLoading(true);
        fetchData("faq/categories", {
            headers: {
                "Accept-language": language
            }
        })
            .then(data => {
                console.log(data);
                setCategories(data.data);
                // setCurrentCat(data.data[0].id);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }, [language]);

    useEffect(() => {
        setLoading2(true);
        fetchData("faq/questions", {
            params: {
                categories_id: currentCat === "all" ? null : currentCat,
                page: currentPage,
                // per_page:2,
                // q: encodeURIComponent(search),
                q: search
            },
            headers: {
                "Accept-language": language
            }
        })
            .then(data => {
                setQuestions(data.data);
                setTotalPages(data.meta.pagination.total_pages);
                setLoading2(false);
            })
            .catch(error => {
                console.log(error);
                setLoading2(false);
            });
    }, [currentCat, currentPage, search, language]);

    function handleCategory(e) {
        setCurrentPage(1);
        let targetId = e.target.getAttribute("catid");
        if (targetId !== currentCat)
            setCurrentCat(e.target.getAttribute("catid"));
        document
            .querySelectorAll(".faq .cat")
            .forEach(el => el.classList.remove("active"));
        e.target.classList.add("active");
        // console.log(event);
    }

    let catUI = categories.map((cat, i) => {
        return (
            <div
                key={cat.id}
                className={"cat "}
                onClick={handleCategory}
                catid={cat.id}
            >
                {cat.name}
            </div>
        );
    });

    let questionsUI = questions.map((q, i) => {
        return (
            <Question
                key={i}
                question={q.content}
                answer={q.answers.data[0].content}
                answers={q.answers.data}
                id={q.id}
            />
        );
    });
    if (!loading2 && questionsUI.length === 0) {
        /*  questionsUI = (
            <div className="info">
                {language === "en" ? "NO Result" : "لاتوجد نتائج في هذا الصنف"}
            </div>
        ); */
    }

    if (loading) {
        catUI = (
            <>
                <Skeleton
                    className="skeleton"
                    containerClassName="categories containerMe"
                    height={"100px"}
                    width={"100px"}
                    count={3}
                />
            </>  
        );
    }
    if (loading2) {
        questionsUI = (
            <>
             <Loader />
            </>
        );
        // questionsUI = catUI
    }
    function handlePageChange(page) {
        setCurrentPage(page);
    }

    function handleSearch(e) {
        setSearch(e.target.value);
    }
    return (
        <div className="faq ">
            <Title text={language === "en" ? "FAQ" : "الأسئلة الشائعة"} />
            <div className="">
                <div className={`categories containerMe ${dirction}`}>
                    <div
                        className={"cat active allCat"}
                        onClick={handleCategory}
                        catid="all"
                    >
                        {language === "en" ? "All" : "الكل"}
                    </div>
                    {catUI}
                </div>

                <Search
                    query={search}
                    handleSearch={handleSearch}
                    dirction={dirction}
                />
            </div>
            <div className={`questions containerMe ` + dirction}>
                
                {questionsUI}
            </div>
            <Pagination
                dirction={dirction}
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </div>
    );
};

export default Faq;
