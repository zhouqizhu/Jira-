export const isFalsy = (value) => (value === 0 ? false : !value)
export const cleanObject = (object) => {
    const result = { ...object }
    Object.keys(result).forEach((key) => {
        const value = result[key]
        // 如果为null或undefined删除
        if (isFalsy(value)) {
            delete result[key]
        }
    })
    return result
}
