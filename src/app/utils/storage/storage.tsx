function getItem(label: string): string | null {
    const sessionStorageValue = sessionStorage.getItem(label);
    return sessionStorageValue;
}

function setItem(label: string, value: string) {
    sessionStorage.setItem(label, value);
}

export {
    getItem,
    setItem
}