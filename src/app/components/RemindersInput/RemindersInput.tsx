import { InputNumber } from "antd";
import styles from "./Remainder.module.css";

interface RemindersInputProps {
    reminders: number;
    setReminders: (reminders: number) => void;
}


export default function ReminedersInput({ reminders, setReminders }: RemindersInputProps) {
    return (
        <div>
            <label htmlFor="reminders" className={styles.label}>Количество напоминаний</label>
            <InputNumber
                id="reminders"
                value={reminders}
                onChange={(value) => setReminders(value || 1)}
                className="w-full mb-3"
            />
        </div>
    )
}