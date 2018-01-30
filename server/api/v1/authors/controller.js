const Model = require('./model');

exports.find = (req, res, next, id) => {
    Model.findById(id)
        .then( doc => {
            if(doc){
                req.doc = doc;
                next();
            }else{
                res.json({
                    message: "Author not found"
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
    
    Model
        .find({aviable:true})
        .skip(skip)
        .limit(limit)
        .then( docs => {
            res.json({
                users: docs,
                limit,
                skip
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
 * @api {get} /authors/:id Request Author information
 * @apiName GetAuthor
 * @apiGroup Author
 *
 * @apiParam {String} id Author unique ID.
 *
 * @apiSuccess {String} _id         Unique ID of the Author.
 * @apiSuccess {String} firstname   First name of the Author.
 * @apiSuccess {String} lastname    Last name of the Author.
 * @apiSuccess {String} email       Email of the Author.
 * @apiSuccess {String} aviable     Status of the Author.
 * @apiSuccess {String} createdAt   Created date of the Author.
 * @apiSuccess {String} updateAt    Last update date of the Author.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *           "aviable": "true",
 *           "_id": "5a6e4fb83e76cd11640424c6",
 *           "firstname": "Ornella",
 *            "lastname": "Ramos",
 *            "email": "ornellar@uninorte.edu.co",
 *            "createdAt": "2018-01-28T22:33:28.760Z",
 *           "updatedAt": "2018-01-28T22:33:28.760Z",
 *            "__v": 0
 *     }, 
 *
 * @apiError Document Not Found the id of the Author was not found.
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