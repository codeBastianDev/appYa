const model = require("../models/Category");
const commerces = require("../models/Commerce");

exports.index = async (req,res)=>{

    try {
     let result =   await model.findAll({
            include:[{
                model: commerces
            }],
            where:{
                commerceId:req.session.user.id
            }
        })
        res.render('categories/',{categories:result.map(instance => instance.toJSON())})

    } catch (error) {
        
    }
}

exports.save = async (req,res)=>{
  var  id =  req.query.id;
    if(id > 0){
        
       result = await model.findAll({
        where:{
            id:id
        }})
      res.render('categories/save',{categories:result.map(instance => instance.toJSON())[0]})
    }else{
        res.render('categories/save')
    };
}

exports.insert = async (req,res)=>{
    id = req.body.id;
    nombre = req.body.nombre;
    descripcion = req.body.descripcion;
    if(id >0){

        await model.update({
            name:nombre,
            description:descripcion,
            commerceId:req.session.user.id
        },{where:{
            id:id
        }})

    }else{
        try {
            await model.create({
                name: nombre,
                description:descripcion,
                commerceId:req.session.user.id
            });
      
        exports.index(req, res);
        } catch (error) {
            console.error('Error al agregar la categoria:', error);
            throw error;
        }    
    }
    res.redirect("/categoria");
}

exports.delete = async (req, res) => {
    const id = req.body.id;  
    try {
        // Intentar eliminar el registro
        await model.destroy({
            where: {
                id: id
            }
        });
        res.redirect('/success');  
    } catch (error) {
        console.error("Error al eliminar el registro:", error);
        req.flash("errors", `An error has occurred: ${error.message}`);
        res.redirect('/categoria');
    }
};
