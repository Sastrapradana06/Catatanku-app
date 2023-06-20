import { TbNotes } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetailMemo } from "../App/Features/memoSlice";
import { setJudulMemo, setTeksMemo} from "../App/Features/inputSlice";

// import { Link } from "react-router-dom";
export default function Semua() {
  const {memo} = useSelector((state) => state.memo)
  const dispatch = useDispatch()
  // console.log(detailMemo);

  function addDetailMemo(memo) {
    dispatch(setJudulMemo(memo.judulMemo))
    dispatch(setTeksMemo(memo.teksMemo))
    dispatch(getDetailMemo([memo]))
  }

  function resetMemo() {
    dispatch(setJudulMemo(''))
    dispatch(setTeksMemo(''))
  }

  return (
    <div className="">
      <div className="p-2 flex flex-col gap-3 w-[95%] m-auto">
        {memo.length === 0 ? (
          <p className="text-center">Buat Catatn Anda!!</p>
        ) : (
          memo.map((teks, i) => {
            return (
              <Link to={`memo-detail/${teks.id}`} key={i} onClick={addDetailMemo.bind(this, teks)}>
                <div className="h-[100px] rounded-xl bg-card flex items-center justify-between">
                  <div className="p-3">
                    <h1 className="text-[1.3rem]">{teks.judulMemo}</h1>
                    <p className="text-gray-400 mt-1 text-[.8rem]">{teks.day}</p>
                  </div>
                  <div className=" mt-9 p-1">
                    <p className="text-[.8rem] text-gray-400">{teks.time}</p>
                  </div>
                </div>
              </Link>
            )
          })
        )}
      </div>
      <div className="fixed bottom-0 w-full h-max p-1 bg-[#2B2730]">
        <div className="w-[50%] m-auto h-full flex flex-col items-center justify-center">
          <button onClick={resetMemo}>
            <Link to='/tulismemo'>
                <TbNotes size={35} />
            </Link>
          </button>
          <p className="text-[.8rem]">Buat memo baru</p>
        </div>
      </div>
    </div>
  );
}
