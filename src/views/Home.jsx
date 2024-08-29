import Card from "../components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import pacmanLoad from "../assets/Bean-Eater@1x-1.0s-200px-200px.svg";

export default function Home({ url }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState('id'); 
  const [sortOrder, setSortOrder] = useState('ASC');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]); 
  const [page, setPage] = useState(1); 
  const itemsPerPage = 10; 

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${url}/apis/pub/branded-things/products?q=${search}&categories=${category}&limit=${itemsPerPage}&page=${page}&sort=${sortOrder}&column=${sortColumn}`);
      setProducts(data.data.query);
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${url}/apis/pub/branded-things/categories`);
      setCategories(data.data); 
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [search, sortColumn, sortOrder, category, page]);

  useEffect(() => {
    fetchCategories();
  }, []); 

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  return (
    <>
      <div id="PAGE-HOME" className="p-3">
        <form action="" method="get" className="flex justify-center mt-4">
          <input
            type="search"
            name="search"
            placeholder="search"
            className="w-1/2 p-2 border border-gray-300 rounded-full"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="flex justify-center mt-4">
          <label htmlFor="sortColumn" className="mr-2">Sort By:</label>
          <select
            id="sortColumn"
            className="p-2 border border-gray-300 rounded-full"
            value={sortColumn}
            onChange={(e) => setSortColumn(e.target.value)}
          >
            <option value="id">ID</option>
            <option value="title">Title</option>
            <option value="date">Date</option>
          </select>

          <select
            id="sortOrder"
            className="p-2 border border-gray-300 rounded-full ml-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>

          <label htmlFor="category" className="ml-4 mr-2">Category:</label>
          <select
            id="category"
            className="p-2 border border-gray-300 rounded-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="mt-32 flex justify-center items-center">
            <img src={pacmanLoad} />
          </div>
        ) : (
          <>
            <main className="grid grid-cols-3 gap-5 px-10 my-8 bg-white">
              {products.map(product => {
                return <Card key={product.id} product={product} />
              })}
            </main>
            <div className="flex justify-center mt-4">
              <button 
                className="p-2 border border-gray-300 rounded-full mx-2"
                onClick={handlePreviousPage}
                disabled={page === 1}
              >
                Previous
              </button>
              <span className="p-2">{page}</span>
              <button 
                className="p-2 border border-gray-300 rounded-full mx-2"
                onClick={handleNextPage}
                disabled={products.length < itemsPerPage}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
