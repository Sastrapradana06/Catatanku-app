import { TbNotes } from "react-icons/tb";
import { Link } from "react-router-dom";
export default function Semua() {
  return (
    <div className="">
      <div className="p-2 flex flex-col gap-3 w-[95%] m-auto">
        <div className="h-[100px] rounded-xl bg-card flex items-center">
          <div className="p-3">
            <h1 className="text-[1.2rem]">Akun Brimo</h1>
            <p className="text-gray-400 mt-1">13 Maret</p>
          </div>
        </div>
        <div className=" h-[100px] rounded-xl bg-card flex items-center">
          <div className="p-3">
            <h1 className="text-[1.2rem]">Akun Brimo</h1>
            <p className="text-gray-400 mt-1">13 Maret</p>
          </div>
        </div>
        <div className=" h-[100px] rounded-xl bg-card flex items-center">
          <div className="p-3">
            <h1 className="text-[1.2rem]">Akun Brimo</h1>
            <p className="text-gray-400 mt-1">13 Maret</p>
          </div>
        </div>
        <div className=" h-[100px] rounded-xl bg-card flex items-center">
          <div className="p-3">
            <h1 className="text-[1.2rem]">Akun Brimo</h1>
            <p className="text-gray-400 mt-1">13 Maret</p>
          </div>
        </div>
        <div className=" h-[100px] rounded-xl bg-card flex items-center">
          <div className="p-3">
            <h1 className="text-[1.2rem]">Akun Brimo</h1>
            <p className="text-gray-400 mt-1">13 Maret</p>
          </div>
        </div>
        <div className=" h-[100px] rounded-xl bg-card flex items-center">
          <div className="p-3">
            <h1 className="text-[1.2rem]">Akun Brimo</h1>
            <p className="text-gray-400 mt-1">13 Maret</p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full h-max p-1 bg-[#2B2730]">
        <div className="w-[50%] m-auto h-full flex flex-col items-center justify-center">
          <button>
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
