<?php
get_header();
if (have_posts()) {
    while (have_posts()) {
        the_post();
        ?>
<div class="clearfix">

    <article class="post">
        <h4>
            This is new content page dedicated just to portfolio. page-portfolio.php (Page Template)
        </h4>
        <div class="title-column">
            <h2>
                <?php the_title(); ?>
            </h2>
        </div>

        <div class="text-column">
            <?php the_content(); ?>
        </div>
    </article>
</div>
        <?php
    }

} else {
    ?>
    <p>No content found</p>
    <?php
}

get_footer();
?>