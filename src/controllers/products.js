import Products from "../models/Products"
import { productValidator } from "../validations/products"

export const create = async (req,res) => {
    try {
        const { error } =  productValidator.validate(req.body)
        if(error){
            return res.status(404).json({
                message: error.details[0].message
            })
        }
        const data = await Products.create(req.body)
        if(!data){
            return res.status(404).json({
                message: "Create Failed!"
            })
        }
        return res.status(200).json({
            message:"Create Thanh Cong!",
            data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getAll = async (req,res) => {
    try {
        const data = await Products.find({})
        if(!data){
            return res.status(404).json({
                message: "getAll Failed!"
            })
        }
        return res.status(200).json({
            message:"getAll Thanh Cong!",
            data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getDetail = async (req,res) => {
    try {
        const data = await Products.findById(req.params.id)
        if(!data){
            return res.status(404).json({
                message: "getDetail Failed!"
            })
        }
        return res.status(200).json({
            message:"getDetail Thanh Cong!",
            data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const remove = async (req,res) => {
    try {
        const data = await Products.findByIdAndDelete(req.params.id)
        if(!data){
            return res.status(404).json({
                message: "Delete Failed!"
            })
        }
        return res.status(200).json({
            message:"Delete Thanh Cong!",
            data

        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const update = async (req,res) => {
    try {
        const { error } =  productValidator.validate(req.body)
        if(error){
            return res.status(404).json({
                message: error.details[0].message
            })
        }
        const data = await Products.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!data){
            return res.status(404).json({
                message: "Update Failed!"
            })
        }
        return res.status(200).json({
            message:"Update Thanh Cong!",
            data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}