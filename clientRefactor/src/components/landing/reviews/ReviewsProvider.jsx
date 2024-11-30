import { ReviewsContext } from "./ReviewsContext";

export default function ReviewsProvider({children}) {

    const value={

    }
  return (
    <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
  )
}
