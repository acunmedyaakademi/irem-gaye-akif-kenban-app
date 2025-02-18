import { useEffect, useState, createContext } from 'react';
import './App.css';
import "/style/reset.css";
import { getPage } from "./helper";
import { TaskProvider } from "./components/TaskContext";

export const PageContext = createContext();

function App() {
  const [url, setUrl] = useState(location.hash.substring(1) || "/");
  const [activeLink, setActiveLink] = useState(url);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1110);

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
      <TaskProvider>
        <div className="app-container">
          <div className="page">
            <PageContext.Provider value={page}>{page}</PageContext.Provider>
          </div>
        </div>
      </TaskProvider>
    </>
  );
}

export default App;