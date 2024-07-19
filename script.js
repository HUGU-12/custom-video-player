const player = document.querySelector('.player');
const video = player.querySelector('.video-area');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress-fill');
const toggle = player.querySelector('.playBtn');
const skipButtons = player.querySelectorAll('button[data-skip]');
const sliderRanges = player.querySelectorAll('.slider');

//track play and pause state of video and change play button icon
function togglePlay(){
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  const icon = video.paused ? '▶️': '⏸️';
  toggle.textContent = icon;
  console.log(icon);
}
//forward and backward skip buttons
function skip(event){
  const skipValue = parseFloat(event.target.dataset.skip);//examine the value in the dataset(data-skip)
  video.currentTime += skipValue;
}
//volume and speed rate
function handleRangeInput(){
  if(this.name === 'volume'){
    video.volume = this.value / 100;
    if(video.volume === 0){
      video.muted = true;
    }else{
      video.muted = false;
    }
  }
  if(this.name === 'playbackRate'){
    video.playbackRate = parseFloat(this.value);
  }
}

//progress
function updateProgressBar(){
  const progressPercentage = (video.currentTime / video.duration)*100;
  progressBar.style.width = `${progressPercentage}%`;
}

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
//event listeners
toggle.addEventListener('click',togglePlay);
skipButtons.forEach(btn =>btn.addEventListener('click',skip));
sliderRanges.forEach(range => range.addEventListener('input',handleRangeInput));
video.addEventListener('timeupdate',updateProgressBar);

let mousedown = false
progress.addEventListener('click',scrub);
progress.addEventListener('mousedown',()=>mousedown = true);
progress.addEventListener('mousemove',e=> mousedown && scrub);
progress.addEventListener('mouseup',()=> mousedown = false);
