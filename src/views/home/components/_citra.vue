<template>
    <div class="citra-wrapper">
	   <video muted>
		     <source src="https://www.youtube.com/watch?v=8LeQN249Jqw" type="video/mp4">
		     Your browser does not support the video tag.
	   </video>
     
     <div class="btn-play" ><v-icon name="heart" base-class="icon-20"></v-icon></div>
     <div class="container overlay-desc">       
        <h2>CITRA</h2>
        <h1>Wayne's World</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...</p>
        <div>spacer</div>
        <div>BOIM | 3 Hari yang lalu</div>
     </div>
	</div>
</template>
<style>
.citra-wrapper {
  position: relative;
}
video {
    height: auto;
    max-width: 100%;
    vertical-align: middle; 
}

.btn-play {
  
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.overlay-desc {
  background: rgba(0,0,0,0);
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  display: flex;
  //align-items: flex-end;
  justify-content: flex-end;
  color: white;  
  flex-direction: column;
}
h1, h2, p {   
  margin:0;  
}
</style>