import { useEffect, useRef, useState } from "react";
import NavMemo from "./NavMemo";
import { useSelector, useDispatch } from "react-redux";
import { setJudulMemo, setTeksMemo, setDay, setTime } from "../App/Features/inputSlice";

export default function TulisMemo() {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const textareaRef = useRef(null);

  const { judulMemo, teksMemo, day, time } = useSelector((state) => state.input);
  const dispatch = useDispatch();
//   console.log({ judulMemo, teksMemo, day });

  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleDateString("id-IN", { dateStyle: "full" });
    const currentTime = currentDate.toLocaleTimeString("id-IN", { hour: "numeric", minute: "numeric" });

    dispatch(setDay(currentDay))
    dispatch(setTime(currentTime))
  }, [dispatch]);


  function setDynamicHeight() {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  return (
    <div className=" absolute z-20 w-full h-[100vh] page-memo bg-[#242424] p-1">
      {/* navbar */}
      <NavMemo isInputFocused={isInputFocused}/>

      {/* input */}
      <div className=" mt-8">
        <form className="w-[90%] m-auto">
          <textarea
            className="bg-transparent w-full text-[1.6rem] flex flex-wrap items-center h-[50px] border-none outline-none mt-6 text-gray-400"
            onInput={setDynamicHeight}
            ref={textareaRef}
            rows="1"
            cols="15"
            value={judulMemo}
            placeholder="Masukkan Judul"
            onChange={(e) => dispatch(setJudulMemo(e.target.value))}
            onFocus={() => setIsInputFocused(false)}
          />
          <div className=" mt-1 text-[.8rem] text-gray-400">
            <p>
              {day}, {time} | {teksMemo.length} kata
            </p>
          </div>
          <textarea
            className="bg-transparent w-full text-[1rem] flex flex-wrap items-center h-[50px] border-none outline-none mt-6 text-gray-400"
            onInput={setDynamicHeight}
            ref={textareaRef}
            rows="1"
            cols="15"
            value={teksMemo}
            onChange={(e) => dispatch(setTeksMemo(e.target.value))}
            onFocus={() => setIsInputFocused(false)}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
