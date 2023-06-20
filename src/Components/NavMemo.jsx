import { setTeksMemo } from "../App/Features/inputSlice";
import { getMemo } from "../App/Features/memoSlice";

import { RiCheckLine, RiArrowGoBackLine, RiArrowGoForwardFill } from "react-icons/ri";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import { generateRandomId } from "../App/Constanta";

import { useSelector, useDispatch } from "react-redux";

export default function NavMemo({ isInputFocused }) {
  const [deletedValue, setDeletedValue] = useState("");

  const { judulMemo, teksMemo, day, time } = useSelector((state) => state.input);
  const { memo } = useSelector((state) => state.memo);
  const dispatch = useDispatch();

  function addMemo() {
    const newID = generateRandomId();
    dispatch(
      getMemo([
        {
          id: newID,
          judulMemo,
          teksMemo,
          day,
          time,
        },
        ...memo,
      ])
    );
  }

  function handleDeleted() {
    const updatedValue = teksMemo.substring(0, teksMemo.length - 1);
    const deletedText = teksMemo.slice(teksMemo.length - 1);
    dispatch(setTeksMemo(updatedValue));
    setDeletedValue((prevDeletedValue) => deletedText + prevDeletedValue);
  }

  function handleUndo() {
    const newTeksMemo = teksMemo + deletedValue;
    dispatch(setTeksMemo(newTeksMemo));
    setDeletedValue("");
  }

  return (
    <div className=" mt-4">
      <div className=" w-[90%] m-auto h-[30px] flex justify-between items-center">
        <div className=" flex items-center">
          <button>
            <Link to="/">
              <BsArrowLeft size={25} />
            </Link>
          </button>
        </div>
        <div className="flex gap-4">
          <button onClick={handleDeleted} className={`${isInputFocused ? "hidden" : ""}`}>
            <RiArrowGoBackLine size={20} color={memo === "" ? "gray" : "white"} />
          </button>
          <button onClick={handleUndo} className={`${isInputFocused ? "hidden" : ""}`}>
            <RiArrowGoForwardFill size={20} color={deletedValue === "" ? "gray" : "white"} />
          </button>
          {teksMemo === "" || judulMemo === "" ? (
            <button>
              <RiCheckLine size={25} color="gray" />
            </button>
          ) : (
            <button type="submit" onClick={addMemo}>
              <Link to="/">
                <RiCheckLine size={25} color="white" />
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
