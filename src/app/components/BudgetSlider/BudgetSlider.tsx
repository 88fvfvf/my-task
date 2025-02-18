import { Input } from "antd";
import styles from "./BudgetSlider.module.css";

interface Budget {
    min: number;
    max: number;
}

interface BudgetSliderProps {
    budget: Budget | null;
    setBudget: (budget: Budget) => void;
}

export default function BudgetSlider({ budget, setBudget }: BudgetSliderProps) {
    const handleInputChange = (value: number, type: "min" | "max") => {
        if (!budget) return; // Если budget = null, ничего не делаем
        setBudget({
            ...budget,
            [type]: value
        });
    };

    return (
        <div>
            <label className={styles.label}>Минимальный бюджет</label>
            <Input
                type="number"
                min={0}
                value={budget?.min || 0}
                onChange={(e) => handleInputChange(Number(e.target.value), "min")}
            />

            <label className={styles.label}>Максимальный бюджет</label>
            <Input
                type="number"
                min={budget?.min || 0} // Минимальное значение — текущее min
                value={budget?.max || 0}
                onChange={(e) => handleInputChange(Number(e.target.value), "max")}
            />
        </div>
    );
}
