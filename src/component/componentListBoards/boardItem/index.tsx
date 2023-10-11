import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { Board } from "../../../type";
import { useDispatch } from "react-redux";
import {
    addBoardInHistory,
    updateIsStar,
    updateIsStarHistory,
} from "../../../store/reducer";

interface Prop {
    board: Board;
    star?: boolean;
}

const BoardItem = (prop: Prop) => {
    const { board, star } = prop;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // handle star on the board
    const handleStarBoard = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();
        dispatch(updateIsStar({ id: board.id, isStar: !board.isStar }));
        dispatch(
            updateIsStarHistory({ id: board.id, isStar: !board.isStar })
        );
    };

    // go to detail board
    const detailBoard = () => {
        navigate(`/itemBoard/${board.id}`);
        dispatch(addBoardInHistory(board));
    };

    return (
        <div
            className={`${board.backgroundColor} group/item cursor-pointer h-[127px] w-full relative transition-all overflow-hidden rounded-md hover:brightness-[0.9]`}
            onClick={detailBoard}
        >
            {/* background */}
            {board.backgroundImg && (
                <img src={board.backgroundImg} alt="image" />
            )}

            {/* title */}
            <p className="hiddenLineLong2 absolute top-[10px] left-[10px] right-[10px] text-[18px] leading-[18px] font-medium text-white">
                {board.title}
            </p>

            {/* visible trello workspace when has star */}
            {board.isStar && star && (
                <div className=" absolute bottom-[10px] left-[10px] text-[14px] leading-[14px] text-[#e4e4e4] ">
                    Trello workspace
                </div>
            )}

            {/* star */}
            <div
                className=" absolute bottom-[10px] right-[10px] hover:scale-[1.2]"
                onClick={(e) => handleStarBoard(e)}
            >
                {!board.isStar ? (
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

export default BoardItem;
