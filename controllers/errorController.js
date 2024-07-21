exports.Get404 = (req, res, next) => {
    res.status(404).render("Error/404", {pageTittle: "Not Found"});
};