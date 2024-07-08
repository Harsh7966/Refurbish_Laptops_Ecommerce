const signUp_middle= (signUp_validator) => async(req, res, next) =>{
    try{
        const validateData= await signUp_validator.parseAsync(req.body);

        // my custom property
        req.body= validateData;

        next();
    }catch(err){
        const msg= err.errors[0].message;
        console.log(msg);
        res.status(401).json(msg);
    }
}

module.exports= signUp_middle;