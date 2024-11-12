import "./swiper.css";
import { useSwiper } from "./utilsReview";

const Swiper = ({ children, numCardsPreview }) => {
  const { Slides, Layout } = useSwiper(children, numCardsPreview);

  return (
    <Layout>
      <Slides />
    </Layout>
  );
};

export default Swiper;
