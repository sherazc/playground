<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@attribute name="active_view" required="false" %>
<header>
    Customer Shop
</header>
<nav id="main_nav">
    <ul>
        <li class="${active_view == "home" ? "active": ""}"><a href="#">Home</a></li>
        <li class="${active_view == "items" ? "active": ""}"><a href="#">Items</a></li>
        <li class="${active_view == "address" ? "active": ""}"><a href="#">Address</a></li>
        <li class="${active_view == "customers" ? "active": ""}"><a href="#">Customer</a></li>
        <li class="${active_view == "customer_order" ? "active": ""}"><a href="#">Customer Order</a></li>
        <li class="hamburger_icon"><a href="javascript:void(0)">&#9776;</a></li>
    </ul>
</nav>

<script>
    window.addEventListener("load", addEvents);

    function addEvents() {
        var hamburgerIconElement = document.getElementsByClassName("hamburger_icon")[0];
        hamburgerIconElement.addEventListener("click", function (event) {
            toggleElementsClass("#main_nav ul", "responsive")
        })
    }

    function toggleElementsClass(selector, className) {
        var element = document.querySelector(selector);
        if (selector == null || className == null) {
            console.log("Please specify selector and class name");
            return;
        }
        if (element == null) {
            console.log("Can't find " + selector);
            return;
        }
        console.log(element.classList);
        element.classList.toggle(className);
    }


</script>