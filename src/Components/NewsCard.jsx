import DefaultImage from "../assets/Default_Image.webp";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

const NewsCard = ({ article }) => {
  const formattedDate = format(
    new Date(article.created_at),
    "dd MMM yyyy, h:mm a"
  );

  const navigate = useNavigate()

  const handleArticleDetails =(id)=>{
    navigate(`/mustread-articles/${id}`)
  }

  if (!article) return <div>Loading....</div>;
  return (
    <>
      <div onClick={()=>handleArticleDetails(article.id)} className="hover:text-blue-500">
        {article.images?.length ? (
          article.images.map((image, idx) => (
            <img
              key={idx}
              className="w-[296px] h-[197px]"
              src={image?.image}
              alt="Article"
            />
          ))
        ) : (
          <img
            className="w-[296px] h-[197px]"
            src={DefaultImage}
            alt="Default"
          />
        )}

        <p className="text-2xl font-semibold m-4 ml-0">
          {article.headline.slice(0, 50) + "..."}
        </p>
        <p className="bg-black hover:bg-blue-400 p-2 mr-2 mt-3 text-white font-sans font-semibold inline-block">
          {article.category.name}
        </p>
        <br />
        <span className="font-bold font-mono mt-2 m-3 ml-0">
          {article.author.name}{" "}
          <span className="m-2 ml-0">{formattedDate}</span>
        </span>
        <br />

        <Link className="text-red-400 font-semibold " to={""}>
          Read More..
        </Link>
      </div>
    </>
  );
};

export default NewsCard;
