
export const catchAsyncError = (apiControllerFn) => {
    return (req, res, next) => {
        Promise.resolve(apiControllerFn(req, res, next)).catch(next);

    }
}
