const sequelize = require('sequelize');
const paginate = require('express-paginate');
const models = require('../models');

module.exports = {
    all: function(req, res) {
        const result = {
            success: false,
            status: 'ERROR',
            data: [],
            pagination: null,
        };

        const allowedSort = ['createdAt', 'resource'];
        const allowedDirection = ['ASC', 'DESC']
        let {
            search: search = '',
            resource: resource = '',
            resourceID: resourceID = '',
            sortBy,
            sortDirection,
            limit,
            page: page = 1,
        } = req.query;
        if (allowedSort.indexOf(sortBy) < 0) sortBy = allowedSort[0];
        if (allowedDirection.indexOf(sortDirection) < 0) sortDirection = allowedDirection[0];
        const ordering = [[sortBy, sortDirection]];
        let resourceFilter = [];
        if (resource || resourceID) {
            resourceFilter = {
                $and: [
                    sequelize.where(
                        sequelize.fn('lower', sequelize.col('resource')),
                        resource.toLowerCase(),
                    ),
                    sequelize.where(
                        sequelize.col('resourceID'),
                        parseInt(resourceID),
                    ),
                ]
            }
        }
        models.Log.findAndCountAll({
            logging: console.log,
            where: {
                $or: [
                    sequelize.where(sequelize.col('desc'), { $ilike: `%${search}%` }),
                ],
                ...resourceFilter,
            },
            limit,
            offset: req.skip,
            order: ordering,
        })
        .then(data => {
            const { count, rows } = data;
            const pageCount = Math.ceil(count / limit);
            result.pagination = {
                total: count,
                pageCount,
                currentPage: page,
                hasNextPage: paginate.hasNextPages(req)(pageCount),
                hasPrevPage: res.locals.paginate.hasPreviousPages,
            }
            result.data = rows;
            result.success = true;
            result.status = 'SUCCESS',
            res.json(result);
        })
        .catch(err => {
            const { original: original = {} } = err;
            result.message = original.hint;
            res.status(500).json(result);
        })
    }
}
