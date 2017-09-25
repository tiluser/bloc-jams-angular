(function() {
     function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};
          var currentAlbum = Fixtures.getAlbum();
          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;
          /**
          * @function setSong
          * @desc stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
          var setSong = function (song) {
              if (currentBuzzObject) {
                  currentBuzzObject.stop();
                  SongPlayer.currentSong.playing = null;
              }

              currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
              });

              currentBuzzObject.bind('volumechange', function () {
                  $rootScope.$apply(function () {
                      SongPlayer.volume = currentBuzzObject.getVolume();
                  });
              });

              currentBuzzObject.bind('timeupdate', function () {
                  $rootScope.$apply(function () {
                      SongPlayer.currentTime = currentBuzzObject.getTime();
                  });
              });
              SongPlayer.currentSong = song;
          };

          /**
          * @function playSong
          * @desc plays the audio file in currentBuzzObject
          * @param {Object} song
          */
          var playSong = function (song) {
              currentBuzzObject.play();
              song.playing = true;
          }

          /*
          * @function getSongIndex
            @desc Gets the index of the current song
            @returns songIndex
          */
          var getSongIndex = function (song) {
              return currentAlbum.songs.indexOf(song);
          };

          /*
          * @function stopSong
          * @desc Stops the current song from playing.
          * @param {Object} song
          */
          var stopSong = function (song) {
              currentBuzzObject.stop();
              song.playing = null;
          }

          /**
          * @desc Active song object from list of songs
          * @type {Object}
          */
          SongPlayer.currentSong = null;

          /**
          * @desc Current playback time (in seconds) of currently playing song
          * @type {Number}
          */
          SongPlayer.currentTime = null;

          /**
          * @function play
          * @desc Play current or new song
          * @param {Object} song
          */
          SongPlayer.play = function (song) {
              song = song || SongPlayer.currentSong;
              if (SongPlayer.currentSong !== song) {
                  setSong(song);
                  playSong(song);
              }
              else if (SongPlayer.currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                      currentBuzzObject.play();
                  }
              }
          };

          /**
          * @function pause
          * @desc Pause current song
          * @param {Object} song
          */
          SongPlayer.pause = function(song) {
               song = song || SongPlayer.currentSong;
               currentBuzzObject.pause();
               song.playing = false;
           };
           /**
           * @function previous
           * @desc Decrements current song index and sets the song accordingly
           */
           SongPlayer.previous = function () {
               var currentSongIndex = getSongIndex(SongPlayer.currentSong);
               currentSongIndex--;

               if (currentSongIndex < 0) {
                   stopSong(SongPlayer.currentSong);
               }
               else {
                   var song = currentAlbum.songs[currentSongIndex];
                   setSong(song);
                   playSong(song);
               }
           };

           /*
           * @function next
             @desc Increments current song index and sets the song accordingly
           */
           SongPlayer.next = function () {
               var currentSongIndex = getSongIndex(SongPlayer.currentSong);
               var songsLength = currentAlbum.songs.length;
               currentSongIndex++;

               if (currentSongIndex > songsLength) {
                   stopSong(SongPlayer.currentSong);
               }
               else {
                   var song = currentAlbum.songs[currentSongIndex];
                   setSong(song);
                   playSong(song);
               }
           };

           /**
            * @function setCurrentTime
            * @desc Set current time (in seconds) of currently playing song
            * @param {Number} time
            */
            SongPlayer.setCurrentTime = function (time) {
                if (currentBuzzObject) {
                    currentBuzzObject.setTime(time);
                }
            };

            /**
            * @desc Volume of currently playing song from 0-100
            * @type {Number}
            */
  //          SongPlayer.volume = 80;

            SongPlayer.volume = null;

            /**
             * @function setVolume
             * @desc Set volume of currently playing song from 0-100
             * @param {Number} volume
             */
             SongPlayer.setVolume = function (volume) {
                 if (currentBuzzObject) {
                     currentBuzzObject.setVolume(volume);
                 }
             };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
