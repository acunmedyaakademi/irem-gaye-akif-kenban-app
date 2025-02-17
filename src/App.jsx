import { useEffect, useState } from 'react'
import './App.css'
import "/style/reset.css"


function App() {

  const [data,setData] = useState([])

  useEffect(() => {
    async function getData() {
      const data = await fetch("data/data.json").then((r) => r.json());
      setData(data);
      console.log(data);
    }
    getData();
}, []);

  return (
    <>
      <h1>gaye</h1>
    </>
  )
}

export default App;