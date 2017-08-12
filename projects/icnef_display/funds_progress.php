<style>
    .progress_container {
        width: 200px;
        height: 200px;

    }

    .progress {
        width: 200px;
        height: 200px;
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
        left: 65px;
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

    .progress_end {
        /*margin-top: 30px;*/
        font-size: 16px;
    }
    /**/
    /*.funds_left {*/
        /*float: left;*/
        /*width: 300px;*/
        /*height: 228px;*/
        /*margin: 0px;*/

    /*}*/
    /*.funds_right {*/
        /*float: right;*/
        /*width: 300px;*/
        /*height: 228px;*/
        /*margin: 0px;*/
    /*}*/

    .fund_heading {
        font-size: 25px;
        color: #B38934;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, .8);
        font-weight: bold;
    }
</style>


<div>
    <div class="weather_left">
        <div class="fund_heading">
            Monthly Funds
        </div>
        <div class="progress_container center">
            <div class="progress">
                <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar"
                     aria-valuenow="20" aria-valuemin="0"
                     aria-valuemax="100" style="width: 28%">
                </div>
            </div>
            <div class="progress_image">
            </div>
            <div class="progress_status">
                <div class="progress_amounts">
                    Target: $7,000<br/>
                    Current: $1,961<br/>
                    Remaining: $5,039
                </div>
                <div class="progress_end">
                    End Date: 07/31/2015
                </div>
            </div>
        </div>


    </div>
    <div class="weather_right">
        <div class="fund_heading">
            Yearly Fundraising
        </div>
        <div class="progress_container center">
            <div class="progress">
                <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar"
                     aria-valuenow="20" aria-valuemin="0"
                     aria-valuemax="100" style="width: 25%">
                </div>
            </div>
            <div class="progress_image">
            </div>
            <div class="progress_status">
                <div class="progress_amounts">
                    Target: $600,000
                    Current: $150,000
                </div>
                <div class="progress_end">
                    End Date: 12/31/2015
                </div>
            </div>
        </div>
    </div>
</div>