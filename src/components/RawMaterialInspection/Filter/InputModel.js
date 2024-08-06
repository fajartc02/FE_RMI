function InputModel(
    title = '',
    type = '',
    placeholder = '',
    value = null,
    options = null,
    size = null,
    disabled = false,
    id = null,
) {
    let obj = {}
    if (!id) obj.id = title
    obj.title = title
    obj.type = type
    obj.placeholder = placeholder
    obj.value = value
    options ? (obj.options = options) : null

    size ? (obj.size = size) : null
    obj.disabled = disabled
    return obj
}

export default InputModel