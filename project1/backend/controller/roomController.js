const io = require('socket.io')

exports.roomGet = async (req,res,next) => {
      
    res.status(200).json(   )
}

exports.roomPost = async (req,res,next) => {
    try{
        const {roomId} = req.body;
        console.log(`Received roomId from frontend: ${roomId}`);
        return res.status(200).json({ success: true, message: "Room joined successfully", roomId });
    }catch(error){
        console.error(`error fetching data from frontend ${error.message}`)
        return res.status(500).json({ success: false, error: error.message });
    }
}
