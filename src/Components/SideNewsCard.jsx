import React from "react";
import A from "../assets/A.jpg";
import { format } from "date-fns";
import { useNavigate} from "react-router-dom";

const SideNewsCard = ({article}) => {
  const navigate = useNavigate()
  const handleClick =(id)=>{
    navigate(`/dontmiss-articles/${id}`)
  }
  if(!article) return <div>Loading.........</div>
  const formattedDate = format(new Date(article.created_at), "MMM dd,");
  return (
    <div onClick={()=>handleClick(article.id)} className="flex mt-8">
      {article.images?.map(image=><img className="w-36 mr-5" src={image?.image} />)}
      <div>
        <p className="text-xl font-semibold m-2 ml-0">
          {article.headline.slice(0,40)+"..."}
        </p>
        <span className="bg-black hover:bg-blue-400 p-2 mr-2 mt-3 text-white font-sans font-semibold">
          {article.category.name}
        </span>
        <span className="font-bold font-mono m-3 ml-0">{formattedDate}</span>
      </div>
    </div>
  );
};

export default SideNewsCard;
