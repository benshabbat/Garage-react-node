import "./swiper.css";
import { useSwiper } from "./useSwiper";

const Swiper = ({ children, numCardsPreview }) => {
  const { Layout } = useSwiper(children, numCardsPreview);

  return (
    <Layout>
      {children}
    </Layout>
  );
};

export default Swiper;
