import Hero from "../Components/Hero";
import MustRead from "../Components/MustRead";
import PopularNews from "../Components/PopularNews";
import VideoNews from "../Components/VideoNews";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <MustRead></MustRead>
      <VideoNews></VideoNews>
      <PopularNews></PopularNews>
    </div>
  );
};

export default Home;
