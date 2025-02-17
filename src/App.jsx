import { useEffect, useState, createContext } from 'react';
import './App.css';
import "/style/reset.css";
import { getPage } from "./helper";

export const DataContext = createContext();
export const PageContext = createContext();

function App() {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(location.hash.substring(1) || "/");
  const [activeLink, setActiveLink] = useState(url);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1110);

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

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1110);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const page = getPage(url);

  return (
    <>
      <div className="app-container">
        <div className="page">
          <DataContext.Provider value={data}>
            <PageContext.Provider value={page}>{page}</PageContext.Provider>
          </DataContext.Provider>
        </div>
      </div>
    </>
  );
}

export default App;