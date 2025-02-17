import Suggestions from "./components/Suggestions";
import Roadmap from "./components/Roadmap";
import FeedbackDetail from "./components/FeedbackDetail";
import  NewFeedback  from "./components/NewFeedback";


const routes = [
  { title: "Home", url: "/", component: <Suggestions /> },
  { title: "Roadmap", url: "/roadmap", component: <Roadmap /> },
  { url: "/feedback-detail", component: <FeedbackDetail /> },
  { url: "/roadmap/", component: <Roadmap /> },   
  { title: 'New Feedback', url: '/new-feedback', component: <NewFeedback /> },
];

const notFound = {
  component: <NotFound />,
};

export function getPage(url) {
  const exactPage = routes.find((x) => x.url === url);
  if (exactPage) return exactPage;

  if (url.startsWith("/feedback-detail/")) {
    return { title: "Feedback Detail", component: <FeedbackDetail /> };
  }

  if (url.startsWith("/roadmap/")) {
    return { title: "Roadmap Filtered", component: <Roadmap /> };
  }

  return notFound;
}

function NotFound() {
  return <h1>Bu sayfa bulunamadı.</h1>;
}
