const date = new Date()

export const day = date.toLocaleDateString('id-IN', {dateStyle: 'full'})
export const time = date.toLocaleTimeString('id-IN',{ hour: "numeric", minute: "numeric" })

export function generateRandomId() {
    return Math.floor(Math.random() * 1000) + 1;
}

export function handleDeleted(tulisMemo, setTulisMemo, setDeletedValue) {
    const updatedValue = tulisMemo.substring(0, tulisMemo.length - 1);
    const deletedText = tulisMemo.slice(tulisMemo.length - 1);
    setTulisMemo(updatedValue);
    setDeletedValue((prevDeletedValue) => deletedText + prevDeletedValue);
}

export function handleUndo(setTulisMemo, setDeletedValue, deletedValue) {
    setTulisMemo((prevMemo) => prevMemo + deletedValue);
    setDeletedValue('');
}

export function setDynamicHeight(textareaRef) {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
}
