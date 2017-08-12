<?php
get_header();
?>

<h1>This is my special Home page</h1>

<h4>It contains this widget. Section (home page widget)</h4>
<?php
if (is_active_sidebar("home_page_widget")) {
    ?>
    <div class="home_page_widget">
        <?php dynamic_sidebar("home_page_widget")?>
    </div>
    <?php
}
?>

<?php
get_footer();
?>