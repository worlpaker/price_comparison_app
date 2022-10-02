import { useState } from "react";
import axios from "axios";
import { IData, IProduct } from "./data_model";

function App() {
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showdata, setShowdata] = useState<boolean>(false);
  const [data, setData] = useState<IData[]>();
  const DataTable = () => {
    return (
      <>
        {loading &&
          <div style={{ display: "flex", position: "relative", justifyContent: "center", alignItems: "center", paddingTop: "10px" }} >
            <h1>Loading..</h1>
          </div>
        }
        {!loading && showdata &&
          <div className='table-content'>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Website</th>
                  <th>Product</th>
                  <th>Price (TL)</th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.map((data: IData, index: number) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td><a href={data.url}>{data.website}</a></td>
                      <td>{data.product}</td>
                      <td>{data.price}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        }
      </>
    );

  };
  const handleClick = async () => {
    setLoading(true);
    await axios
      .post("/api/search", product)
      .then(res => ((setData(res.data), setShowdata(true))))
      .catch(err => handleError(err));
    setLoading(false);
  };


  const handleError = (err: string) => {
    console.log(`Error: ${err}`);
    alert("Error: Something went wrong.");
  };

  const getProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ product: e.target.value });
  };

  return (
    <>
      <div className='main'>
        <div>
          <h1 className='header'>Compare Price</h1>
          <div className="searchbar">
            <div className="search">
              <input type="text" placeholder="Enter your product" className="search_input" onChange={getProduct} />
              <button className="search_button" onClick={product && !loading ? handleClick : () => (console.log("Error"))}>Search</button>
            </div>
          </div>
        </div>
      </div>
      <DataTable />

    </>
  );
}

export default App;
