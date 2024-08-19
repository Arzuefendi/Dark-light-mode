import React from "react";
import { useEffect, useState } from "react";
import "../style/style.css";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import ModeButton from "./ModeButton";
const Todo = () => {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dataLength = data.length;
  const apiKey = process.env.REACT_APP_API_KEY;

  const handleGet = () => {
    axios
      .get(
        "https://hquoflwhjcvprguymunc.supabase.co/rest/v1/Shopping-List?select=*",
        {
          headers: {
            apikey: apiKey,
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  };

  const handleCreateNew = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://hquoflwhjcvprguymunc.supabase.co/rest/v1/Shopping-List",
        {
          list: inputText,
        },
        {
          headers: {
            apikey: apiKey,
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      .then(() => {
        setInputText("");
        handleGet();
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://hquoflwhjcvprguymunc.supabase.co/rest/v1/Shopping-List?id=eq.${id}`,
        {
          headers: {
            apikey: apiKey,
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      .then(() => {
        setData(data.filter((item) => item.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const handleEditClick = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
    setShowModal(true);
  };

  const handleEditList = () => {
    axios
      .patch(
        `https://hquoflwhjcvprguymunc.supabase.co/rest/v1/Shopping-List?id=eq.${editId}`,
        {
          list: editText,
        },
        {
          headers: {
            apikey: apiKey,
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      .then(() => {
        setShowModal(false);
        setEditId(null);
        setEditText("");
        handleGet();
      })
      .catch((error) => console.log(error));
  };
  return (
    <section>
      <h1 className="text-center">LIST</h1>
      <ModeButton />
      <div className="todo">
        <form onSubmit={handleCreateNew}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit">
            <h3>+</h3>
          </button>
        </form>{" "}
        <br />
        <h4 className="text-center">To do list: {dataLength}</h4>
        <ul>
          {data.map((el) => (
            <li className="list" key={el.id}>
              {el.list}
              <MdDelete onClick={() => handleDelete(el.id)} />
              <MdEdit onClick={() => handleEditClick(el.id, el.list)} />
            </li>
          ))}
        </ul>
        {showModal && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-center">Edit</h5>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEditList}
                  >
                    Save changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default Todo;
