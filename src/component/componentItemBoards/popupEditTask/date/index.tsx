import {ReactElement, useState} from "react"
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { AiOutlineClose } from "react-icons/ai";
import { TimePicker } from 'antd';
import { Dates } from "../../../../type";
import { isRemoveDateTask, setDate } from "../../../../store/reducer";
import { useDispatch } from "react-redux";
import Tippy from "@tippyjs/react/headless";
dayjs.extend(customParseFormat);

const format = 'HH:mm';
const dateFormat = 'DD-MM-YYYY';

interface Prop {
    handleIsShowDate: () => void
    idTask: string | undefined
    isShowDate: boolean
    children: ReactElement
}



const Date = (prop: Prop) => {
    const { handleIsShowDate,idTask,children,isShowDate } = prop
    const dispatch = useDispatch()
    const [date, setDates] = useState<Dates | object>({})

    const handleAddDates = () => {
        dispatch(setDate({ id: idTask as string , dates : date as Dates}))
        handleIsShowDate()
    }
    const handleRemoveDate = () => { 
        dispatch(isRemoveDateTask({ id: idTask as string, isShow: false }))
        handleIsShowDate()
        
    }
    const handleSetDate = (e: dayjs.Dayjs | null) => {
        setDates((prev) => {
            const monthWord = e?.toString().split(' ')[2]
            return { ...prev, day: e?.date(), month: e?.month(), year: e?.year(), monthWord ,isShow: true,dateStatus:false}
        }
        )
    }
    const handleSetHours = (e: dayjs.Dayjs | null) => {
        setDates((prev) => ({...prev, minute: e?.minute(), hour: e?.hour()}))
    }
    const dateConfig : string = "04-10-2023"
    const hoursConfig : string = "20:00"
    return (<Tippy
        interactive
        placement="bottom-start"
        offset={[0, 10]}
        visible={isShowDate}
        render={(attrs) => {
            return <div tabIndex={-1} {...attrs}>
                <div className='flex relative flex-col gap-3 w-[304px] bg-[#282E33] px-[12px] py-[12px] rounded-[10px] border-[1px] border-[#464646]'>
            <p className='text-center'>Dates</p>
            <p className='text-[14px]'>Due date:</p>
        <Space direction="vertical" size={12}>
        <DatePicker defaultValue={dayjs(dateConfig, dateFormat)} onChange={handleSetDate} />
        </Space>
            <div><TimePicker defaultValue={dayjs(hoursConfig, format)} format={format} onChange={handleSetHours}/></div>
            <button className='py-[6px] px-[12px] mb-[8px] text-black text-[14px] font-medium bg-create-button-background hover:bg-create-button-background-hovered rounded-[6px]'
                onClick={handleAddDates}
            >
                Save
            </button>
            <button className='py-[6px] px-[12px] mb-[8px] bg-background-box text-[14px] font-medium hover:bg-background-box-hover rounded-[6px]'
                onClick={handleRemoveDate}
            >
                Remove
            </button>

            <div className='absolute top-[10px] right-[10px] text-[14px] cursor-pointer rounded-[2px] hover:bg-background-box-hover px-[5px] py-[5px]'
                onClick={handleIsShowDate}
            >
                <AiOutlineClose />
            </div>
        </div>
            </div>
        }}
    >
         {children}</Tippy>
        
    )
  };


export default Date