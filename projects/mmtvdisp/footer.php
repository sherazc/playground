<style>
    .footer {
        display: table;
        width: 100%;
        height: 160px;
        position: relative;
        bottom: -24px;
        /*top: 100%;*/
        box-shadow: 0px -3px 5px rgba(0, 0, 0, 0.5);
        /*color: #f7f7f7;*/
        background-color: rgba(6, 57, 97, 0.95);
        background: transparent url("images/bottom_bar.png") top center no-repeat;
    }
    .footer > div {
        display: table-cell;
        text-align: center;
    }
    .footer_corner_fixed {
        /*width: 150px;*/
    }
    .footer_middle_fluid {
        /*background: transparent url("images/footer_middle_repeat.png") top center repeat-x;*/
    }

    .footer_bg_corner_repeat {
        background: transparent url("images/footer_corner_repeat.png") top center repeat-x;
        width: 0px;
    }

    .footer_bg_curve_left {
        /*background: transparent url("images/footer_curve_left.png") top center no-repeat;*/
        background: transparent url("images/footer_trangle2_left.png") top center no-repeat;
        width: 125px;
    }
    .footer_bg_curve_right {
        /*background: transparent url("images/footer_curve_right.png") top center no-repeat;*/
        background: transparent url("images/footer_trangle2_right.png") top center no-repeat;
        width: 125px;
    }

    .ticker {
        width: 100%;
        height: 160px;
        overflow: hidden;
    }

    ul.ticker {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    ul.tickerul li {
        list-style: none;
        height:160px;
        padding:7px;
        /*border-bottom: 1px solid #15a1c7;*/
        font-size: 35px;
        /*text-shadow: 1px 1px 2px rgba(0, 0, 0, .8);*/
        color: rgb(243, 207, 29);
    }

</style>
<script>
    function ticker() {
        $('#ticker li:first').slideUp(function() {
            $(this).appendTo($('#ticker')).slideDown();
        });
    }

    setInterval(function(){ ticker(); }, 20000);
</script>
<div id="footer" class = "footer">
    <div class = "footer_middle_fluid">

        <div class="ticker">
            <ul id="ticker" class="tickerul">
            </ul>
        </div>
    </div>
</div>
