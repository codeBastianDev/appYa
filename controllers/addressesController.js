const Addresses = require("../models/Address");
const AddressesUser = require("../models/AddressUser");

exports.GetAddresses = async (req,res) => {
    var userId = req.session.user.id;
    try{
        let addresses = await AddressesUser.findAll({
            where: { userId: userId },
            include: [{ model: Addresses }]
        });
        res.render('address/index', { addresses: addresses.map(address => address.address.toJSON()) });
    }
    catch(err){
        console.error('Error al obtener las direcciones:', error);
        res.status(500).send('Error en el servidor');
    }
};

exports.CreateAddress = async (req, res) => {
    res.render('address/create');
};

exports.SaveAddress = async (req, res) => {
    const { street, description } = req.body;
    var userId = req.session.user.id;

    try {
        let address = await Addresses.create({ street, description });
        await AddressesUser.create({ userId, addressId: address.id });
        res.redirect('/address');
    } catch (error) {
        console.error('Error al crear la dirección:', error);
        res.status(500).send('Error en el servidor');
    }
};

exports.EditAddress = async (req, res) => {
    const { id } = req.params;
    try {
        let address = await Addresses.findOne({ where: { id } });
        if (address) {
            res.render('address/edit', { address: address.toJSON() });
        } else {
            res.status(404).send('Dirección no encontrada');
        }
    } catch (error) {
        console.error('Error al obtener la dirección:', error);
        res.status(500).send('Error en el servidor');
    }
};

exports.UpdateAddress = async (req, res) => {
    const { id } = req.params;
    const { street, description } = req.body;

    try {
        let address = await Addresses.findOne({ where: { id } });
        if (address) {
            await address.update({ street, description });
            res.redirect('/address');
        } else {
            res.status(404).send('Address not found');
        }
    } catch (error) {
        console.error('Error al actualizar la dirección:', error);
        res.status(500).send('Error en el servidor');
    }
};

exports.DeleteAddress = async (req, res) => {
    const { id } = req.params;
    try {
        let addressUser = await AddressesUser.findOne({ where: { addressId: id } });
        if (addressUser) {
            await AddressesUser.destroy({ where: { addressId: id } });
            await Addresses.destroy({ where: { id } });
            res.redirect('/address');
        } else {
            res.status(404).send('Address not found');
        }
    } catch (error) {
        console.error('Error al eliminar la dirección:', error);
        res.status(500).send('Error en el servidor');
    }
};