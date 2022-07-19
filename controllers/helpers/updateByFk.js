const { Op } = require("sequelize");
const db = require("../../models");

updateByFk = async (req, res, model, modelId, nestedId) => {
    
    try {
        console.log("PATH", req.path)
        console.log("QUERY", req.query)
        console.log("ROUTE", req.route)
        const { id, nid } = req.params;
        let models;

        models = await model.update(req.body,{
            where: {
                [Op.and]:
                    [{
                        [modelId]: id, [nestedId]: nid 
                    }]
            }
        });
        res.status(202).send({message: "se ha actualizado correctamente"})
        console.log("models", models)
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "No hemos podido crear la promocion"
        });
    }

}
module.exports = updateByFk;