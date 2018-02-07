<template>
    <div class="container">
        <h1>This is Top Slider </h1>
    </div><!--.container-->
</template>


<script>
export default {
    name: 'topslider',

    data() {
        return {
            tsc: [
                {
                    'id': 1,
                    'img': 'assets/images/contents/01.jpg',
                    'url': '#',
                    'section_name': 'Section 1',
                    'title': 'Menikmati Hari Pertama Car Free Day di JLNT Antasari',
                    'teaser': 'Posted by Kevin on Friday',
                    'isActive' : true
                },
                {
                    'id': 2,
                    'img': 'assets/images/contents/02.jpg',
                    'url': '#',
                    'section_name': 'Section 2',
                    'title': 'Muntahkan Lahar, Gunung Mayon Siap Meletus',
                    'teaser': 'Posted by Kevin on Friday',
                    'isActive' : false
                },
                {
                    'id': 3,
                    'img': 'assets/images/contents/03.jpg',
                    'url': '#',
                    'section_name': 'Section 3',
                    'title': 'Ribuan Nelayan Minta Kejelasan Terkait Penggunaan Cantrang',
                    'teaser': 'Posted by Kevin on Friday',
                    'isActive' : false
                },
                {
                    'id': 4,
                    'img': 'assets/images/contents/04.jpg',
                    'url': '#',
                    'section_name': 'Section 4',
                    'title': 'Sepeda Federal Vintage',
                    'teaser': 'Posted by Kevin on Friday',
                    'isActive' : false
                },
                {
                    'id': 5,
                    'img': 'assets/images/contents/05.jpg',
                    'url': '#',
                    'section_name': 'Section 4',
                    'title': 'Timnas Islandia Raih Kemenangan Atas Timnas Indonesia',
                    'teaser': 'Posted by Kevin on Friday',
                    'isActive' : false
                },
                {
                    'id': 6,
                    'img': 'assets/images/contents/06.jpg',
                    'url': '#',
                    'section_name': 'Section 4',
                    'title': 'Saksi Seret Nama SBY dalam Sidang Korupsi e-KTP Setya Novanto',
                    'teaser': 'Saksi Seret Nama SBY dalam Sidang Korupsi e-KTP Setya Novanto',
                    'isActive' : false
                },
                {
                    'id': 7,
                    'img': 'assets/images/contents/07.jpg',
                    'url': '#',
                    'section_name': 'Section 4',
                    'title': 'SMP Darul Hikam Gelar Try Out Ujian Nasional (UN) SD/MI 2017',
                    'teaser': 'SMP Darul Hikam Gelar Try Out Ujian Nasional (UN) SD/MI 2017',
                    'isActive' : false
                },
                {
                    'id': 8,
                    'img': 'assets/images/contents/08.jpg',
                    'url': '#',
                    'section_name': 'Section 4',
                    'title': 'Persela Lamongan Imbangi Bhayangkara FC',
                    'teaser': 'Posted by Kevin on Friday',
                    'isActive' : false
                },
                {
                    'id': 9,
                    'img': 'assets/images/contents/09.jpg',
                    'url': '#',
                    'section_name': 'Section 4',
                    'title': 'Panglima TNI : Pengiriman Satgas Kesehatan TNI Sesuai Konstitusi',
                    'teaser': 'Posted by Kevin on Friday',
                    'isActive' : false
                }
            ]
        }
    }

  
}
</script>

<style>
#TSCarousel {
    margin-left: 100px;
    margin-right: 100px;
}

.tsc .wrapper{
    display: inline-block;
    margin-top: 25px;
    position: relative;
}
.tsc .wrapper img {
    display: block;
    max-width:100%;
}

.tsc .wrapper .overlay {
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height:90%;  
  color:white;
  padding: 6%;
}

.tsc .wrapper .overlay h2 {
  font-size: 12px;
  font-weight: 700;
}

.tsc .wrapper .overlay h2 span {
  background: rgba(10, 47, 136, 0.84);
  padding: 6px;
}

.tsc .wrapper .overlay .title {
  margin-top: 40px;
  font-size: 1em;
  background-color: rgba(0,0,0,0.25);
  padding: 6px;
}

/* The controlsy */
.tsc .carousel-control {	
    height: 40px;
	width: 40px;
    background: none repeat scroll 0 0 #0A2F88;
    border: 4px solid #FFFFFF;
    border-radius: 23px 23px 23px 23px;
    margin-top: auto;
    margin-bottom: auto;
}
.tsc .carousel-control.left {
	margin-left: -50px;
}
.tsc .carousel-control.right {
	margin-right: -50px;
}

.tsc .carousel-control.left span,
.tsc .carousel-control.right span {
	background-color: #0A2F88;
}
.tsc .carousel-control.left span:hover,
.tsc .carousel-control.right span:hover {
	opacity: .7;
	filter: alpha(opacity=70);
}

</style>
