const ApiError = require('../error/ApiError');
const { Result, Dates } = require('../models/models');
var moment = require('moment'); 
moment().format(); 

class ResultController {
    
    async create(req, res, next) {
        try {
            const {result, userId, cathedra_id } = req.body;

            let dates = await Dates.findAll();

            dates = dates[0];

            const candidate = await Result.findAll({ where: { userId } });
            if (candidate && candidate.length) {

              candidate.forEach(el => {
                if(moment(el.createdAt).isBetween(dates.firstDate, dates.lastDate, undefined, '[]')) {
                  return next(ApiError.badRequest("Ваша анкета уже добавлена!"));
                }
              })
            }
            const resultt = await Result.create({result: Number(result).toFixed(2), userId, cathedra_id});
            return res.json(resultt);
         } catch (e) {
             next(ApiError.badRequest(e.message));
         }
    }

    async get(req, res) {
        const results = await Result.findAll();
        return res.json(results);
    }

    async getByCath(req, res, next) {
        try {
          const { id } = req.params;
          if (!id) {
            res.status(400).json({ message: "Id не указан" });
          }
          const reports = await Result.findAll({
            where: { cathedra_id: id },
          });
          return res.json(reports);
        } catch (e) {
          next(ApiError.badRequest(e.message));
        }
      }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            if (!id) {
                res.status(400).json({message: "Id не указан"});
            }
            const result = await Result.destroy({
                where: { userId: id }
              });
            return res.json(result);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            const result = req.body;
            if (!result.id) {
                res.status(400).json( {message: 'Id не указан'});
            }
            const updatedResult = await Result.update(result, {
                where: {id: id},
            })
            
            return res.json(updatedResult);
        } catch(e) {
            
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
       try {
        const {id} = req.params;
        const result = await Result.findOne({
            where: {userId: id}
        })
        return res.json(result);
       } catch(e) {
            
        next(ApiError.badRequest(e.message));
    }
      }

}

module.exports = new ResultController();