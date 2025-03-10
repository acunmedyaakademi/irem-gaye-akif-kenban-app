import { useEffect, useState, createContext } from "react";
import "./App.css";
import "/style/reset.css";
import { getPage } from "./helper";
import { TaskProvider } from "./components/TaskContext";
import { ThemeProvider } from "./components/ThemeContext"; // tema için olan provider
import Login from "./Login";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gpkftyapxtztltvehqbb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwa2Z0eWFweHR6dGx0dmVocWJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MTkzNjQsImV4cCI6MjA1NjM5NTM2NH0.PgVExJyOvSmz3eIgLAmDqyKSU5LQauoFFiB_HJz5h6M"
);

export const PageContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [url, setUrl] = useState(location.hash.substring(1) || "/");
  const [activeLink, setActiveLink] = useState(url);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1110);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    };

    checkUser();
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
      <ThemeProvider>
        <TaskProvider>
          <div className="app-container">
            <div className="page">
              {!isLogin ? (
                <Login setIsLogin={setIsLogin} />
              ) : (
                <PageContext.Provider value={page}>{page}</PageContext.Provider>
              )}
            </div>
          </div>
        </TaskProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
