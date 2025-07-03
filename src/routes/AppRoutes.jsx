import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import Category from "../Components/Category/Category";
import ArticleByCategory from "../Components/Category/ArticleByCategory";
import ArticlesDetails from "../Pages/ArticlesDetails";
import DontMissArticleDetails from "../Pages/DontMissArticleDetails";
import PopularNewsDetails from "../Pages/PopularNewsDetails";
import ArticlesDetailss from "../Pages/ArticleDetailss";
import LatestNewsArticle from "../Components/LatestNewsArticle";
import Registration from "../Pages/Registration";
import AccountActivate from "../Components/AccountActivate";
import Login from "../Pages/Login";
import PrivateRoute from "../Components/PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import AddNews from "../Components/AddNews";
import AddCategory from "../Components/AddCategory";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Main></Main>}>
        <Route path="/" element={<Home />} />
        <Route path="categories" element={<Category />} />
        <Route path="/categories/:id/article" element={<ArticleByCategory />} />
        <Route path="/articles/:id/" element={<ArticlesDetailss />} />
        <Route path="/mustread-articles/:id/" element={<ArticlesDetails />} />
        <Route
          path="/dontmiss-articles/:id/"
          element={<DontMissArticleDetails />}
        />
        <Route path="/popular-articles/:id/" element={<PopularNewsDetails />} />
        <Route path="/latest/" element={<LatestNewsArticle />} />
        <Route path="register" element={<Registration></Registration>} />
        <Route
          path="activate/:uid/:token"
          element={<AccountActivate></AccountActivate>}
        />
        <Route path="login" element={<Login></Login>} />
      </Route>
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout></DashboardLayout>
          </PrivateRoute>
        }
      >
        <Route path="news/add" element={<AddNews></AddNews>}></Route>
        <Route path="categories/add" element={<AddCategory></AddCategory>}></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
