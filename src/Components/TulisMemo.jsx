import { useEffect, useRef, useState } from "react";
import NavMemo from "./NavMemo";
import { useSelector, useDispatch } from "react-redux";
import { setJudulMemo, setTeksMemo, setDay, setTime } from "../App/Features/inputSlice";

export default function TulisMemo() {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const textareaRef = useRef(null);
  const textareaJudul = useRef(null);

  const { judulMemo, teksMemo, day, time, } = useSelector((state) => state.input);
  const { detailMemo } = useSelector((state) => state.memo);
  const dispatch = useDispatch();
  // console.log({ detailMemo });

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
    const textarea2 = textareaJudul.current;
    textarea2.style.height = "auto";
    textarea2.style.height = textarea2.scrollHeight + "px";
    if (detailMemo.length === 0) {

      const currentDate = new Date();
      const currentDay = currentDate.toLocaleDateString("id-IN", { dateStyle: "full" });
      const currentTime = currentDate.toLocaleTimeString("id-IN", { hour: "numeric", minute: "numeric" });

      dispatch(setDay(currentDay))
      dispatch(setTime(currentTime))
    }
  }, [dispatch, detailMemo]);


  function setDynamicHeightJudul() {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  function setDynamicHeightMemo() {
    const textarea = textareaJudul.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  return (
    <div className=" absolute z-20 w-full h-[100vh] page-memo bg-[#242424] p-1">
      {/* navbar */}
      <NavMemo isInputFocused={isInputFocused} />

      {/* input */}
      <div className=" mt-8">
        <form className="w-[90%] m-auto lg:w-[70%]">
          <textarea
            className="bg-transparent w-full text-[1.6rem] flex flex-wrap items-center h-[50px] border-none outline-none mt-6 text-gray-400"
            onInput={setDynamicHeightJudul}
            ref={textareaRef}
            rows="1"
            cols="15"
            value={judulMemo}
            placeholder="Masukkan Judul"
            onChange={(e) => dispatch(setJudulMemo(e.target.value))}
            onFocus={() => setIsInputFocused(true)}
          />
          <div className=" mt-1 text-[.8rem] text-gray-400">
            <p>
              {day}, {time} | {teksMemo.length} kata
            </p>
          </div>
          <textarea
            className="bg-transparent w-[100%] text-[1rem] flex flex-wrap items-center h-[50px] outline-none mt-6 text-gray-400 border-none"
            onInput={setDynamicHeightMemo}
            ref={textareaJudul}
            rows="1"
            cols="15"
            value={teksMemo}
            onChange={(e) => dispatch(setTeksMemo(e.target.value))}
            onFocus={() => setIsInputFocused(false)}
          />
        </form>
      </div>
    </div>
  );
}
