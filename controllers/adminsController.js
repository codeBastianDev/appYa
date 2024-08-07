const Users = require("../models/User");
const Orders = require("../models/Order");
const Commerces = require("../models/Commerce");
const Itbis = require("../models/Itbis");
const bcrypt = require("bcryptjs");

exports.GetCustomers = async (req, res) => {
    try {
        const customers = await Users.findAll({
            where: { roleId: 1 }
        });

        const customersData = await Promise.all(customers.map(async (customer) => {
            const totalOrders = await Orders.count({ where: { userId: customer.id } });
            return {
                id: customer.id,
                firstname: customer.firstname,
                lastname: customer.lastname,
                totalOrders,
                phone: customer.phone,
                mail: customer.mail,
                isActive: customer.isActive
            };
        }));

        res.render("admin/listcustomer", { customers: customersData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.ToggleCustomerStatus = async (req, res) => {
    try {
        const { id, isActive } = req.body;
        await Users.update({ isActive }, { where: { id } });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
};


exports.GetDeliveries = async (req, res) => {
    try {
        const deliveries = await Users.findAll({
            where: { roleId: 3 }
        });

        const deliveriesData = await Promise.all(deliveries.map(async (delivery) => {
            const totalOrders = await Orders.count({ where: { userId: delivery.id, status: 3 } });
            return {
                id: delivery.id,
                firstname: delivery.firstname,
                lastname: delivery.lastname,
                totalOrders,
                phone: delivery.phone,
                mail: delivery.mail,
                isActive: delivery.isActive
            };
        }));

        res.render("admin/listdelivery", { deliveries: deliveriesData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.ToggleDeliveryStatus = async (req, res) => {
    try {
        const { id, isActive } = req.body;
        await Users.update({ isActive }, { where: { id } });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
};

exports.GetCommerces = async (req, res) => {
    try {
        const commerces = await Commerces.findAll();

        const commercesData = await Promise.all(commerces.map(async (commerce) => {
            const totalOrders = await Orders.count({ where: { commerceId: commerce.id } });
            return {
                id: commerce.id,
                name: commerce.name,
                photo: commerce.photo,
                totalOrders,
                phone: commerce.phone,
                openTime: commerce.openTime,
                closeTime: commerce.closeTime,
                mail: commerce.mail,
                isActive: commerce.isActive
            };
        }));

        res.render("admin/listcommerce", { commerces: commercesData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// exports.ToggleCommerceStatus = async (req, res) => {
//     try {
//         const { id, isActive } = req.body;
//         await Commerces.update({ isActive }, { where: { id } });
//         res.json({ success: true });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false });
//     }
// };

//Cosas de Itbis

exports.GetSetting = async (req, res) => {
    try {
        const config = await Itbis.findOne();
        value = config.value;
        res.render("admin/setting", { config, value });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.GetEditConfiguration = async (req, res) => {
    try {
        const config = await Itbis.findOne();
        value = config.value;
        res.render("admin/editsetting", { config, value });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.UpdateConfiguration = async (req, res) => {
    try {
        const { value } = req.body;
        await Itbis.update({ value }, { where: { id: 1 } });
        res.redirect("/setting");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.GetAdmins = async (req, res) => {
    try {
        const userLog = req.session.user;

        const admins = await Users.findAll({
            where: { roleId: 2 }
        });

        const filteredAdmins = admins.filter(admin => admin.id !== userLog.id);

        const adminsData = filteredAdmins.map(admin => ({
            id: admin.id,
            firstname: admin.firstname,
            lastname: admin.lastname,
            username: admin.username,  
            idNumber: admin.id,   
            mail: admin.mail,
            isActive: admin.isActive
        }));

        res.render("admin/mantadmin", { admins: adminsData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};




// adminsController.js

exports.GetEditAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Users.findByPk(id);
        if (admin) {
            res.render('admin/editadmin', {
                id: admin.id,
                firstname: admin.firstname,
                lastname: admin.lastname,
                dni: admin.dni,
                mail: admin.mail,
                username: admin.username,
                photo: admin.photo,  // Incluye la foto si es relevante
            });
        } else {
            res.status(404).send('Administrator not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


exports.UpdateAdmin = async (req, res) => {
    try {
        const { id, firstname, lastname, dni, mail, username, password, confirmPassword } = req.body;

        // Verificar si las contraseñas coinciden
        if (password !== confirmPassword) {
            return res.status(400).send("Passwords do not match");
        }

        // Preparar los datos a actualizar
        const updatedData = {
            firstname,
            lastname,
            dni,
            mail,
            username,
        };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12); 
            updatedData.password = hashedPassword;
        }

        await Users.update(updatedData, { where: { id } });
        res.redirect('/listadmin');
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.ToggleAdminStatus = async (req, res) => {
    try {
        const { id, isActive } = req.body;

        console.log("id abajo");
        console.log(id);
        await Users.update({ isActive }, { where: { id } });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
};

exports.ToggleCommerceStatus = async (req, res) => {
    try {
        const { id, isActive } = req.body;
        await Commerces.update({ isActive }, { where: { id } });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
};
