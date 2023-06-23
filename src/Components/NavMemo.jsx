import { setTeksMemo } from "../App/Features/inputSlice";
import { getMemo, getDetailMemo } from "../App/Features/memoSlice";

import { RiCheckLine, RiArrowGoBackLine, RiArrowGoForwardFill, RiDeleteBin6Line } from "react-icons/ri";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { generateRandomId, getDate } from "../App/Constanta";

import { useSelector, useDispatch } from "react-redux";

export default function NavMemo({ isInputFocused }) {
  const [deletedValue, setDeletedValue] = useState("");

  const { judulMemo, teksMemo, day, time } = useSelector((state) => state.input);
  const { memo, detailMemo } = useSelector((state) => state.memo);
  const dispatch = useDispatch();

  const { id } = useParams();
  // console.log({memo, detailMemo});

  function addMemo() {
    const newID = generateRandomId();
    const {dayNow, timeNow} = getDate()


    if(id) {
      const newTeksMemo = {
        id: detailMemo[0].id,
        judulMemo,
        teksMemo,
        day: detailMemo[0].day,
        time: detailMemo[0].time,
        aksi: {
          isEdit: true,
          dayNow,
          timeNow
        }
      }

      const filterMemo = memo.filter((element) => {
        return id != element.id
      })
      
      const newMemo = [newTeksMemo, ...filterMemo];
      dispatch(getMemo(newMemo))
      dispatch(getDetailMemo([]))
      return false
    }

    dispatch(
      getMemo([
        {
          id: newID,
          judulMemo,
          teksMemo,
          day,
          time,
          aksi: false
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

  function deletedMemo() {
      const newMemo = memo.filter((teks) => {
        return id != teks.id
      }) 
      dispatch(getMemo(newMemo))
      dispatch(getDetailMemo([]))
  }

  return (
    <div className=" mt-4">
      <div className=" w-[90%] m-auto h-[30px] flex justify-between items-center">
        <div className=" flex items-center">
        <button onClick={() => dispatch(getDetailMemo([]))}>
            <Link to="/">
              <BsArrowLeft size={25} />
            </Link>
          </button>
        </div>
        <div className="flex gap-4">
          {detailMemo.length !== 0 && (
            <button onClick={deletedMemo}>
              <Link to='/'>
                <RiDeleteBin6Line size={25} color="crimson"/>
              </Link>
            </button>
          )} 
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
