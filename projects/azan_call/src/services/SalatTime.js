export default class SalatTime {
    constructor(serviceUrl) {
        this.serviceUrl = serviceUrl;
    }

    reteriveTodaysSchedule() {
        fetch('http://dashboard.masjidhamzah.com/salat_time.php')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);

                /*
                  let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                  isLoading: false,
                  dataSource: ds.cloneWithRows(responseJson.movies),
                }, function() {
                  // do something with new state
                });
                */
            })
            .catch((error) => {
                console.error(error);
            });
    }
}