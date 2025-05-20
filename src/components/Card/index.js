"use client";
//import "./card.css";
import styles from './Cards.module.css';

import Link from "next/link";
import { useLanguage } from "@/lang/LanguageContext";
import Skeleton from "react-loading-skeleton";
const Card = props => {
    const { language } = useLanguage();
    return (
        <div
            className={styles.card}
            style={{ textAlign: language === "en" ? "left" : "right" }}
        >
            <img
                decoding="async"
                className={styles.cover}
                src={props.img}
                alt=""
                width={"100%"}
            />
            {/* <img decoding="async" className="instructor" src="imgs/nanologo.webp" alt="" /> */}
            <div className={styles.info}>
                <h4 className={styles.title}>
                    {props.title ? props.title : "Unknowen"}
                </h4>
                <p
                    className={styles.description}
                    dangerouslySetInnerHTML={{
                        __html: props.description
                            ? props.description
                            : "Description not exist"
                    }}
                >
                    {/* {props.description ? props.description : "Description not exist"} */}
                </p>
            </div>
            <div className={styles.btn}>
                <Link href={props.more}>
                    <button className={styles.more + " hideStyle"}>
                        {language === "en" ? "more ..." : "... المزيد"}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export const SkCard = ({ dirction }) => {
    return (
        <div className={`${styles.skCard} ${dirction}`}>
            <Skeleton
                containerClassName={styles.skCard}
                className={styles.item}
                width={"100%"}
                height={200}
            />
            <Skeleton
                className={styles.item}
                containerClassName={styles.skCard}
                width={200}
                height={20}
                // style={{ margin: " auto", display: "block" }}
            />
            <Skeleton
                className={styles.item}
                containerClassName={styles.skCard}
                width={"80%"}
                height={60}
            />
            <Skeleton
                className={styles.item}
                containerClassName={styles.skCard}
                width={"80px"}
                height={"20px"}
                style={{ margin: " auto", display: "block" }}
            />
        </div>
    );
};
export default Card;
