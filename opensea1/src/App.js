import "./App.css";
import { ethers, providers } from "ethers";
import { useState } from "react";
import axios from "axios";

function App() {
  const [account, setAccount] = useState("");
  const [data, setData] = useState([]);
  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let res = await provider.send("eth_requestAccounts", []);
    setAccount(res[0]);
    getData(res[0]);
  };

  const getData = (_account) => {
    const options = { method: "GET" };
    fetch(
      `https://testnets-api.opensea.io/api/v1/assets?owner=${_account}&order_direction=desc&offset=0&limit=20&include_orders=false`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response.assets);
        // console.log(response.assets);
      })
      .catch((err) => console.error(err));
  };
  console.log(data);


  return (
    <div className="App">
      <p>Hello World</p>
      <button onClick={connect}>ConnectButton</button>
      <p>{account}</p>
      {/* <button onClick={getData(account)}>getDataButton</button> */}
      {/* won't work, because account is not being accessed properly. */}
    </div>
  );
}

export default App;

