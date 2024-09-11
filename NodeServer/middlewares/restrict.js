const Restrict = (...role) => {
    // restriting particular options to certain roles
    return (req, res, next) => {        
        if(!role.includes(req.user.role)){
            // const error = new Error('You do not have permision to perform this action', 403)
            // return next(error)
        return res.status(403).json({ message: 'Not authorized to perform this action' });

        }
        next()
    }
}

export default Restrict