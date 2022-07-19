const { Op } = require("sequelize");
const db = require("../../models");

deleteByFk = async (req, res, model, modelId, nestedId) => {
    
    try {
        console.log("PATH", req.path)
        console.log("QUERY", req.query)
        console.log("ROUTE", req.route)
        const { id, nid } = req.params;
        let models;

        models = await model.destroy({
            where: {
                [Op.and]:
                    [{
                        [nestedId]: nid, [modelId]: id
                    }]
            }
        });
        res.status(202).send({message: "se ha borado correctamente"})
        console.log("models", models)
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "No hemos podido crear la promocion"
        });
    }

}
module.exports = deleteByFk;