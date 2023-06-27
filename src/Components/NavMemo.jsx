import { setTeksMemo } from "../App/Features/inputSlice";
import { getMemo, getDetailMemo, getBookMark } from "../App/Features/memoSlice";

import { RiCheckLine, RiArrowGoBackLine, RiArrowGoForwardFill, RiDeleteBin6Line } from "react-icons/ri";
import { BsArrowLeft, BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { generateRandomId, getDate, filterOutItemById, filterItemById, saveItemTolocalStorage } from "../App/Constanta";

import { useSelector, useDispatch } from "react-redux";

export default function NavMemo({ isInputFocused }) {
  const [deletedValue, setDeletedValue] = useState("");
  const [isBookMark, setIsBookMark] = useState(false)

  const { judulMemo, teksMemo, day, time } = useSelector((state) => state.input);
  const { memo, detailMemo, bookMark } = useSelector((state) => state.memo);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    const filterBookMark = filterItemById(id, bookMark)
    if(filterBookMark.length !== 0) {
      setIsBookMark(true)
    } else {
      setIsBookMark(false)
    }

    const savedMemo = localStorage.getItem('memo');
    const parsedMemo = JSON.parse(savedMemo);
    console.log({parsedMemo, memo});

  }, [bookMark, id, memo])

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
      localStorage.clear()
      const filterMemo = filterOutItemById(id, memo)
      dispatch(getMemo([newTeksMemo, ...filterMemo]))
      saveItemTolocalStorage('memo', [newTeksMemo, ...filterMemo])

      const filterIdBookMark = filterItemById(id, bookMark)

      if(filterIdBookMark.length !== 0) {
        const newTeksMemoBookMark = {
          id: detailMemo[0].id,
          judulMemo,
          teksMemo,
          day: detailMemo[0].day,
          time: detailMemo[0].time,
          aksi: false
        }
        const filteredBookMark = filterOutItemById(id, bookMark)
        dispatch(getBookMark([newTeksMemoBookMark, ...filteredBookMark]))
        saveItemTolocalStorage('bookMark', [newTeksMemoBookMark, ...filteredBookMark])

      }
    
      dispatch(getDetailMemo([]))
      return false
    }
    
    const newMemo = {
      id: newID,
      judulMemo,
      teksMemo,
      day,
      time,
      aksi: false
    };
  
    dispatch(getMemo([newMemo, ...memo]));
    saveItemTolocalStorage('memo', [newMemo, ...memo])
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
      const newMemo = filterOutItemById(id, memo)
      dispatch(getMemo(newMemo))
      saveItemTolocalStorage('memo', newMemo)

      const filteredBookMark = filterOutItemById(id, bookMark)
      dispatch(getBookMark(filteredBookMark))
      saveItemTolocalStorage('bookMark', filteredBookMark)
      dispatch(getDetailMemo([]))
  }

  function addBookMark() {
    if(isBookMark) {
      const filteredBookMark = filterOutItemById(id, bookMark)
      dispatch(getBookMark(filteredBookMark))
      saveItemTolocalStorage('bookMark', filteredBookMark)
      setIsBookMark(false)
      return false
    }

    const newBookMark = detailMemo[0]
    dispatch(getBookMark([newBookMark, ...bookMark]))
    saveItemTolocalStorage('bookMark', [newBookMark, ...bookMark])
    setIsBookMark(true)
  }

  return (
    <div className=" mt-4">
      <div className=" w-[90%] m-auto h-[30px] flex justify-between items-center lg:w-[70%]">
        <div className=" flex items-center">
        <button onClick={() => dispatch(getDetailMemo([]))}>
            <Link to="/">
              <BsArrowLeft size={25} />
            </Link>
          </button>
        </div>
        <div className="flex gap-4 lg:gap-6">
          {detailMemo.length !== 0 && 
          <div className="flex gap-4">
              <button onClick={addBookMark}>
                  {!isBookMark ? (
                    <BsBookmarkStar size={23}/>
                  ) : (
                    <BsBookmarkStarFill size={23} color="orange" />
                  )}
              </button>
              <button onClick={deletedMemo}>
                <Link to='/'>
                  <RiDeleteBin6Line size={25} color="crimson"/>
                </Link>
              </button>
          </div>
          } 
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
