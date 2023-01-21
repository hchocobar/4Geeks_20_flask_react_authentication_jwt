import React, { useState, useContext } from "react";
import { useNavigate} from "react-router-dom";
import { Context } from "../store/appContext";
/* import "../../styles/home.css"; */

export const Login = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = () => {
        console.log(email, password);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "email": email,
        "password": password
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://3001-hchocobar-4geeks20flask-e39h827pdvt.ws-us83.gitpod.io/api/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.access_token) {
                localStorage.setItem("token", result.access_token);
                navigate("/demo");
            } else {
                store.message = result.message;
                navigate("/login");
             }})
        .catch(error => console.log('error', error));
    };




	return (
		<div className="text-center mt-5">
			<h1>Bienvenido</h1>
            <div className="container mb-3">
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-md-4 col-sm-2 text-end col-form-label">Email</label>
                    <div className="col-md-4 col-sm-10">
                    <input type="email" className="form-control" id="inputEmail3"
                            onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-md-4 col-sm-2 text-end col-form-label">Password</label>
                    <div className="col-md-4 col-sm-10">
                    <input type="password" className="form-control" id="inputPassword3"
                            onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                </div>
                <button onClick={login} className="btn btn-primary">Sign in</button>
            </div>

			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
		</div>
	);
};
