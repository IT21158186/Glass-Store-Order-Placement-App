

export const getCurrencyRates = async (req,res)=>{
    try {
        const data = {
            usd:1,
            lkr:250.5,
            inr:83.2,
            yen:151.61
        }
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
}