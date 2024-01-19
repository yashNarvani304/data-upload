
const csvSchema = require('../model/csvModel.js');
// const userModel = require('../model/userModel.js');
const fileUploader = async (req, res) => {
    try {
        const { data } = req.body;
        console.log('Uploading', data);
        console.log("data" + data)
        
        for (const key in data) {
            if (!data[key].eWaybilldata ||
                !data[key].status ||
                !data[key].bulkuploadId) {
                return res.status(500).send("Invalid CSV format.");
            }
            const data1 = new csvSchema({
                eWaybilldata: data[key].eWaybilldata,
                status: data[key].status,
                userId: req.user,
                uploadDate: Date.now(),
                bulkuploadId: data[key].bulkuploadId,
            });
            await data1.save()
            // csvData.push(data1);
            // console.log(csvData);
        }
        // const newCsvdatas = await csvData.save();
        res.status(200).json({ "success": true, message: data });

    } catch (error) {
        if (error.response) {
            // The request was made, but the server responded with a status code that falls out of the range of 2xx
            console.error('Server responded with an error:', error.response.data);

        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from the server.');

        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);

        }
        console.error('Axios error details:', error.message);
        return res.status(500).json({ message: error.response })
    }
}

const getBulkUpload = async (req, res) => {
    console.log('Bulk upload details:', req.params)
    const { bulkuploadId } = req.params;
    console.log("bulkuploadId: ", bulkuploadId)
    const getData = await csvSchema.findOne({ bulkuploadId: bulkuploadId });
    if (!getData) {
        return res.status(404).json({ message: "Couldn't find" })
    }
    res.status(200).send(getData);
};

const getData = async (req, res) => {
    try {
        console.log('Bulk upload details:', req.params)
        console.log(req.body)
        const data = await csvSchema.find({ userId: req.user });
        if (!data) {
            return res.status(404).json({ message: "Couldn't find" })
        }
        res.send(data);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
};

module.exports = {
    fileUploader, getBulkUpload, getData
}