import axios from 'axios';
import { useState } from "react";
import { IData } from './data_model';
function App() {
    const [data, setData] = useState<IData>();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSuccess = (data: IData) => {
        return (
            <>
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
                            <tr>
                                <td>1</td>
                                <td>Hepsiburada</td>
                                <td>Bebek Bezi</td>
                                <td>102.99</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Trendyol</td>
                                <td>Bebek Bezi</td>
                                <td>120.25</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        );

    };

    const handleError = (err: string) => {
        console.log(`Error: ${err}`);
    };

    const handleClick = async () => {
        setLoading(true);
        await axios
            .post("http://localhost:8000/search/")
            .then(res => handleSuccess(res.data))
            .catch(err => handleError(err));
        setLoading(false);
    };

    return (
        <>
            <div className='main'>
                <div >
                    <h1 className='header'>Compare Price</h1>
                    <div className="searchbar">
                        <div className="search">
                            <input type="text" placeholder="Enter your product" className="search_input" />
                            <button className="search_button" onClick={handleClick}>Search</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default App;
