"use client";

import { Input } from "antd";
import AutoResponsesCheckbox from "../components/AutoResponsesCheckbox/AutoResponsesCheckbox";
import BudgetSlider from "../components/BudgetSlider/BudgetSlider";
import DeadLineInput from "../components/Deadline/DeadlineInput";
import ReminedersInput from "../components/RemindersInput/RemindersInput";
import TagInput from "../components/TagInput/TagInput";
import styles from "./Form.module.css"
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Form() {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [budget, setBudget] = useState<{ min: number; max: number }>({ min: 0, max: 0 });
    const [deadline, setDeadline] = useState<number>(1);
    const [reminders, setReminders] = useState<number>(1);
    const [autoResponses, setAutoResponses] = useState(false);

    useEffect(() => {
        // Сохраняем токен в localStorage только на клиенте
        if (typeof window !== "undefined") {
            localStorage.setItem('token', '317ad1fc-e0a9-11ef-a978-0242ac120007');
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const params = new URLSearchParams({
            title: taskTitle,
            description: taskDesc,
            budget_from: budget.min.toString(),
            budget_to: budget.max.toString(),
            deadline_days: deadline.toString(),
            number_of_reminders: reminders.toString(),
            is_hard: 'true',  // Значение true передаем как строку
            tags: tags.join(','),  // Теги передаем как строку через запятую
            private_content: 'null',  // Если null, то передаем как строку
            all_auto_responses: autoResponses.toString(),
            rules: JSON.stringify({
                budget_from: 5000,
                budget_to: 8000,
                deadline_days: 5,
                qty_freelancers: 1,
                task_id: 2845,
            })
        });
    
        try {
            const response = await axios.get(
                'https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?' + params.toString(),
                {
                    headers: {
                        'Authorization': `Bearer ${token}` // если требуется токен в заголовке
                    }
                }
            );
    
            if (response.status === 200) {
                alert('Задача успешно создана');
            } else {
                alert('Ошибка при создании задачи');
            }
        } catch (error) {
            console.error('Ошибка запроса:', error);
            alert('Ошибка при отправке задачи');
        }
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Создать задачу</h2>

            {/* Название задачи */}
            <label htmlFor="taskTitle" className={styles.inputFieldLabel}>Название задачи</label>
            <Input
                id="taskTitle"
                className={styles.inputField}
                placeholder="Введите название"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
            />

            {/* Описание задачи */}
            <label htmlFor="taskDesc" className={styles.inputFieldLabel}>Описание</label>
            <Input
                id="taskDesc"
                className={styles.inputField}
                placeholder="Введите описание"
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
            />

            {/* Добавление тегов */}
            <TagInput tagsProps={tags} setTagsProps={setTags} />

            {/* Слайдер бюджета */}
            <BudgetSlider budget={budget} setBudget={setBudget} />

            {/* Срок в днях */}
            <DeadLineInput deadline={deadline} setDeadline={setDeadline} />

            {/* Количество напоминаний */}
            <ReminedersInput reminders={reminders} setReminders={setReminders} />

            {/* Чекбокс автоматических ответов */}
            <AutoResponsesCheckbox autoResponses={autoResponses} setAutoResponses={setAutoResponses} />

            {/* Кнопка отправки */}
            <button type="submit" className={styles.submitButton}>
                Отправить
            </button>
        </form>
    );
}
