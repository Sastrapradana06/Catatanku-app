import { BsArrowLeft } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setJudulMemo, setTeksMemo, setDay, setTime } from "../App/Features/inputSlice";
import { getDetailMemo } from "../App/Features/memoSlice";

export default function SearchMemo() {
  const [inputUser, setInputUser] = useState("");
  const [memoSearch, setMemoSearch] = useState([]);
  const { memo } = useSelector((state) => state.memo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (inputUser !== "") {
      const filterMemo = memo.filter((teks) => {
        return teks.judulMemo.toLowerCase().includes(inputUser.toLowerCase());
      });
      setMemoSearch(filterMemo);
    } else {
      setMemoSearch([]);
    }
  }, [inputUser, memo]);

  function addDetailMemo(memo) {
    dispatch(setJudulMemo(memo.judulMemo));
    dispatch(setTeksMemo(memo.teksMemo));
    dispatch(getDetailMemo([memo]));
    dispatch(setDay(memo.day));
    dispatch(setTime(memo.time));
  }

  return (
    <div className="absolute page-search z-30 w-full h-[100vh] ">
      <div className="w-full h-[50px] flex justify-around items-center nav-search lg:w-[70%] lg:m-auto">
        <button>
          <Link to="/">
            <BsArrowLeft size={25} />
          </Link>
        </button>
        <input className="bg-[#454545] outline-none w-[250px] p-1 text-[.9rem]  rounded-lg text-white box-border" type="text" placeholder="Cari Memo" value={inputUser} onChange={(e) => setInputUser(e.target.value)} />
        <button>
          <BiSearch size={25} />
        </button>
      </div>
      <div className="mt-2">
        <div className="flex flex-col justify-center items-center gap-3 p-1">
          {memoSearch.length !== 0 ? (
            memoSearch.map((teks) => {
              return (
                <Link to={`memo-detail/${teks.id}`} onClick={addDetailMemo.bind(this, teks)} key={teks.id} className="w-full">
                  <div className="w-[90%] m-auto border h-[100px] rounded-xl bg-card flex justify-between items-center lg:w-[70%] lg:h-[130px]">
                    <div className=" w-[80%] m-auto h-[80%] flex flex-col items-center justify-center">
                      <h1 className="text-[1.2rem] text-orange-400">{teks.judulMemo}</h1>
                      <p className="text-[.7rem]  text-gray-400">
                        {teks.day} | {teks.time}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="w-[90%]  h-[100px] rounded-xl bg-card flex justify-center items-center lg:w-[70%] lg:h-[130px]">
              <h1 className="text-orange-500 italic font-semibold">{inputUser === "" ? "Belum Ada Catatan Yang dicari" : "Catatan Tidak Ditemukan"}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
