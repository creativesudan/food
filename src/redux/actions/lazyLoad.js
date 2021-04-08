export default lazyLoad = (action) => {
    return { ...action, lazyLoad: true }
}