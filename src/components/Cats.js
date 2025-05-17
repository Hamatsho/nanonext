import { useEffect, useState } from "react"
import { fetchData } from "../Services/api";
import Title from "./Title";

const Cats = () => {
    const [data, setData] = useState({data:[]})
     const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
     
useEffect(() => {
    fetchData("webbasic/categories", {
      reftype: "report",
    })
      .then((data) => {
        setData(data);
        console.log(data, "Categories");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
},[])
const ui = data.data.map((el) => {
    // return <h1>{el.name} </h1>
    return (
      <div className="containerMe">
        <Title text={el.name} />
        <p> {el.id} </p>
        <p> {el.ref_type_class} </p>
        <img src={el.image ? el.image.original : ""} width="200px" alt="" />
      </div>
    );
})
if(loading) {
    return <h1>Loading...</h1>
}
if(error) {
    return <h1>{error} </h1>
}
    return (
        <div>

            {ui}
        </div>
    )
}
export default Cats;