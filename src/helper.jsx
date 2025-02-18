import Board from "./components/Board";
import Detail from "./components/Detail";
import NewBoard from "./components/NewBoard";
import NewColumn from "./components/NewColumn";
import NewTask from "./components/NewTask";


const routers = [
  {
    url: "/",
    component: <Board />,
  },
  {
    url: "/new-task",
    component: <NewTask />,
  },
  {
    url: "/new-board",
    component: <NewBoard />,
  },
  {
  url: "/detail",
  component: <Detail />,
  },
  {
    url: "/new-column",
    component: <NewColumn />,
    },
  
];

export function getPage(url) {
  return routers.find((router) => router.url === "/" + url.split("/")[1])?.component || <h1>404 Not Found</h1>
}
