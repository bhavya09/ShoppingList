import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [food, setFood] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  const [bucketList, setBucketList] = useState([]);

  const handleInput = (e) => {
    console.log(e.target.value);
    setFood(e.target.value);
  };

  const fetchItems = async (food) => {
    const url = `https://api.frontendeval.com/fake/food/${food}`;

    const result = await fetch(url);
    const data = await result.json();
    setShoppingList(data);

    console.log("data 1", data);
  };

  const handleShoppingList = (e) => {
    console.log("bhavya ", e.target.getAttribute("data-id"));
    let idx = e.target.getAttribute("data-id");

    if (idx) {
      let obj = {
        id: Date.now(),
        data: shoppingList[idx],
        isDone: false,
      };

      const copyBucketList = [...bucketList];
      copyBucketList.push(obj);
      setBucketList(copyBucketList);
    }
    setFood("");
  };

  const handleRightClick = (id) => {
    const copyBucketList = [...bucketList];
    const newBucketList = copyBucketList.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    setBucketList(newBucketList);
  };

  const handleDelete = (id) => {
    const copyBucketList = [...bucketList];
    const newList = copyBucketList.filter((item) => item.id !== id);
    setBucketList(newList);
  };

  console.log("bucketList", bucketList);

  useEffect(() => {
    if (food.length >= 2) {
      fetchItems(food);
    }
  }, [food]);

  return (
    <div className="App">
      <h1>My Shopping List</h1>

      {/* input */}

      <div>
        <input value={food} onChange={handleInput} />
      </div>

      {/* autosuggestion */}

      {food.length >= 2 && (
        <div className="shopping-list" onClick={handleShoppingList}>
          {shoppingList.map((item, index) => {
            return (
              <div data-id={index} className="product">
                {item}
              </div>
            );
          })}
        </div>
      )}

      {/* bucket list */}

      <div className="bucket">
        {bucketList.map(({ data, id, isDone }) => {
          return (
            <div className="shopping-item">
              <button onClick={() => handleRightClick(id)}>✔</button>
              <div className={isDone && "strik"}>{data}</div>
              <button onClick={() => handleDelete(id)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
