import { Checkbox } from "antd";
import { useState } from "react";
import styles from "./AutoResponcses.module.css"

interface AutoResponsesCheckboxProps {
    autoResponses: boolean
    setAutoResponses: (autoResponses: boolean) => void
}

export default function AutoResponsesCheckbox({ autoResponses, setAutoResponses }: AutoResponsesCheckboxProps) {
    return (
        <div className={styles.container}>
            <Checkbox
                id="allAutoResponses"
                checked={autoResponses}
                onChange={(e) => setAutoResponses(e.target.checked)}
            />
            <label
                htmlFor="allAutoResponses"
                className={styles.label}
            >
                Включить автоматические ответы
            </label>
        </div>
    )
}