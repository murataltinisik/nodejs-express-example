const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const NewsModel = require('../models/News');

// ALL NEWS
router.get('/', (req, res) => {
    const promise = NewsModel.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'users'
            }
        },
        {
            $unwind: {
                path: '$users'
            }
        },
        {
            $project: {
                title: '$title',
                content: '$content',
                image: '$image',
                tag: '$tag',
                users: {
                    name: '$users.name',
                    surname: '$users.surname',
                }
            }
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
});

// FIND NEWS
router.get('/:news_id', (req, res) => {
    const promise = NewsModel.aggregate([
        {
            $match: {
                '_id': new mongoose.Types.ObjectId(req.params.news_id),
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'users'
            }
        },
        {
            $unwind: {
                path: '$users',
            }
        },
        {
            $project: {
                title: '$title',
                content: '$content',
                image: '$image',
                tag: '$tag',
                created_at: '$created_at',
                users: {
                    name: '$users.name',
                    surname: '$users.surname'
                }
            }
        }
    ]);

    promise.then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

// ADD NEWS
router.post('/', (req, res) => {
    const news = new NewsModel(req.body);
    const promise = news.save();

    promise.then((data) => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
});

// PUT NEWS
router.put('/:news_id', (req, res, next) => {
    const promise = NewsModel.findByIdAndUpdate(req.params.news_id, req.body, { new: true });

    promise.then((data) => {
        if(!data)
            next({ message: 'Not found news for update', code: -1 });

        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

// DELETE NEWS
router.delete('/:news_id', (req, res, next) => {
    const promise = NewsModel.findByIdAndRemove(req.params.news_id);

    promise.then(data => {
        if(!data)
            next({ message: 'Not found data for delete', code: -1 })

        res.json({ status: 1 });
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;
