(function () {
    function AlbumCtrl(Fixtures, SongPlayer, $window, $scope) {
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
        $scope.test = function(text) {
            $window.alert(text);
        }
        $scope.removeSong = function (songs, songIndex) {
            songs.splice(songIndex,1);
        };
    }
    angular
        .module("blocJams")
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer','$window', '$scope', AlbumCtrl]);
})();
