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
import Dashbord from "../Pages/Dashbord";
import ArticleEditForm from "../Components/ArticleEditForm";
import AuthorEditForm from "../Components/AuthorEditForm";
import CategoryEditForm from "../Components/CategoryEditForm";
import AddAuthors from "../Components/AddAuthors";
import ContactUs from "../Components/ContactUs";
import About from "../Components/About";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Main></Main>}>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs/>} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/categories/:id/article" element={<ArticleByCategory />} />
        <Route path="/articles/:id/" element={<ArticlesDetailss />} />
        <Route path="/mustread-articles/:id/" element={<ArticlesDetails />} />
        <Route
          path="/dontmiss-articles/:id/"
          element={<DontMissArticleDetails />}
        />
        <Route path="/popular-articles/:id/" element={<PopularNewsDetails />} />
        <Route path="/latest" element={<LatestNewsArticle />} />
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
        <Route path="/dashboard" element={<Dashbord></Dashbord>} />
        <Route path="article/edit/:id/" element={<ArticleEditForm />} />
        <Route path="authors/edit/:id/" element={<AuthorEditForm />} />
        <Route path="categories/edit/:id/" element={<CategoryEditForm />} />
        <Route path="news/add" element={<AddNews />} />
        <Route path="category/add" element={<AddCategory />} />
        <Route path="author/add" element={<AddAuthors />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
