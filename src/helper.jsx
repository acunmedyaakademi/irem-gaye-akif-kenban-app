import Board from "./components/Board";
import NewBoard from "./components/NewBoard";
import NewColumn from "./components/NewColumn";
import Login from "./Login";

const routers = [
  {
    url: "/",
    component: <Board />,
  },
  {
    url: "/new-board",
    component: <NewBoard />,
  },
  {
    url: "/new-column",
    component: <NewColumn />,
  },
  {
    url: "/login-page",
    component: <Login />,
  },
];

export function getPage(url) {
  return (
    routers.find((router) => router.url === "/" + url.split("/")[1])
      ?.component || <h1>404 Not Found</h1>
  );
}
