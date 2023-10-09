import { useEffect, useRef, useState  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AiOutlineStar, AiFillStar, AiOutlineMore,AiOutlineClose } from "react-icons/ai";

import { Board } from "../../../../type";
import {
    updateIsStarHistory,
    updateIsStar,
    deleteBoard,
} from "../../../../store/reducer";

interface Prop {
    listBoard: Board[];
}

const ContentLeftItemBoard = (prop: Prop) => {
    const { listBoard } = prop;
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const moreElement = useRef<HTMLDivElement>(null);
    const moreButton = useRef<HTMLDivElement>(null);

    const [boardShowMore, setBoardShowMore] = useState<string | null>("");
    const [idHoverBoartItem, setIdHoverBoardItem] = useState<string | null>("")

    const listBoardNoStar: Board[] = [];

    // array of board sorted by star
    const sortListBoard = [...listBoard]
        .filter((board) => {
            if (!board.isStar) {
                listBoardNoStar.push(board);
            }
            return board.isStar;
        })
        .concat(listBoardNoStar);

    // handle click star of board
    const updateIsStarBoard = (id: string, isStar: boolean) => {
        dispatch(updateIsStar({ id, isStar: !isStar }));
        dispatch(updateIsStarHistory({ id, isStar: !isStar }));
    };
    
    // show more of board
    const isShowMore = (id: string) => {
        if (boardShowMore == id) {
            setBoardShowMore(null);
        } else {
            setBoardShowMore(id);
        }
    };

    // handle click out more of board
    useEffect(() => {
        const handleClickOutMore = (e: globalThis.MouseEvent) => {
            const target = e.target as HTMLElement;
            const isSideOut = moreElement.current?.contains(target)
            const isClickButtonMore = moreButton.current?.contains(target)
            
            if (!isSideOut && !isClickButtonMore) {
                setBoardShowMore(null);
            }
        }
        document.addEventListener("mousedown",handleClickOutMore)
        return () => {
            document.removeEventListener("mousedown", handleClickOutMore)
        }
    }, [])
    
    // close more
    const handleCloseMore = () => {
            setBoardShowMore(null);
    }

    // delete board in more
    const handleDeleteBoard = (id: string) => {
        dispatch(deleteBoard(id));
        if (id == boardId) {
            navigate("/");
        }
    };

    // navigate board
    const changeBoard = (id: string) => {
        navigate(`/itemBoard/${id}`);
    };

    return (
        <div className="w-full">
            <p className="px-[12px] py-[4px] text-sm font-medium h-[32px] w-full">
                Your boards
            </p>

            <div className="w-full">

                {/* render boards in left bar container boards */}
                {sortListBoard.map((board) => (
                    <div
                        key={board.id}
                        className={`flex justify-between ${
                            boardId == board.id && "bg-[#636268]"
                            } group/item relative px-[12px] h-[32px] ${idHoverBoartItem == board.id && "bg-background-box-hover"} text-textColorHeader`}
                        onMouseEnter={() => setIdHoverBoardItem(board.id)}
                        onMouseLeave={() => setIdHoverBoardItem(null)}
                    >
                        {/* background */}
                        <div
                            className="flex flex-1 items-center gap-2 cursor-pointer w-[148px]"
                            onClick={() => changeBoard(board.id)}
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

                            {/* title board */}
                            <div className="hiddenLineLong1 flex-1 text-sm">{board.title}</div>
                        </div>

                        <div className="flex gap-1 items-center">
                            {/* more */}
                            <div
                                ref={moreButton}
                                className={`group/edit ${
                                    boardShowMore == board.id
                                        ? "flex"
                                        : "hidden"
                                    } cursor-pointer group-hover/item:flex justify-center items-center w-[22px] h-[22px] hover:bg-background-box-hover rounded-[2px]
                                    
                                    `}
                                onClick={() => isShowMore(board.id)}
                            >
                                <AiOutlineMore />
                            </div>
                                

                            {/* star */}
                            <div
                                className="hover:scale-[1.2] cursor-pointer"
                                onClick={() =>
                                    updateIsStarBoard(board.id, board.isStar)
                                }
                            >
                                {!board.isStar ? 
                                    idHoverBoartItem == board.id && <div className="group/edit invisible group-hover/item:visible">
                                        <AiOutlineStar />
                                    </div>
                                : (
                                    <div>
                                        <AiFillStar />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* show more */}
                        {boardShowMore == board.id && ( 
                            <div
                                ref={moreElement}
                                className="absolute z-[300] top-[120%] left-[80%] w-[304px] h-[92px] bg-[#282e33] rounded-[6px] border-[1px] border-[#464646]"
                                onMouseEnter={() => setIdHoverBoardItem(null)}
                            >
                                <div className="relative h-[48px] text-[14px] px-[40px]">
                                    <div className="hiddenLineLong1 w-full text-center leading-[48px]">{board.title}</div>

                                    {/* close more */}
                                    <div className="closeMore flex justify-center items-center absolute top-[11px] right-[10px] w-[26px] h-[26px] rounded-[7px] cursor-pointer hover:bg-background-box-hover text-[15px]"
                                    onClick={handleCloseMore}
                                    >
                                        <AiOutlineClose />
                                    </div>
                                </div>

                                {/* delete board */}
                                <div
                                    className="h-[36px] hover:bg-background-box-hover cursor-pointer rounded-[6px] py-[8px] px-[12px] text-[14px] mb-[8px] font-medium"
                                    onClick={() =>
                                        handleDeleteBoard(board.id)
                                    }
                                    onMouseEnter={() => setIdHoverBoardItem(null)}
                                >
                                    Close board
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentLeftItemBoard;
