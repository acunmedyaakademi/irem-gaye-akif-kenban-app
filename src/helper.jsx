import Board from "./components/Board";
import Detail from "./components/Detail";
import NewBoard from "./components/NewBoard";
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
];

export function getPage(url) {
  return routers.find((router) => router.url === "/" + url.split("/")[1])?.component || <h1>404 Not Found</h1>
}
