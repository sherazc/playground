<div class="heading" style="text-align: center; margin-top: 40px; margin-bottom: 10px;">
    Quran
</div>
<!-- qrotd-widget -->

<style>

    #reminder-widget-container {
        width: 500px;
    }

    #reminder_table {
        font-family: Arial;
        text-align: center;
        background-color: #fff8eb;
        border-radius: 5px;
        box-shadow: 1px 1px 2px #888888;
        border: 0;
        border-spacing: 0px;
        border-collapse: separate;
        font-size: 12px;
        color: #444;
        margin: 0 auto;
    }

    .surahTitle {
        font-family: 'saleem';
        font-size: 14px;
    }

    .bismillah {
        font-family: 'saleem';
        color: #062707;
        font-size: 18px;
    }

    .surahTitleDescription {
        font-size: 10px;
    }

    .ayaArabic {
        font-family: 'saleem';
        color: #062707;
        font-size: 25px;
        background-color: #cbdfcc;
    }

    .ayaTranslation {
    }

    .ayaNumber {
        background-color: #cbdfcc;
    }

    .ayaTranslationName {
        font-size: 10px;
        color: #666;
    }
</style>

<script type="application/javascript" src="http://quran-rotd.rhcloud.com/static/reminder-widget-script"></script>
<div id="reminder-widget-container" style="margin: 0 auto; margin-top: 5px;"></div>
<!--/ qrotd-widget -->
<?php
if ($result = $db->query("SELECT * FROM hadith_of_the_day where id=mod((SELECT DATEDIFF(now(),'2015-01-01')), (select count(*) from hadith_of_the_day))")) {
    if ($count = $result->num_rows) {
        $todayHadith = $result->fetch_object();
    }
}

if (isset($todayHadith)) {
    ?>
    <div class="heading" style="text-align: center;margin-top: 10px;">
        Hadith
    </div>
    <blockquote class="descriptionText">
        <?= $todayHadith->hadith_text ?>
        <footer><?= $todayHadith->source_reference ?></footer>
    </blockquote>

    <?php
}
?>
