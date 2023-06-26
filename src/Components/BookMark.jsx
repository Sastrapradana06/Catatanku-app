import { useSelector, useDispatch } from "react-redux"
import { BsBookmarkStarFill } from "react-icons/bs";
import { getDetailMemo } from "../App/Features/memoSlice";
import { setJudulMemo, setTeksMemo, setDay, setTime } from "../App/Features/inputSlice";
import { Link } from "react-router-dom";

export default function BookMark() {
    const {bookMark} = useSelector((state) => state.memo)
    const dispatch = useDispatch()
    // console.log({bookMark, detailMemo});

    function addDetailMemo(memo) {
        dispatch(setJudulMemo(memo.judulMemo));
        dispatch(setTeksMemo(memo.teksMemo));
        dispatch(getDetailMemo([memo]));
        dispatch(setDay(memo.day));
        dispatch(setTime(memo.time));
    }

    return (
        <div className=" w-full">
            <div className=" w-[95%] m-auto flex flex-col items-center justify-center gap-3 p-2">
                {bookMark.length === 0 ? (
                    <div className="text-center ">
                        <h1>Tidak Ada Catatan Yang Anda Simpan</h1>
                    </div>
                ) : (
                    bookMark.map((teks) => {
                        return (
                        <Link to={`/bookMark/memo-detail/${teks.id}`} key={teks.id} onClick={addDetailMemo.bind(this, teks)} className="w-full">
                            <div className="border flex justify-between items-center h-[100px] bg-card rounded-xl" > 
                                <div className="p-3">
                                    <h1 className="text-[1.3rem]">{teks.judulMemo}</h1>
                                    <p className="text-gray-400 mt-1 text-[.8rem]">{teks.day}</p>
                                </div>
                                <div className=" p-1 h-[60px] flex flex-col justify-between items-end mr-2">
                                    <button>
                                        <BsBookmarkStarFill size={23} color="orange" />
                                    </button>
                                    <p className="text-gray-400 mt-1 text-[.8rem]">{teks.time}</p>
                                </div>
                            </div>
                        </Link>
                        )
                    })
                )}
            </div>
        </div>
    )
}