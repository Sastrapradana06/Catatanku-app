import { RiCheckLine, RiArrowGoBackLine, RiArrowGoForwardFill } from "react-icons/ri";
import { BsArrowLeft } from "react-icons/bs";

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
export default function TulisMemo() {
    const [judul, setJudul] = useState('')
    const [deletedValue, setDeletedValue] = useState('');
    const [memo, setMemo] = useState('')
    const [isInputFocused, setIsInputFocused] = useState(false);
    const textareaRef = useRef(null);
    // console.log({judul, memo});

    function setDynamicHeight() {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }

    function handleDeleted() {
        const updatedValue = memo.substring(0, memo.length - 1);
        const deletedText = memo.slice(memo.length - 1);
        setMemo(updatedValue);
        setDeletedValue((prevDeletedValue) => deletedText + prevDeletedValue);
    }

    function handleUndo() {
        setMemo((prevMemo) => prevMemo + deletedValue);
        setDeletedValue('');
    }
    return (
        <div className=" absolute z-20 w-full h-[100vh] page-memo bg-[#242424] p-1">
            {/* navbar */}
            <div className=" mt-2">
                <div className=" w-[90%] m-auto h-[30px] flex justify-between items-center">
                    <div className=" flex items-center">
                        <button>
                            <Link to="/">
                                <BsArrowLeft size={25} />
                            </Link>
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={handleDeleted} className={`${isInputFocused ? 'hidden' : ''}`}>
                            <RiArrowGoBackLine size={20} color={memo === '' ? 'gray' : 'white'} />
                        </button>
                        <button onClick={handleUndo} className={`${isInputFocused ? 'hidden' : ''}`}>
                            <RiArrowGoForwardFill size={20} color={deletedValue === '' ? 'gray' : 'white'} />
                        </button>
                        {judul === '' ? (
                            <button>
                                <RiCheckLine size={25} color="gray" />
                            </button>
                        ) : (
                            <button>
                                <Link to='/'>
                                    <RiCheckLine size={25} color='white' />
                                </Link>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* input */}
            <div className=" mt-8">
                <form action="" className="w-[90%] m-auto">
                    <textarea 
                        className="bg-transparent w-full text-[1.8rem] flex flex-wrap items-center h-[50px] border-none outline-none" 
                        onInput={setDynamicHeight} 
                        ref={textareaRef} 
                        rows="1" cols="15" 
                        placeholder="Masukkan judul" 
                        value={judul}
                        onChange={(e) => setJudul(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                    />
                    <div className=" mt-1 text-[.8rem] text-gray-400">
                        <p>18 Juni 01.08 Min | 0 kata</p>
                    </div>
                    <textarea 
                        className="bg-transparent w-full text-[1rem] flex flex-wrap items-center h-[50px] border-none outline-none mt-6 text-gray-400"
                        onInput={setDynamicHeight} 
                        ref={textareaRef} 
                        rows="1" cols="15"
                        value={memo}
                        
                        onChange={(e) => setMemo(e.target.value)}
                        onFocus={() => setIsInputFocused(false)}
                        autoFocus
                    />
                </form>
            </div>
        </div>
    );
}
