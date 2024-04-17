const TaskSchema = require('../models/task_model.js');
const {BadRequestError, NotFoundError} = require('../errors/index.js');
const validationResult = require('express-validator');

/**
 * Calculates the duration between two dates.
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @returns {Object} An object containing the duration and duration type.
 */


const TaskControl = {
create: async(req, res,next) => {
    const errors = validationResult(req);
        try {
            if(!errors.isEmpty()){
                next(new BadRequestError(errors.arrays()[0].msg));
            }
            const newTask = await TaskSchema.create(req.body);
            res.status(201).json(newTask);
        } catch (error) {
          next(error);
        }
    },
    getTask: async(req, res,next) => {
        try {
            const get = await TaskSchema.find();
            if(get){
                res.status(200).json(get);
            }
        } catch (error) {
          next(error);
        }
    },
    getById: async(req, res,next) => {
        try {
            const id= req.params.id;
             const getId = await TaskSchema.findById(id);
             if (!getId){
                return next(new NotFoundError(`Task not found`));
             }
            res.status(200).json(getId);
        } catch (error) {
          
            next(error);
        }
    },
    updateTask: async(req,res, next) => {
        try {
            const id= req.params.id;
            const update = await TaskSchema.findByIdAndUpdate(id, req.body);
            if(!update){
                return next(new NotFoundError(`Task not found`));
            }
            res.status(200).json(update);
        } catch (error) {
            next(error);
        }
    }, 
    deleteTask: async(req,res, next) => {
        try {
            const id= req.params.id;
            const deleteTask = await TaskSchema.findByIdAndDelete(id);
            res.status(200).json({message: 'Task Deleted !'});
        } catch (error) {
          next(error);
        }
    }

};

module.exports = TaskControl;