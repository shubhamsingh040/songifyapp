



var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0;





 $('.welcome-screen button').on('click', function() {
    var name = $('#name-input').val();
    if (name.length > 2) {
        var message = "Welcome, " + name;
        $('.main .user-name').text(message);
        $('.welcome-screen').addClass('hidden');
        $('.main').removeClass('hidden');
    } else {
        $('#name-input').addClass('error');
    }
});
function fancyTimeFormat(time)
{
 // Hours, minutes and seconds
 var hrs = ~~(time / 3600);
 var mins = ~~((time % 3600) / 60);
 var secs = time % 60;

 // Output like "1:01" or "4:03:59" or "123:03:59"
 var ret = "";

 if (hrs > 0) {
     ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
 }

 ret += "" + mins + ":" + (secs < 10 ? "0" : "");
 ret += "" + secs;
 return ret;
}

function toggleSong() {

var song = document.querySelector('audio');
if(song.paused == true) {
console.log('Playing');
$('.play-icon').removeClass('fa-play').addClass('fa-pause');
song.play();
}
else {
console.log('Pausing');
$('.play-icon').removeClass('fa-pause').addClass('fa-play');
song.pause();
}
}

function updateCurrentTime() {
var song = document.querySelector('audio');
var currentTime = Math.floor(song.currentTime);
currentTime = fancyTimeFormat(currentTime);
var duration = Math.floor(song.duration);
duration = fancyTimeFormat(duration)
$('.time-elapsed').text(currentTime);
$('.song-duration').text(duration);
}

$('.play-icon').on('click', function() {
  toggleSong();

});
$('body').on('keypress',function(event) {
    var target = event.target;
    if (event.keyCode == 32 && target.tagName !='INPUT')
    {
        toggleSong();
    }
});

//         var songList = ['Chenna Mereya' , 'Humma song' ,  'Nashe Si Chadh GAi' , 'The Breakup Song'];
// var fileNames=['song1.mp3' , 'song2.mp3' , 'song3.mp3' , ' song4.mp3'  ]
// var artistList = [' Arijit Singh','Badshah, Jubin Nautiyal, Shashaa Tirupati','Arijit Singh','Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi'];
// var albumList = ['Ae Dil Hai Mushkil','Ok Jaanu','Befikre','Ae Dil Hai Mushkil'];
// var durationList = ['2:45','3:15','2:34','2:29'];

