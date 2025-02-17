import { useEffect, useState, createContext } from 'react';
import './App.css';
import "/style/reset.css";
import { getPage } from "./helper";



export const PageContext = createContext();

function App() {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(location.hash.substring(1) || "/");
  const [activeLink, setActiveLink] = useState(url)

  useEffect(() => {
    async function getData() {
      const data = await fetch("data/data.json").then(res => res.json());
      setData(data);
      console.log(data);
    }
    getData();
  }, []);

  useEffect(() => {
    const updateUrl = () => {
      const newUrl = location.hash.substring(1) || "/";
      setUrl(newUrl);
      setActiveLink(newUrl);
    };

    window.addEventListener("hashchange", updateUrl);
    return () => window.removeEventListener("hashchange", updateUrl);
  }, []);

  const page = getPage(url);

  return (
    <>
      <nav>
        <ul>
          <li><a href="#/">Home</a></li>
          <li><a href="#/new-task">New Task</a></li>
          <li><a href="#/new-board">New Board</a></li>
        </ul>
      </nav>

      <div className="app-container">
        <div className="page">
          <PageContext.Provider value={page}>
            {page}
          </PageContext.Provider>
        </div>
      </div>
    </>
  );
}

export default App;