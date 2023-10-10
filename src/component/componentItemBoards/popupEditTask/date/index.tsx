import { useState } from "react";
import { useDispatch } from "react-redux";
import { DatePicker, Space } from "antd";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { AiOutlineClose } from "react-icons/ai";

import { Dates } from "../../../../type";
import { isRemoveDateTask, setDateTask } from "../../../../store/reducer";

dayjs.extend(customParseFormat);

const format = "HH:mm";
const dateFormat = "YYYY/MM/DD";

interface Prop {
    idTask: string | undefined;
    dates: Dates;
    handleCloseDatePopup: () => void;
}

const Date = (prop: Prop) => {
    const { idTask, handleCloseDatePopup,dates } = prop;
    const dispatch = useDispatch();

    // date when no set date
    const currentDate = {
        day: dayjs().date(),
        month: dayjs().month(),
        year: dayjs().year(),
        hour: dayjs().hour(),
        minute: dayjs().minute(),
        monthWord: dayjs().toString().split(" ")[2],
        isShow: true,
        dateComplete: false,
    };

    const [date, setDate] = useState<Dates | object>(
        dates?.isShow ? dates : currentDate
    );

    // handle add date in popup task
    const handleAddDates = () => {
        dispatch(setDateTask({ id: idTask as string, dates: date as Dates }));
        handleCloseDatePopup();
    };

    // handle remove date
    const handleRemoveDate = () => {
        dispatch(isRemoveDateTask({ id: idTask as string, isShow: false }));
        handleCloseDatePopup()
    };

    // set date
    const handleSetDate = (e: dayjs.Dayjs | null) => {
        setDate((prev) => {
            const monthWord = e?.toString().split(" ")[2];
            return {
                ...prev,
                day: e?.date(),
                month: e?.month(),
                year: e?.year(),
                monthWord,
                isShow: true,
                dateStatus: false,
            };
        });
    };

    // set hour
    const handleSetHours = (e: dayjs.Dayjs | null) => {
        setDate((prev) => ({ ...prev, minute: e?.minute(), hour: e?.hour() }));
    };

    // create date and hour
    const dateConfig = () => {
        const dateCf = date as Dates;
        return `${dateCf.year}-${
            dateCf.month + 1 < 10 ? "0" + dateCf.month : dateCf.month + 1
        }-${dateCf.day < 10 ? "0" + dateCf.day : dateCf.day}`;
    };
    const hourConfig = () => {
        const dateCf = date as Dates;
        return `${dateCf.hour}:${dateCf.minute}`;
    };

    // initial date and hour
    const dateInit: string = dateConfig();
    const hoursInit: string = hourConfig();

    return (

        <div className="flex relative flex-col gap-3 w-[304px] bg-[#282E33] px-[12px] py-[12px] rounded-[10px] border-[1px] border-[#464646]">
            <p className="text-center">Dates</p>
            <p className="text-[14px]">Due date:</p>

            {/* select date */}
            <Space direction="vertical" size={12}>
                <DatePicker
                    defaultValue={dayjs(dateInit, dateFormat)}
                    format={dateFormat}
                onChange={handleSetDate}
                />
                <TimePicker
                    defaultValue={dayjs(hoursInit, format)}
                    format={format}
                    onChange={handleSetHours}
                />
            </Space>
            <button
                className="py-[6px] px-[12px] mb-[8px] text-black text-[14px] font-medium bg-create-button-background hover:bg-create-button-background-hovered rounded-[6px]"
                onClick={handleAddDates}
            >
                Save
            </button>
            <button
                className="py-[6px] px-[12px] mb-[8px] bg-background-box text-[14px] font-medium hover:bg-background-box-hover rounded-[6px]"
                onClick={handleRemoveDate}
            >
                Remove
            </button>

            {/* close date */}
            <div
                className="absolute top-[10px] right-[10px] text-[14px] cursor-pointer rounded-[2px] hover:bg-background-box-hover px-[5px] py-[5px]"
                onClick={handleCloseDatePopup}
            >
                <AiOutlineClose />
            </div>
        </div>
        
    );
};

export default Date;
