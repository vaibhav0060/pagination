import "./styles.css";
// import "./app.css";
import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProduct = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  const selectPageHandle = (selectPage) => {
    if (
      selectPage >= 1 &&
      selectPage <= products.length / 10 &&
      selectPage !== page
    ) {
      setPage(selectPage);
    }
  };
  console.log(products);

  return (
    <div className="App">
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((product) => {
            return (
              <span key={product.id} className="product__single">
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title.slice(0, 20)}</span>
                {/* <div>{product.description}</div>
            <div>{product.price}</div> */}
              </span>
            );
          })}
        </div>
      )}
      <span>
        {products.length > 0 && (
          <div className="pagination">
            <span onClick={() => selectPageHandle(page - 1)}> ⬅️</span>
            {[...Array(Math.ceil(products.length / 10))].map((_, i) => {
              return (
                <span
                  onClick={() => setPage(i + 1)}
                  className={page === i + 1 ? "active_page" : ""}
                >
                  {i + 1}
                </span>
              );
            })}
            <span onClick={() => selectPageHandle(page + 1)}> ➡️</span>
          </div>
        )}
      </span>
    </div>
  );
}
