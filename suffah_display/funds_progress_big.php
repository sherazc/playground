<style>
    .progress_container {
        width: 250px;
        height: 250px;
    }

    .progress {
        width: 250px;
        height: 250px;
        border-radius: 100%;
        transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        background-color: tomato;
        box-shadow: -3px 3px 5px rgba(0, 0, 0, .5);
    }

    .progress_image {
        background: transparent url(images/donation_box_small.png) no-repeat;
        background-size: 75px 66px;
        width: 75px;
        height: 66px;
        position: relative;
        top: -95px;
        left: 90px;
    }

    .progress_status {
        top: -240px;
        text-align: center;
        position: relative;
        color: white;
        font-weight: bold;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, .8);
    }

    .progress_amounts {
        font-size: 20px;
    }

    .fund_progress_container {
        left: 0px;
        right: 0px;
        margin-left: auto;
        margin-right: auto;
        width: 250px;
        height: 250px;
        position: relative;
    }
</style>

<div>
    <div class="heading" style="text-align: center">
        Monthly Funds
    </div>
    <div class="headingSmall" style="text-align: center">
        Target: $7,000 by 07/31/2015
    </div>
    <div class="fund_progress_container">
        <div class="progress_container">
            <div class="progress">
                <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar"
                     aria-valuenow="20" aria-valuemin="0"
                     aria-valuemax="100" style="width: 17%">
                </div>
            </div>
            <div class="progress_image">
            </div>
            <div class="progress_status">
                <div class="progress_amounts">
                    Remaining: $1,215
                    <br/>
                    Collected: $1,215
                </div>
            </div>
        </div>
    </div>

    <div class="heading" style="text-align: center; margin-top: 20px;">
        New Construction Funds
    </div>
    <div class="headingSmall" style="text-align: center">
        Target: $600,000 by 12/31/2015
    </div>

    <div class="fund_progress_container">
        <div class="progress_container">
            <div class="progress">
                <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar"
                     aria-valuenow="20" aria-valuemin="0"
                     aria-valuemax="100" style="width: 17%">
                </div>
            </div>
            <div class="progress_image">
            </div>
            <div class="progress_status">
                <div class="progress_amounts">
                    Remaining: $1,215
                    <br/>
                    Collected: $150,000
                </div>
            </div>
        </div>
    </div>
</div>
