import { Link } from "react-router-dom";
import CreateWorkspace from "../../component/componentListBoards/createBoard";

const Header = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-[5] bg-bgColor flex items-center h-[var(--height-header)] p-[16px] border-b-[1px] border-[#505050] gap-3">
            <Link to="/">
                <div className="group/item flex items-center gap-2 w-[75px] font-Mooli">
                    <div className="flex justify-evenly w-[16px] h-[16px] bg-textColorHeader pt-[3px] rounded-sm">
                        <div className="group/edit group-hover/item:animate-logo h-[10px] w-[4px] bg-[#3d3d3d] rounded-[1px]"></div>
                        <div className="group/edit group-hover/item:animate-logo1 h-[5px] w-[4px] bg-[#3d3d3d] rounded-[1px]"></div>
                    </div>
                    <h1>Trello</h1>
                </div>
            </Link>
            <CreateWorkspace offsetButtonHeader>
                <button className="w-[62px] h-[32px] text-[#1d2125] font-semibold text-sm bg-create-button-background hover:bg-create-button-background-hovered rounded-[2px]">
                    Create
                </button>
            </CreateWorkspace>
        </div>
    );
};

export default Header;
