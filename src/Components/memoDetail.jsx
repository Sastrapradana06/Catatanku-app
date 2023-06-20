import { BsArrowLeft, BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function MemoDetail() {


  return (
      <div className="border h-[50px] flex justify-between p-2">
        <div className="">
            <button>
            <Link to="/">
                <BsArrowLeft size={30} />
            </Link>
            </button>
        </div>
        <div className="flex gap-6">
            <button>
                <BsPencil size={25} />
            </button>
            <button>
            <Link>
                <RiDeleteBin6Line size={25} />
            </Link>
            </button>
        </div>
      </div>
  );
}
