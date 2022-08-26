exports.homePage = (req, res) => {
    res.render('index')
    return;
}

exports.treatPost = (req, res) => {
    res.send(`Hey, I'm the new post route!`);
    return;
}