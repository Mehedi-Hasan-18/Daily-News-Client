import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import apiClient from "../Services/apiClient";
import { CircleLoader } from "react-spinners";
import {
  Calendar,
  Tag,
  ThumbsUp,
  Heart,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Send,
} from "lucide-react";

const ArticlesDetailss = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);

  // Reset states when ID changes
  useEffect(() => {
    setLoadingArticle(true);
    setLoadingRelated(true);
    setArticle(null);
    setRelatedArticles([]);
  }, [id]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoadingArticle(true);
        const res = await apiClient.get(`/popular-articles/${id}`);
        setArticle(res.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoadingArticle(false);
      }
    };
    fetchArticle();
  }, [id]);

  useEffect(() => {
    if (article?.category?.id) {
      const fetchRelatedArticles = async () => {
        try {
          setLoadingRelated(true);
          const res = await apiClient.get(
            `/popular-articles?category=${article.category.id}`
          );

          const allArticles = res.data.results || [];

          const filtered = allArticles
            .filter(
              (a) =>
                a.category.id === article.category.id && a.id !== article.id
            )
            .slice(0, 3);

          setRelatedArticles(filtered);
        } catch (error) {
          console.error("Error fetching related articles:", error);
          setRelatedArticles([]);
        } finally {
          setLoadingRelated(false);
        }
      };
      fetchRelatedArticles();
    }
  }, [article?.category?.id, article?.id]);

  const [reactions, setReactions] = useState({
    likes: 142,
    hearts: 89,
    hasLiked: false,
    hasHearted: false
  });

  // Loading state for main article
  if (loadingArticle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <CircleLoader color="#3b82f6" size={60} />
          <p className="mt-6 text-gray-600 font-medium animate-pulse">
            Loading article...
          </p>
        </div>
      </div>
    );
  }

  // If article failed to load
  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Article not found</p>
        </div>
      </div>
    );
  }

  const formattedDate = (date) => format(new Date(date), "MMM dd yyyy");

  // Split article body into paragraphs
  const paragraphs = article.body.split("\n").filter((p) => p.trim());

  // Function to interleave images with content
  const renderContentWithImages = () => {
    const images = article.images || [];
    const content = [];

    if (images.length <= 1) {
      images.forEach((image, idx) =>
        content.push(
          <img
            key={`img-${idx}`}
            className="w-full h-[400px] sm:h-80 lg:h-[500px] object-cover  mb-8"
            src={image.image}
            alt={`Article image ${idx + 1}`}
          />
        )
      );
      content.push(
        <div key="all-content" className="prose prose-lg max-w-none">
          {paragraphs.map((para, idx) => (
            <p
              key={`para-${idx}`}
              className="mb-4 text-black leading-relaxed"
            >
              {para}
            </p>
          ))}
        </div>
      );
    } else {
      const contentPerImage = Math.ceil(paragraphs.length / images.length);

      images.forEach((image, imgIdx) => {
        const startIdx = imgIdx * contentPerImage;
        const endIdx = Math.min(startIdx + contentPerImage, paragraphs.length);

        if (startIdx < paragraphs.length) {
          content.push(
            <div
              key={`content-${imgIdx}`}
              className="prose prose-lg max-w-none mb-8"
            >
              {paragraphs.slice(startIdx, endIdx).map((para, paraIdx) => (
                <p
                  key={`para-${imgIdx}-${paraIdx}`}
                  className="mb-4 text-black leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>
          );
        }

        content.push(
          <img
            key={`img-${imgIdx}`}
            className="w-full h-[400px] sm:h-80 lg:h-[500px] object-cover  mb-8"
            src={image.image}
            alt={`Article image ${imgIdx + 1}`}
          />
        );
      });

      const remainingStart = images.length * contentPerImage;
      if (remainingStart < paragraphs.length) {
        content.push(
          <div key="remaining-content" className="prose prose-lg max-w-none">
            {paragraphs.slice(remainingStart).map((para, paraIdx) => (
              <p
                key={`para-remaining-${paraIdx}`}
                className="mb-4 text-black leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>
        );
      }
    }

    return content;
  };

  const handleRelatedArticleClick = (articleId) => {
    navigate(`/popular-articles/${articleId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReaction = (type) => {
    if (type === "like") {
      setReactions((prev) => ({
        ...prev,
        likes: prev.hasLiked ? prev.likes - 1 : prev.likes + 1,
        hasLiked: !prev.hasLiked,
      }));
    } else if (type === "heart") {
      setReactions((prev) => ({
        ...prev,
        hearts: prev.hasHearted ? prev.hearts - 1 : prev.hearts + 1,
        hasHearted: !prev.hasHearted,
      }));
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = article.headline;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Hero Image */}
          <div className="relative h-[400px] overflow-hidden">
            <img
              src={article.images[0].image}
              alt={article.headline}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Category Badge on Image */}
            <div className="absolute top-6 left-6">
              <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide shadow-lg">
                <Tag className="w-4 h-4 text-blue-600" />
                {article.category.name}
              </span>
            </div>

            {/* Date Badge */}
            <div className="absolute bottom-6 right-6">
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  {formattedDate(article.created_at)}
                </span>
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-10 pt-8 pb-6">
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
              {article.headline}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {article.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">
                    {article.author.name}
                  </p>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare("facebook")}
                  className="p-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-110 shadow-md"
                  title="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" fill="currentColor" />
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="p-2.5 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-all duration-200 hover:scale-110 shadow-md"
                  title="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" fill="currentColor" />
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="p-2.5 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-all duration-200 hover:scale-110 shadow-md"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" fill="currentColor" />
                </button>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="px-6 sm:px-10 py-8">
            {renderContentWithImages()}
          </div>

          {/* Reactions Bar */}
          <div className="px-6 sm:px-10 py-6 bg-gradient-to-r from-gray-50 to-blue-50/50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleReaction("like")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-200 ${
                    reactions.hasLiked
                      ? "bg-blue-100 text-blue-600 shadow-sm"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <ThumbsUp
                    className={`w-5 h-5 ${
                      reactions.hasLiked ? "fill-current" : ""
                    }`}
                  />
                  <span className="font-semibold">{reactions.likes}</span>
                </button>

                <button
                  onClick={() => handleReaction("heart")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-200 ${
                    reactions.hasHearted
                      ? "bg-red-100 text-red-600 shadow-sm"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      reactions.hasHearted ? "fill-current" : ""
                    }`}
                  />
                  <span className="font-semibold">{reactions.hearts}</span>
                </button>
              </div>

              <div className="text-sm text-gray-500">
                <span>{reactions.likes + reactions.hearts} reactions</span>
              </div>
            </div>
          </div>

          {/* Comments Section */}

          {/* Article Footer */}
          <div className="px-6 sm:px-10 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-500">
                <span className="font-medium">Published:</span> {formattedDate(article.created_at)}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  Share this article
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleShare("facebook")}
                    className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-3.5 h-3.5" fill="currentColor" />
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors"
                  >
                    <Twitter className="w-3.5 h-3.5" fill="currentColor" />
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles Section */}
        <div className="mt-12">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Related News
            </h2>
            <div className="ml-4 flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
          </div>

          {loadingRelated ? (
            <div className="flex flex-col items-center justify-center py-12">
              <CircleLoader color="#3b82f6" size={50} />
              <p className="mt-4 text-gray-600 font-medium animate-pulse">
                Loading related articles...
              </p>
            </div>
          ) : relatedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <div
                  key={relatedArticle.id}
                  onClick={() => handleRelatedArticleClick(relatedArticle.id)}
                  className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedArticle.images[0]?.image}
                      alt={relatedArticle.headline}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold uppercase">
                        {relatedArticle.category.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      {relatedArticle.headline}
                    </h3>

                    <div className="flex items-center text-sm text-gray-500 mt-3">
                      <span className="font-medium">
                        {relatedArticle.author.name}
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        {formattedDate(relatedArticle.publishing_date)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No related articles found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ArticlesDetailss;
