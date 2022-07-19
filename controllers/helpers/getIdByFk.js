const { Op } = require("sequelize");
const db = require("../../models");

getIdByFk = async (req, res, model, modelId, nestedId) => {
    
    try {
       /*  console.log("PATH", req.path)
        console.log("QUERY", req.query)
        console.log("ROUTE", req.route) */
        const { id,nid } = req.params;
        let models;

        models = await model.findAll({
            where: {
                [Op.and]:
                    [{
                        [modelId]: id, [nestedId]: nid
                    }]
            }
        });
        res.send(models)
        console.log("models", models)
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "No hemos podido crear la promocion"
        });
    }

}
module.exports = getIdByFk;