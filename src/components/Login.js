import { useState } from "react";

export default function Login() {
  function submit(event) {
    event.preventDefault();
    console.log(data);
    
  }
  const [data, setData] = useState({ 
    email: "", 
    password: "",
    remember:true,
    country:"Yemenn",
    status:"student"
})
  return (
    <form onSubmit={submit}>
      <div>
        <label>Email </label>
        <input
          onChange={(event) => {
            setData({ ...data, email: event.target.value });
          }}
          value={data.email}
        />
      </div>
      <div>
        <label>Password </label>
        <input
          onChange={(event) => {
            setData({ ...data, password: event.target.value });
          }}
          value={data.password}
        />
      </div>
      <div>
        <label>Remember passsword</label>
        <input
          type="checkbox"
          checked={data.remember}
          onChange={(event) => {
            setData({ ...data, remember: event.target.checked });
          }}
        />
      </div>
      <div>
        <select
          value={data.country}
          onChange={(event) => {
            setData({ ...data, country: event.target.value });
          }}
        >
          <option>Yemen</option>
          <option>KSA</option>
        </select>
      </div>
      <div>
        <label htmlFor="s">Student</label>
        <input
          checked={(data.status === "student")}
          onChange={(e) => {
            setData({ ...data, status: "student" });
          }}
          id="s"
          type="radio"
        />
        <label htmlFor="t">Teacher</label>
        <input
          checked={data.status === "teacher"}
          onChange={(e) => {
            setData({ ...data, status: "teacher" });
          }}
          id="t"
          type="radio"
        />
      </div>
      <button type="submit" onClick={submit}>
        Login
      </button>
    </form>
  );
}
