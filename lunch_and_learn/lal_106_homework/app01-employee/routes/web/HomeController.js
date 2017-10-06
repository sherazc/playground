class HomeController {
    home (request, response) {
        response.redirect('/add');
    }
}

export default HomeController;