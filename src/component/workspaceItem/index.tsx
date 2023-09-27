import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { Workspace } from "../../type";
import { useDispatch } from "react-redux";
import { addWorkspaceInHistory, updateIsStar, updateIsStarHistory } from "../../store/reducer";
interface Prop {
    workspace: Workspace;
    star?: boolean;
}
const WorkspaceItem = (prop: Prop) => {
    const { workspace, star } = prop;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleStarWorkspace = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        dispatch(updateIsStar({ id: workspace.id, isStar: !workspace.isStar }));
        dispatch(
            updateIsStarHistory({ id: workspace.id, isStar: !workspace.isStar })
        );
    };

    const detailWorkspace = () => {
        navigate(`/itemBoard/${workspace.id}`);
        dispatch(addWorkspaceInHistory(workspace))
    };

    return (
        <div
            className={`${workspace.backgroundColor} group/item cursor-pointer h-[127px] w-full relative transition-all overflow-hidden rounded-md hover:brightness-[0.9]`}
            onClick={detailWorkspace}
        >
            {workspace.backgroundImg && (
                <img src={workspace.backgroundImg} alt="imageWorkspace" />
            )}
            {/* title */}
            <p className="absolute top-[10px] left-[10px] text-[18px] font-medium text-white">
                {workspace.title}
            </p>

            {/* visible trello workspace */}
            {workspace.isStar && star && (
                <div className=" absolute bottom-[10px] left-[10px] text-[14px] leading-[14px] text-[#e4e4e4]">
                    Trello workspace
                </div>
            )}

            {/* star */}
            <div
                className=" absolute bottom-[10px] right-[10px] hover:scale-[1.2]"
                onClick={(e) => handleStarWorkspace(e)}
            >
                {!workspace.isStar ? (
                    <div className="group/edit invisible text-white text-base hover:text-star-color font-bold group-hover/item:visible group-hover/item:animate-starWorkspace">
                        <AiOutlineStar />
                    </div>
                ) : (
                    <div className="text-star-color">
                        <AiFillStar />
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkspaceItem;
