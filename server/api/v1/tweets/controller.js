const Model = require('./model');

exports.find = (req, res, next, id) => {
    Model.findById(id)
        .then( doc => {
            if(doc){
                req.doc = doc;
                next();
            }else{
                res.json({
                    message: "Advertisement not found"
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
        .find()
        .skip(skip)
        .limit(limit)
        .populate('author')
        .then( docs => {
            res.json({
                data: docs,
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