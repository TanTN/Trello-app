import React, { useEffect, useRef, useState  } from "react";
import { Board } from "../../../type";
import { useNavigate, useParams } from "react-router-dom";

import { AiOutlineStar, AiFillStar, AiOutlineMore,AiOutlineClose } from "react-icons/ai";


import { useDispatch } from "react-redux";
import {
    updateIsStarHistory,
    updateIsStar,
    deleteBoard,
} from "../../../store/reducer";

interface Prop {
    listBoard: Board[];
}

const ListBoardLeft = (prop: Prop) => {
    const { listBoard } = prop;
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [boardShowMore, setBoardShowMore] = useState<string | null>("");
    const [idHoverBoartItem, setIdHoverBoardItem] = useState<string | null>("")

    const more = useRef<HTMLDivElement>(null);

    const listBoardNoStar: Board[] = [];
    const sortListBoard = [...listBoard]
        .filter((board) => {
            if (!board.isStar) {
                listBoardNoStar.push(board);
            }
            return board.isStar;
        })
        .concat(listBoardNoStar);

    const updateIsStarBoard = (id: string, isStar: boolean) => {
        dispatch(updateIsStar({ id, isStar: !isStar }));
        dispatch(updateIsStarHistory({ id, isStar: !isStar }));
    };
    
    const isShowMore = (id: string) => {
        if (boardShowMore == id) {
            setBoardShowMore(null);
        } else {
            setBoardShowMore(id);
        }
    };
    useEffect(() => {
        const handleClickOutMore = (e: globalThis.MouseEvent) => {
            const target = e.target as HTMLElement;
            
            const isSideOut = more.current?.contains(target)
            
            if (!isSideOut) {
                setBoardShowMore(null);
            }
        }
        document.addEventListener("mousedown",handleClickOutMore)
        return () => {
            document.removeEventListener("mousedown", handleClickOutMore)
        }
    }, [])
    
    const handleCloseMore = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        const target = e.target as HTMLElement;
        const isCloseMore = target.closest(".closeMore")
        if (isCloseMore) {
            setBoardShowMore(null);
        }
    }

    const handleDeleteBoard = (id: string) => {
        dispatch(deleteBoard(id));
        if (id == boardId) {
            navigate("/");
        }
    };

    const changeWorkspace = (id: string) => {
        navigate(`/itemBoard/${id}`);
    };
    return (
        <div>
            <p className="px-[12px] py-[4px] text-sm font-medium h-[32px]">
                Your boards
            </p>

            <div>
                {sortListBoard.map((board) => (
                    <div
                        key={board.id}
                        className={`flex items-center justify-between ${
                            boardId == board.id && "bg-[#636268]"
                            } group/item px-[12px] h-[32px] ${idHoverBoartItem == board.id && "bg-background-box-hover"} text-textColorHeader`}
                        onMouseEnter={() => setIdHoverBoardItem(board.id)}
                        onMouseLeave={() => setIdHoverBoardItem(null)}
                    >
                        {/* background */}
                        <div
                            className="flex flex-1 items-center h-full gap-2 cursor-pointer"
                            onClick={() => changeWorkspace(board.id)}
                        >
                            <div
                                className={`${board.backgroundColor} relative w-[30px] h-[20px] overflow-hidden rounded-[3px]`}
                            >
                                {board.backgroundImg && (
                                    <img
                                        src={board.backgroundImg ?? ""}
                                        alt=""
                                        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            {/* title */}
                            <div className="text-sm">{board.title}</div>
                        </div>

                        <div className="flex gap-1 items-center">
                            {/* more */}
                            <div
                                className={`group/edit ${
                                    boardShowMore == board.id
                                        ? "flex"
                                        : "hidden"
                                } group-hover/item:flex relative justify-center items-center w-[22px] h-[22px] hover:bg-background-box-hover rounded-[2px]`}
                                onClick={() => isShowMore(board.id)}
                            >
                                <AiOutlineMore className="cursor-pointer" />

                                {boardShowMore == board.id && ( 
                                    <div
                                        ref={more}
                                        className="absolute z-[300] top-[140%] left-0 w-[304px] h-[92px] bg-[#282e33] rounded-[6px] border-[1px] border-[#464646]"
                                        onClick={handleCloseMore}
                                        onMouseEnter={() => setIdHoverBoardItem(null)}

                                    >
                                        <div className="relative h-[48px] text-[14px]">
                                            <div className="text-center leading-[48px]">{board.title}</div>
                                            <div className="closeMore flex justify-center items-center absolute top-[11px] right-[10px] w-[26px] h-[26px] rounded-[7px] cursor-pointer hover:bg-background-box-hover text-[15px]"><AiOutlineClose /></div>
                                        </div>
                                        <div
                                            className="h-[36px] hover:bg-background-box-hover cursor-pointer rounded-[6px] py-[8px] px-[12px] text-[14px] mb-[8px] font-medium"
                                            onClick={() =>
                                                handleDeleteBoard(board.id)
                                            }
                                        >
                                            Close board
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* star */}
                            <div
                                className="hover:scale-[1.2] cursor-pointer"
                                onClick={() =>
                                    updateIsStarBoard(board.id, board.isStar)
                                }
                            >
                                {!board.isStar ? (
                                    <div className="group/edit invisible group-hover/item:visible">
                                        <AiOutlineStar />
                                    </div>
                                ) : (
                                    <div>
                                        <AiFillStar />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListBoardLeft;
