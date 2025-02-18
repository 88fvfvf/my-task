import { Input } from "antd";
import styles from './Deadline.module.css'

interface DeadlineInputProps {
    deadline: number;
    setDeadline: (deadline: number) => void;
}

export default function DeadlineInput({ deadline, setDeadline }: DeadlineInputProps) {
    return (
        <div>
            <label htmlFor="taskDeadline" className={styles.label}>Срок в днях</label>
            <Input
                id="taskDeadline"
                type="number"
                min={1}
                value={deadline}
                onChange={(e) => setDeadline(Number(e.target.value))}
                className="w-full mb-3" />
        </div>
    )
}