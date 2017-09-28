(function () {
    function AddSongsModalCtrl($scope, $window, Fixtures) {
        this.title = "Add a song to the playlist";
        this.newSong = "";
        this.songPlaceHolder = "Enter new song name here";
        this.albumData = Fixtures.getAlbum();
        this.generalPool = Fixtures.getGeneralPool();

       that = this;
       var isSongPresent = function (songName) {
           for (var i = 0; i < that.albumData.songs.length; i++) {
               if (that.albumData.songs[i].title === songName) {
                   return true;
               }
           }
           return false;
       };

       $scope.addSong = function (songs, songIndex) {
           var songName = that.generalPool.songs[songIndex].title;
           if (isSongPresent(songName) === true) {
                $window.alert("Error: song is already in the playlist");
           }
           else {
               that.albumData.songs.push(that.generalPool.songs[songIndex]);
           }
       };
    }
    angular
        .module('blocJams')
        .controller('AddSongsModalCtrl', ['$scope', '$window', 'Fixtures', AddSongsModalCtrl]);
})();
