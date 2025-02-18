import { PlusOutlined } from "@ant-design/icons";
import { Input, InputRef, Tag, theme } from "antd";
import { useEffect, useRef, useState } from "react";
import styles from './TagInput.module.css'

interface TagInputProps {
    tagsProps: string[];
    setTagsProps: (tags: string[]) => void;
}


export default function TagInput({ tagsProps, setTagsProps }: TagInputProps) {
    const { token } = theme.useToken();
    const [tags, setTags] = useState<string[]>([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);

    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const forMap = (tag: string) => (
        <span key={tag} style={{ display: 'inline-block' }}>
            <Tag
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        </span>
    );

    const tagPlusStyle: React.CSSProperties = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };

    // Для автоподсказок
    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    return (
        <div>
            <div>
                <span className={styles.label}>Добавить теги</span>
            </div>
            {tags.map(forMap)}
            {inputVisible ? (
                <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            ) : (
                <Tag onClick={showInput} style={tagPlusStyle}>
                    <PlusOutlined /> Добавить
                </Tag>
            )}
        </div>
    )
}