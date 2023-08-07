import { TbNotes } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetailMemo, setIsBtnEdit, setSelectedId, getMemo,getBookMark } from "../App/Features/memoSlice";
import { setJudulMemo, setTeksMemo, setDay, setTime } from "../App/Features/inputSlice";
import { useEffect } from "react";
import { saveItemTolocalStorage } from "../App/Constanta";

export default function Semua() {
  const { memo, isBtnEdit, selectedId, bookMark } = useSelector((state) => state.memo);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedMemo = localStorage.getItem('memo');
    const parsedMemo = JSON.parse(savedMemo);
    if(savedMemo) {
      dispatch(getMemo(parsedMemo));
    } else {
      dispatch(getMemo([]));
    }
  }, [dispatch]);

  function addDetailMemo(memo) {
    dispatch(setJudulMemo(memo.judulMemo));
    dispatch(setTeksMemo(memo.teksMemo));
    dispatch(getDetailMemo([memo]));
    dispatch(setDay(memo.day));
    dispatch(setTime(memo.time));
  }

  function resetMemo() {
    dispatch(setJudulMemo(""));
    dispatch(setTeksMemo(""));
  }

  function editRemoveMemo(id) {
    const isSelected = selectedId.includes(id);

    if (isSelected) {
      const updatedIds = selectedId.filter(selectedIds => selectedIds !== id);
      dispatch(setSelectedId(updatedIds));
    } else {
      dispatch(setSelectedId([...selectedId, id]));
    }
  }

  function updateMemo() {
    const filterIdMemo = memo.filter(objek => !selectedId.includes(objek.id));
    const filterIdBookMark = bookMark.filter(objek => !selectedId.includes(objek.id));
    dispatch(getMemo(filterIdMemo))
    saveItemTolocalStorage('memo', filterIdMemo)
    dispatch(getBookMark(filterIdBookMark))
    saveItemTolocalStorage('bookMark', filterIdBookMark)
    dispatch(setIsBtnEdit(false))
  }

  return (
    <div className="">
      <div className="p-2 flex flex-col gap-3 w-[95%] m-auto pb-20 lg:w-[70%]">
        {memo.length === 0 ? (
          <p className="text-center">Buat Catatan Anda!!</p>
        ) : (
          memo.map((teks) => {
            return (
              <div className="" key={teks.id}>
                {isBtnEdit ? (
                  // <CheckboxInput />
                  <button>
                    <input type="checkbox" onClick={editRemoveMemo.bind(this , teks.id)}/>
                  </button>
                ): null}
                <Link to={`memo-detail/${teks.id}`} onClick={addDetailMemo.bind(this, teks)}>
                  <div className="h-[100px] rounded-xl bg-card flex items-center justify-between lg:h-[130px]">
                    <div className="p-3 w-[70%]">
                      <h1 className="text-[1.3rem] h-[30px] overflow-hidden w-[100%]">{teks.judulMemo}</h1>
                      <p className="text-gray-400 mt-1 text-[.8rem]">{teks.day}</p>
                    </div>
                    <div className=" p-1 h-[60px] flex flex-col justify-between items-end mr-2">
                      {teks.aksi ? (
                        <p className="-mt-4 italic text-[.7rem] text-gray-500">
                          Diperbarui {teks.aksi.dayNow}, {teks.aksi.timeNow}
                        </p>
                      ) : (
                        <p></p>
                      )}
                      <p className="text-[.8rem] text-gray-400">{teks.time}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
      <div className="fixed bottom-0 w-full h-[62px]  bg-[#2B2730] nav-bottom-semua">
        {isBtnEdit ? (
          <div className="w-[50%] m-auto flex items-center justify-between nav-bottom-edit mt-5">
            <button onClick={updateMemo}>Hapus</button>
            <button onClick={() => dispatch(setIsBtnEdit(false))}>Batal</button>
          </div>
        ) : (
          <div className="w-[50%] m-auto flex mt-2 flex-col items-center justify-center nav-bottom-tulis">
            <button onClick={resetMemo}>
              <Link to="/tulismemo">
                <TbNotes size={35} />
              </Link>
            </button>
            <p className="text-[.8rem]">Buat memo baru</p>
          </div>    
        )}
      </div>
    </div>
  );
}
