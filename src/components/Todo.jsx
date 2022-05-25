import React, { useState } from 'react';

const Todo = () => {
  const [inputData, setinputData] = useState('');
  //   const [inputData, setinputData] = useState('');
  const [items, setitems] = useState([]);

  const [toggleSubmit, settoggleSubmit] = useState(true);
  const [isEditItem, setisEditItem] = useState(null);

  const handleInput = (e) => {
    setinputData(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputData) {
    } else if (inputData && !toggleSubmit) {
      setitems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setinputData('');
      settoggleSubmit(true);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setitems([...items, allInputData]);
      setinputData('');
    }
  };

  const handleDelete = (index) => {
    console.log(index);

    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    setitems(updatedItems);
  };

  const handleEdit = (id) => {
    settoggleSubmit(false);
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setinputData(newEditItem.name);

    setisEditItem(id);
    console.log(newEditItem);
  };
  return (
    <>
      <div className="container py-2">
        <div className="row">
          <div className="col-12 d-flex justify-content-between">
            <div className="left">Tasker</div>
            <div className="right">login</div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h2>Add Todo</h2>
      </div>
      <div className="container d-flex justify-content-center">
        <div className="row">
          <form className="col-10 p-2" onSubmit={handleSubmit}>
            <label htmlFor="title" className="my-2">
              Enter Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="title"
              className="w-100 my-1"
              onChange={handleInput}
              value={inputData}
            />
            {/* <label className="my-2" htmlFor="description">
              Enter Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              className="w-100 my-1"
              //   onChange={handleInput}
              //   value={description}
            /> */}
            {/* <div className="text-center"> */}
            {toggleSubmit ? (
              <button className="btn btn-primary my-2">Submit</button>
            ) : (
              <button className="btn btn-primary my-2">Edit</button>
            )}
            {/* </div> */}
          </form>
        </div>
      </div>

      <div className="container py-2 ">
        {items.map((elem) => {
          return (
            <div className="row border rounded my-3 p-2" key={elem.id}>
              <div className="col-12 d-flex justify-content-between">
                <div>
                  <h4>{elem.name}</h4>
                  {/* <h6>description</h6> */}
                </div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => handleEdit(elem.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDelete(elem.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Todo;
