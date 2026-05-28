const asyncHandler = (handlerController) =>{
    return (req,res,next) =>
        Promise.resolve(handlerController(req,res,next)).catch(next)
}

export default asyncHandler