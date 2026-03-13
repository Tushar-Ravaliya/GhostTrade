// import { asyncHandler } from '../utils/async-handler';
// import { ApiResponse } from '../utils/api-response';
<<<<<<< HEAD
import { getLTP,getLowerMarketData,getGainerMarketData,getName } from '../services/angel.services.js'
=======
import { getLTP, getLowerMarketData, getGainerMarketData } from '../services/angel.services.js'
>>>>>>> 0cdab94441080a0807ed12c371f0182089fde39e

const getMarketData = async (req, res) => {

  try {

    const data = await getLTP(
      "NSE",
      "RELIANCE",
      "2885"
    );

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};

const getLowerData = async (req, res) => {
  try {
    const data = await getLowerMarketData()
    console.log(data);

    res.json(data)
  }
  catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

const getGainerData = async (req, res) => {
  try {
    const data = await getGainerMarketData()

    res.json(data)
  }
  catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

const getNameData=async(req,res)=>{
  try{
  const data=await getName()
    
  res.json(data)
  }
  catch(error){
    res.status(500).json({
      error: error.message
    });
  }
}

<<<<<<< HEAD
export { getMarketData,getLowerData,getGainerData,getNameData }
=======
export { getMarketData, getLowerData, getGainerData }
>>>>>>> 0cdab94441080a0807ed12c371f0182089fde39e
