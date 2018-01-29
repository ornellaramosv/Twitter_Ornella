const Model = require('./model');

exports.find = (req, res, next, id) => {
    Model.findById(id)
        .then( doc => {
            if(doc){
                req.doc = doc;
                next();
            }else{
                res.status(404).json({
                    message: "Tweet not found"
                });
            }
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.all = (req, res, next) => {
    const limit = Number(req.query.limit) || 10;
    const skip = Number(req.query.skip) || 0;
    
    const items = Model
        .find()
        .skip(skip)
        .limit(limit)
        .populate('author');
    
    const count = Model.count();
    
    Promise.all([items.exec(), count.exec()])
        .then( data => {
            res.json({
                data: data[0],
                limit,
                skip,
                count: data[1]
            })
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.create = (req, res, next) => {
    const body = req.body;
    
    let document = new Model(body);
    document.save()
        .then( doc => {
            res.json(doc)
        })
        .catch( err => {
            next(new Error(err));
        });
};

/**
 * @api {get} /tweets/:id Request Tweet information
 * @apiName GetTweet
 * @apiGroup Tweet
 *
 * @apiParam {String} id Tweet unique ID.
 *
 * @apiSuccess {String} _id             Unique ID of the Tweet.
 * @apiSuccess {String} content         Content of the Tweet.
 * @apiSuccess {String} location        Location of the Tweet.
 * @apiSuccess {String} author          Author of the Tweet.
 * @apiSuccess {String} createdAt       Created date of the Tweet.
 * @apiSuccess {String} updateAt        Last update date of the Tweet.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "_id": "5a63985872e840361145d634",
 *          "content": "Tweet example",
 *          "location": "Colombia",
 *          "author": {
 *              "_id": "5a63929672e840361145d633",
 *              "firstname": "Ornella",
 *              "lastname": "Ramos",
 *              "email": "ornellar@uninorte.edu.co",
 *              "aviable": "true",
 *              "createdAt": "2018-01-20T19:03:50.638Z",
 *              "updatedAt": "2018-01-20T19:03:50.638Z",
 *              "__v": 0
 *          },
 *          "createdAt": "2018-01-20T19:28:24.046Z",
 *          "updatedAt": "2018-01-20T19:28:24.046Z",
 *          "__v": 0
 *      },
 *
 * @apiError Document Not Found the id of the Tweet was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Document Not Found"
 *     }
 */

exports.get = (req, res, next) => {
    res.json(req.doc);
};

exports.update = (req, res, next) => {
    let document = Object.assign(req.doc, req.body);
    
    document.save()
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
           next(new Error(err));
        });
};

exports.delete = (req, res, next) => {
    const doc = req.doc;
    
    doc.remove()
        .then( deleted => {
            res.json(deleted);
        })
        .catch( err => {
            next(new Error(err));
        });
};
