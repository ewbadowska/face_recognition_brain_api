const Clarifai = require('clarifai');

//added my own api key
const app = new Clarifai.App({
    apiKey: '4a8fb170e52b48dfbd3eaa4cc704cb26'
});

const handleApiCall = (req, res) => {
    app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with api'))
}




const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
};