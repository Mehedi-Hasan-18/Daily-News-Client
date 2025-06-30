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

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Main></Main>}>
        <Route path="/" element={<Home />} />
        <Route path="categories" element={<Category />} />
        <Route path="/categories/:id/article" element={<ArticleByCategory />} />
        <Route path="/articles/:id/" element={<ArticlesDetailss />} />
        <Route path="/mustread-articles/:id/" element={<ArticlesDetails />} />
        <Route path="/dontmiss-articles/:id/" element={<DontMissArticleDetails />} />
        <Route path="/popular-articles/:id/" element={<PopularNewsDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
