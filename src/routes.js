import ShowPage from "./components/ShowPage";
import AdminPage from "./pages/AdminPage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import NotFoundPage from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/blogs",
    element: <ListPage />,
  },
  /** 이하 auth: true
   * auth: true 라우트 아래에 auth: false 라우트가 있으면 auth: true로 인식하는 현상이 있음. 2023.7.26
   */
  {
    path: "/blogs/create",
    element: <CreatePage />,
    auth: true,
  },
  {
    path: "/blogs/:id/edit",
    element: <EditPage />,
    auth: true,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    auth: true,
  },
  {
    path: "/blogs/:id",
    element: <ShowPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