var songs = [{
        'name': 'Badri Ki Dulhania (Title Track)',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
       'fileName': 'song1.mp3',
       'image':'song1.jpg'
    },
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
        'image':'song2.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
        'image':'song3.jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
        'image':'song4.jpg'
    }]



        window.onload = function(){
    //
    //       $('#song1 .song-name').text(songList[0]);
    // $('#song2 .song-name').text(songList[1]);
    // $('#song3 .song-name').text(songList[2]);
    // $('#song4 .song-name').text(songList[3]);
    // $('#song1 .song-artist').text(artistList[0]);
    // $('#song2 .song-artist').text(artistList[1]);
    // $('#song3 .song-artist').text(artistList[2]);
    // $('#song4 .song-artist').text(artistList[3]);

    function changeCurrentSongDetails(songObj) {
        $('.current-song-image').attr('src','img/' + songObj.image)
        $('.current-song-name').text(songObj.name)
        $('.current-song-album').text(songObj.album)
    }

    function timeJump() {
        var song = document.querySelector('audio')
        song.currentTime = song.duration - 5;
    }



        function addSongNameClickEvent(songObj,position) {
            //  hamne machine bnai and usme user ko input dalne ki facelity di hai as song name and position..
var songName=songObj.fileName
    var id = '#song' + position;  //  ek variable main #song + position ko joda hai agr position 1 hogi to id #song 1 hogi...
$(id).click(function() {
var audio = document.querySelector('audio');
var currentSong = audio.src;
if(currentSong.search(songName) != -1)
{
toggleSong();
}
else {
audio.src = songName;
toggleSong();
changeCurrentSongDetails(songObj);
}
});
}

changeCurrentSongDetails(songs[0]);

for(var i =0; i < songs.length;i++) {
     var obj = songs[i];
     var name = '#song' + (i+1);
     var song = $(name);
     song.find('.song-name').text(obj.name);
     song.find('.song-artist').text(obj.artist);
     song.find('.song-album').text(obj.album);
     song.find('.song-length').text(obj.duration);
     addSongNameClickEvent(obj,i+1)
 }

 $('#songs').DataTable({
         paging: false
     });


        updateCurrentTime();
        setInterval(function() {
        updateCurrentTime();
        },1000);
        }

        $('.fa-repeat').on('click',function() {
            $('.fa-repeat').toggleClass('disabled')
            willLoop = 1 - willLoop;
        });

        $('.fa-random').on('click',function() {
            $('.fa-random').toggleClass('disabled')
            willShuffle = 1 - willShuffle;
        });





        $('audio').on('ended',function(){
          var audio = document.querySelector('audio');
          if(willLoop==1)
        {
          if(currentSongNumber<songs.length)
          {
            var nextsong = songs[songNumber];
            audio.src = "songs/"+ nextsong.filename;
            changeCurrentSongDetails(nextsong);
            toggleSong();
            currentSongNumber = currentSongNumber+1;
        }
        else{
          var nextsong  = songs[0];
          audio.src = "songs/" + nextsong.filename;
          toggleSong();
          changeCurrentSongDetails(nextsong);
          currentSongNumber = 0;
        }
        }
        });
        // }
        // else{
        //   $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        //   audio.currentTime = 0;
        // }













         $('audio').on('ended',function() { // audio k end hone p functn chlana
           var audio = document.querySelector('audio');
          if(currentSongNumber < 5) {
            //play nxt song
            var nextSongObj = songs[currentSongNumber]; //sbs phle currntsongno k value 0 hogi songs[0]mtlb no 1 p song h jo
            audio.src = nextSongObj.fileName; //change krdya source ko
            toggleSong();
            changeCurrentSongDetails(nextSongObj); // update img
            currentSongNumber = currentSongNumber + 1; // change state
          }
          else{
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');//else icon chnge krk
            audio.currentTime = 0; //audio ka currnt time 0 krdo
           //stop playing
          }
         })












        $('.next-icon').on('click',function() { //nxt-icon p click krk event hoga
          var audio = document.querySelector('audio');
          if(currentSongNumber < 5) { // if currentSongNumber less thn 5 tb  chlna ye
            var next = songs[currentSongNumber]; // eg- songs[0]=1st song
            audio.src = next.fileName;   // audio k source k chnge krdo
            toggleSong();                    //toggle funcn kro
            changeCurrentSongDetails(next);   // current details bhi chnge krd img vgrh
            currentSongNumber = currentSongNumber + 1;  // fr incremnt krdo usko 1 s

          }
        else{ //nhi toh
        currentSongNumber = 0; // vps s frst song p le aa
        }
        })


        $('.back-icon').on('click',function() {  //back-icon k clss p click hone p
          var audio = document.querySelector('audio');
          if(currentSongNumber > 0 && currentSongNumber < 5) { //agr currentsongno 0 k bda h or 5 s chota tb ye krna
            var back = songs[currentSongNumber - 1];
            audio.src = back.fileName;
            toggleSong();
            changeCurrentSongDetails(back);
            currentSongNumber = currentSongNumber - 1; // decremnt krdo

          }
        })

        //progress bar k liye funcn bnaya
        function updateTimer(){
          var song = document.querySelector('audio');
          var ct = song.currentTime;
          var td = song.duration;
          var percentage = (ct/td)*100;
          $('.progress-filled').css('width',percentage+"%");//progress-filled k clss k css m jo percnt aaya h vo width krdo

        }

        $('.player-progress').click(function(event){ //jb bhi player progress k clss m click ho
          var $this = $(this);
          var widthclicked = event.pageX - $this.offset().left; // left s kitni duri p pointer click k position h
          var totalWidth = $this.width(); //or jitni width aayi h store krdo
          var calc = (widthclicked / totalWidth) * 100;
          var song = document.querySelector('audio');
          song.currentTime = (song.duration*calc)/100;
        });
