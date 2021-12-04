import "./styles.css";
import { useState, useEffect } from "react";

function MainPage() {
  const [name, updateName] = useState("");
  const [log, updateLogin] = useState();
  const [url, updateUrl] = useState();
  const [followers, updateFollowers] = useState();
  const [following, updateFollowing] = useState();
  const [repo, updateRepo] = useState();
  const [error, updateError] = useState();

  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((Response) => Response.json())
      .then((data) => show(data));
  }, []);

  function handleClick() {
    fetch(`https://api.github.com/users/${name}`)
      .then((rsp) => rsp.json())
      .then((data) => {
        if (data.message) {
          updateError(data.message);
        } else {
          show(data);
          updateError(null);
        }
      });
  }

  function show({ login, avatar_url, followers, following, public_repos }) {
    updateLogin(login);
    updateUrl(avatar_url);
    updateFollowers(followers);
    updateFollowing(following);
    updateRepo(public_repos);
  }
  return (
    // <div style={{ margin: "auto", width: "50%" }}>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <div className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Enter_User_Name"
              aria-label="Search"
              onChange={(event) => {
                updateName(event.target.value);
              }}
            />
            <button className="btn btn-outline-success" onClick={handleClick}>
              Search
            </button>
          </div>
        </div>
      </nav>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <div className="card" style={{ width: "18rem" }}>
          <img src={url} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{log}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{followers} :- followers</li>
            <li className="list-group-item">{following} :- followings</li>
            <li className="list-group-item">{repo} : - public_repos</li>
          </ul>
          <div className="card-body"></div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}
