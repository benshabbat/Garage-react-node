import "./swiper.css";
import { useSwiper } from "./utilsReview";

const Swiper = ({ children, numCardsPreview }) => {
  const { Layout } = useSwiper(children, numCardsPreview);

  return (
    <Layout>
      {children}
    </Layout>
  );
};

export default Swiper;
