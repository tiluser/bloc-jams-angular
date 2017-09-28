(function () {
    function AddSongsModalCtrl($scope, $window, Fixtures) {
        this.title = "Add a song to the playlist";
        this.newSong = "";
        this.songPlaceHolder = "Enter new song name here";
        this.albumData = Fixtures.getAlbum();
        this.generalPool = Fixtures.getGeneralPool();

       that = this;
       $scope.addSong = function (songs, songIndex) {
           that.albumData.songs.push(that.generalPool.songs[songIndex]);
       };
    }
    angular
        .module('blocJams')
        .controller('AddSongsModalCtrl', ['$scope', '$window', 'Fixtures', AddSongsModalCtrl]);
})();
