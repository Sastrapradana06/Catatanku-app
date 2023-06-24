
import { BiSearch } from "react-icons/bi";
// import { AiOutlineEllipsis } from "react-icons/ai";
import { Link } from "react-router-dom";

import { setIsBtnEdit } from "../App/Features/memoSlice";
import {  useDispatch } from "react-redux";


export function Navbar() {
    const dispatch = useDispatch()
    return (
        <div className=" p-1 fixed top-0 w-[100%] border-b-b z-10 bg-[#2B2730]">
            <div className=" w-[90%] m-auto flex justify-between">
                <div className="text-[1.8rem]">
                    <h1 className="font-judul">Catatanku</h1>
                </div>
                <div className="flex justify-center gap-4 items-center">
                    <button onClick={() => dispatch(setIsBtnEdit(true))}>Edit</button>
                    <button>
                        <Link to='/search-memo'>
                            <BiSearch size={25}/>
                        </Link>
                    </button>
                </div>
            </div>
            <div className=" mt-5 w-[90%] m-auto flex justify-center gap-32">
                <div className="flex flex-col items-center gap-2">
                    <button className="text-orange-400">
                        <Link to='/'>Semua</Link>
                    </button>
                    <span className="border-o w-[30px]"></span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <button>
                        <Link to='/folder'>Folder</Link>
                    </button>
                    {/* <span className="border w-[30px]"></span> */}
                </div>
            </div>
        </div>
    )
}
