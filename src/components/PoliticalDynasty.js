import React, { useEffect } from 'react';

// Import the images for each artboard
// Adjust these paths to match your project structure
import artboard1Image from '../assets/PoliticalDynasty-Artboard_1.png';
import artboard3Image from '../assets/PoliticalDynasty-Artboard_3.png';
import artboard4Image from '../assets/PoliticalDynasty-Artboard_4.png';

/**
 * PoliticalDynasty Component
 * 
 * A responsive visualization showing median age by sex with
 * three different layouts for various screen sizes.
 */
const PoliticalDynasty = () => {
  useEffect(() => {
    // Handle the ai2html resize function if it exists
    if (window.ResizeAi2html && typeof window.ResizeAi2html === 'function') {
      window.ResizeAi2html();
      
      // Add resize listener
      window.addEventListener('resize', window.ResizeAi2html);
      
      // Cleanup on unmount
      return () => {
        window.removeEventListener('resize', window.ResizeAi2html);
      };
    }
  }, []);

  // This is the ai2html output with image sources replaced
  const htmlContent = `


  
<!-- Generated by ai2html v0.117.6 - 2025-03-10 10:19 -->
<!-- ai file: PoliticalDynasty.ai -->
<style media="screen,print">
	#g-PoliticalDynasty-box ,
	#g-PoliticalDynasty-box .g-artboard {
		margin:0 auto;
	}
	#g-PoliticalDynasty-box p {
		margin:0;
	}
	#g-PoliticalDynasty-box .g-aiAbs {
		position:absolute;
	}
	#g-PoliticalDynasty-box .g-aiImg {
		position:absolute;
		top:0;
		display:block;
		width:100% !important;
	}
	#g-PoliticalDynasty-box .g-aiSymbol {
		position: absolute;
		box-sizing: border-box;
	}
	#g-PoliticalDynasty-box .g-aiPointText p { white-space: nowrap; }
	#g-PoliticalDynasty-Artboard_1 {
		position:relative;
		overflow:hidden;
	}
	#g-PoliticalDynasty-Artboard_1 p {
		font-weight:300;
		line-height:16px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:13px;
		text-align:left;
		color:rgb(33,37,41);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-PoliticalDynasty-Artboard_1 .g-pstyle0 {
		height:16px;
	}
	#g-PoliticalDynasty-Artboard_1 .g-pstyle1 {
		font-weight:400;
		text-align:center;
	}
	#g-PoliticalDynasty-Artboard_3 {
		position:relative;
		overflow:hidden;
	}
	#g-PoliticalDynasty-Artboard_3 p {
		font-weight:300;
		line-height:16px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:13px;
		text-align:left;
		color:rgb(33,37,41);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-PoliticalDynasty-Artboard_3 .g-pstyle0 {
		height:16px;
	}
	#g-PoliticalDynasty-Artboard_3 .g-pstyle1 {
		font-weight:400;
		text-align:center;
	}
	#g-PoliticalDynasty-Artboard_4 {
		position:relative;
		overflow:hidden;
	}
	#g-PoliticalDynasty-Artboard_4 p {
		font-weight:300;
		line-height:16px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:13px;
		text-align:left;
		color:rgb(33,37,41);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-PoliticalDynasty-Artboard_4 .g-pstyle0 {
		height:16px;
	}
	#g-PoliticalDynasty-Artboard_4 .g-pstyle1 {
		font-weight:400;
		text-align:center;
	}

       
    /* Add media queries to control which artboard shows at different screen sizes */
    @media (min-width: 930px) {
      #g-PoliticalDynasty-Artboard_3, #g-PoliticalDynasty-Artboard_4 {
        display: none;
      }
    }
    
    @media (min-width: 560px) and (max-width: 929px) {
      #g-PoliticalDynasty-Artboard_1, #g-PoliticalDynasty-Artboard_4 {
        display: none;
      }
    }
    
    @media (max-width: 559px) {
      #g-PoliticalDynasty-Artboard_1, #g-PoliticalDynasty-Artboard_3 {
        display: none;
      }
    }
  

</style>

<div id="g-PoliticalDynasty-box" class="ai2html">

	<!-- Artboard: Artboard_1 -->
	<div id="g-PoliticalDynasty-Artboard_1" class="g-artboard" style="width:800px; height:351px;" data-aspect-ratio="2.279" data-min-width="800">
<div style=""></div>
		<img id="g-PoliticalDynasty-Artboard_1-img" class="g-PoliticalDynasty-Artboard_1-img g-aiImg" alt="" src="${artboard1Image}"/>
		<div id="g-ai0-1" class="g-md g-aiAbs g-aiPointText" style="top:3.938%;margin-top:-8.8px;left:0.2056%;width:82px;">
			<p class="g-pstyle0">8 bills filed</p>
		</div>
		<div id="g-ai0-2" class="g-md g-aiAbs g-aiPointText" style="top:25.3055%;margin-top:-8.8px;left:0.2056%;width:29px;">
			<p class="g-pstyle0">6</p>
		</div>
		<div id="g-ai0-3" class="g-md g-aiAbs g-aiPointText" style="top:46.673%;margin-top:-8.8px;left:0.2056%;width:29px;">
			<p class="g-pstyle0">4</p>
		</div>
		<div id="g-ai0-4" class="g-md g-aiAbs g-aiPointText" style="top:68.0405%;margin-top:-8.8px;left:0.2056%;width:29px;">
			<p class="g-pstyle0">2</p>
		</div>
		<div id="g-ai0-5" class="g-md g-aiAbs" style="top:86.8946%;left:15.4024%;margin-left:-1.1875%;width:2.375%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai0-6" class="g-md g-aiAbs" style="top:86.8946%;left:26.2984%;margin-left:-1.1875%;width:2.375%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai0-7" class="g-md g-aiAbs" style="top:86.8946%;left:42.7285%;margin-left:-1.1875%;width:2.375%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai0-8" class="g-md g-aiAbs" style="top:86.8946%;left:48.2002%;margin-left:-1.1875%;width:2.375%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai0-9" class="g-md g-aiAbs" style="top:86.8946%;left:59.1586%;margin-left:-1.1875%;width:2.375%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai0-10" class="g-md g-aiAbs" style="top:86.8946%;left:75.5737%;margin-left:-1.1875%;width:2.375%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai0-11" class="g-md g-aiAbs" style="top:86.8946%;left:81.0604%;margin-left:-1.1875%;width:2.375%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai0-12" class="g-md g-aiAbs" style="top:86.8946%;left:91.8839%;margin-left:-1.1875%;width:2.375%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai0-13" class="g-md g-aiAbs" style="top:86.8946%;left:97.3706%;margin-left:-1.1875%;width:2.375%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai0-14" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:2.8832%;width:51px;">
			<p class="g-pstyle0">2007</p>
		</div>
		<div id="g-ai0-15" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:8.3549%;width:51px;">
			<p class="g-pstyle0">2008</p>
		</div>
		<div id="g-ai0-16" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:13.8416%;width:51px;">
			<p class="g-pstyle0">2009</p>
		</div>
		<div id="g-ai0-17" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:19.3133%;width:51px;">
			<p class="g-pstyle0">2010</p>
		</div>
		<div id="g-ai0-18" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:24.785%;width:51px;">
			<p class="g-pstyle0">2011</p>
		</div>
		<div id="g-ai0-19" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:30.2567%;width:51px;">
			<p class="g-pstyle0">2012</p>
		</div>
		<div id="g-ai0-20" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:35.7434%;width:51px;">
			<p class="g-pstyle0">2013</p>
		</div>
		<div id="g-ai0-21" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:41.2151%;width:51px;">
			<p class="g-pstyle0">2014</p>
		</div>
		<div id="g-ai0-22" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:46.6868%;width:51px;">
			<p class="g-pstyle0">2015</p>
		</div>
		<div id="g-ai0-23" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:52.1586%;width:51px;">
			<p class="g-pstyle0">2016</p>
		</div>
		<div id="g-ai0-24" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:57.6453%;width:51px;">
			<p class="g-pstyle0">2017</p>
		</div>
		<div id="g-ai0-25" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:63.1169%;width:51px;">
			<p class="g-pstyle0">2018</p>
		</div>
		<div id="g-ai0-26" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:68.5886%;width:51px;">
			<p class="g-pstyle0">2019</p>
		</div>
		<div id="g-ai0-27" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:74.0603%;width:51px;">
			<p class="g-pstyle0">2020</p>
		</div>
		<div id="g-ai0-28" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:79.547%;width:51px;">
			<p class="g-pstyle0">2021</p>
		</div>
		<div id="g-ai0-29" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:85.0187%;width:51px;">
			<p class="g-pstyle0">2022</p>
		</div>
		<div id="g-ai0-30" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:90.4905%;width:51px;">
			<p class="g-pstyle0">2023</p>
		</div>
		<div id="g-ai0-31" class="g-md g-aiAbs g-aiPointText" style="top:95.9608%;margin-top:-8.8px;left:95.9622%;width:51px;">
			<p class="g-pstyle0">2024</p>
		</div>
	</div>

	<!-- Artboard: Artboard_3 -->
	<div id="g-PoliticalDynasty-Artboard_3" class="g-artboard" style="width:560px; height:354.309110383343px;" data-aspect-ratio="1.581" data-min-width="560" data-max-width="799">
<div style=""></div>
		<img id="g-PoliticalDynasty-Artboard_3-img" class="g-PoliticalDynasty-Artboard_3-img g-aiImg" alt="" src="${artboard3Image}"/>
		<div id="g-ai1-1" class="g-sm g-aiAbs g-aiPointText" style="top:3.3367%;margin-top:-8.8px;left:0.0893%;width:82px;">
			<p class="g-pstyle0">8 bills filed</p>
		</div>
		<div id="g-ai1-2" class="g-sm g-aiAbs g-aiPointText" style="top:24.5047%;margin-top:-8.8px;left:0.0893%;width:29px;">
			<p class="g-pstyle0">6</p>
		</div>
		<div id="g-ai1-3" class="g-sm g-aiAbs g-aiPointText" style="top:45.6726%;margin-top:-8.8px;left:0.0893%;width:29px;">
			<p class="g-pstyle0">4</p>
		</div>
		<div id="g-ai1-4" class="g-sm g-aiAbs g-aiPointText" style="top:66.8406%;margin-top:-8.8px;left:0.0893%;width:29px;">
			<p class="g-pstyle0">2</p>
		</div>
		<div id="g-ai1-5" class="g-sm g-aiAbs" style="top:85.8008%;left:15.8077%;margin-left:-1.6964%;width:3.3929%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai1-6" class="g-sm g-aiAbs" style="top:85.8008%;left:26.7841%;margin-left:-1.6964%;width:3.3929%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai1-7" class="g-sm g-aiAbs" style="top:85.8008%;left:42.819%;margin-left:-1.6964%;width:3.3929%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai1-8" class="g-sm g-aiAbs" style="top:85.8008%;left:48.2179%;margin-left:-1.6964%;width:3.3929%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai1-9" class="g-sm g-aiAbs" style="top:85.8008%;left:59.211%;margin-left:-1.6964%;width:3.3929%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai1-10" class="g-sm g-aiAbs" style="top:85.8008%;left:75.5862%;margin-left:-1.6964%;width:3.3929%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai1-11" class="g-sm g-aiAbs" style="top:85.8008%;left:80.936%;margin-left:-1.6964%;width:3.3929%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai1-12" class="g-sm g-aiAbs" style="top:85.8008%;left:91.7162%;margin-left:-1.6964%;width:3.3929%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai1-13" class="g-sm g-aiAbs" style="top:85.8008%;left:97.3959%;margin-left:-1.6964%;width:3.3929%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai1-14" class="g-sm g-aiAbs g-aiPointText" style="top:96.1935%;margin-top:-8.8px;left:2.7836%;width:51px;">
			<p class="g-pstyle0">2007</p>
		</div>
		<div id="g-ai1-15" class="g-sm g-aiAbs g-aiPointText" style="top:96.1935%;margin-top:-8.8px;left:13.6457%;width:51px;">
			<p class="g-pstyle0">2009</p>
		</div>
		<div id="g-ai1-16" class="g-sm g-aiAbs g-aiPointText" style="top:96.1935%;margin-top:-8.8px;left:24.4931%;width:51px;">
			<p class="g-pstyle0">2011</p>
		</div>
		<div id="g-ai1-17" class="g-sm g-aiAbs g-aiPointText" style="top:96.1935%;margin-top:-8.8px;left:34.9166%;width:51px;">
			<p class="g-pstyle0">2013</p>
		</div>
		<div id="g-ai1-18" class="g-sm g-aiAbs g-aiPointText" style="top:96.1935%;margin-top:-8.8px;left:45.6002%;width:51px;">
			<p class="g-pstyle0">2015</p>
		</div>
		<div id="g-ai1-19" class="g-sm g-aiAbs g-aiPointText" style="top:96.1935%;margin-top:-8.8px;left:56.626%;width:51px;">
			<p class="g-pstyle0">2017</p>
		</div>
		<div id="g-ai1-20" class="g-sm g-aiAbs g-aiPointText" style="top:96.1935%;margin-top:-8.8px;left:67.4881%;width:51px;">
			<p class="g-pstyle0">2019</p>
		</div>
		<div id="g-ai1-21" class="g-sm g-aiAbs g-aiPointText" style="top:96.1935%;margin-top:-8.8px;left:78.1569%;width:51px;">
			<p class="g-pstyle0">2021</p>
		</div>
		<div id="g-ai1-22" class="g-sm g-aiAbs g-aiPointText" style="top:96.1935%;margin-top:-8.8px;left:89.0189%;width:51px;">
			<p class="g-pstyle0">2023</p>
		</div>
	</div>

	<!-- Artboard: Artboard_4 -->
	<div id="g-PoliticalDynasty-Artboard_4" class="g-artboard" style="max-width: 330px;max-height: 356px" data-aspect-ratio="0.926" data-min-width="0" data-max-width="559">
<div style="padding: 0 0 107.9768% 0;"></div>
		<img id="g-PoliticalDynasty-Artboard_4-img" class="g-PoliticalDynasty-Artboard_4-img g-aiImg" alt="" src="${artboard4Image}"/>
		<div id="g-ai2-1" class="g-xs g-aiAbs g-aiPointText" style="top:3.0372%;margin-top:-8.8px;left:0.1516%;width:82px;">
			<p class="g-pstyle0">8 bills filed</p>
		</div>
		<div id="g-ai2-2" class="g-xs g-aiAbs g-aiPointText" style="top:24.0855%;margin-top:-8.8px;left:0.1516%;width:29px;">
			<p class="g-pstyle0">6</p>
		</div>
		<div id="g-ai2-3" class="g-xs g-aiAbs g-aiPointText" style="top:45.1338%;margin-top:-8.8px;left:0.1516%;width:29px;">
			<p class="g-pstyle0">4</p>
		</div>
		<div id="g-ai2-4" class="g-xs g-aiAbs g-aiPointText" style="top:66.1821%;margin-top:-8.8px;left:0.1516%;width:29px;">
			<p class="g-pstyle0">2</p>
		</div>
		<div id="g-ai2-5" class="g-xs g-aiAbs" style="top:85.3157%;left:17.0136%;margin-left:-2.8788%;width:5.7576%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai2-6" class="g-xs g-aiAbs" style="top:85.3157%;left:27.5063%;margin-left:-2.8788%;width:5.7576%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai2-7" class="g-xs g-aiAbs" style="top:85.3157%;left:42.4922%;margin-left:-2.8788%;width:5.7576%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai2-8" class="g-xs g-aiAbs" style="top:85.3157%;left:48.2052%;margin-left:-2.8788%;width:5.7576%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai2-9" class="g-xs g-aiAbs" style="top:85.3157%;left:58.7061%;margin-left:-2.8788%;width:5.7576%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai2-10" class="g-xs g-aiAbs" style="top:85.3157%;left:73.6958%;margin-left:-2.8788%;width:5.7576%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai2-11" class="g-xs g-aiAbs" style="top:85.3157%;left:79.7162%;margin-left:-2.8788%;width:5.7576%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai2-12" class="g-xs g-aiAbs" style="top:85.3157%;left:90.2356%;margin-left:-2.8788%;width:5.7576%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai2-13" class="g-xs g-aiAbs" style="top:85.3157%;left:96.256%;margin-left:-2.8788%;width:5.7576%;">
			<p class="g-pstyle1">0</p>
		</div>
		<div id="g-ai2-14" class="g-xs g-aiAbs g-aiPointText" style="top:95.369%;margin-top:-8.8px;left:1.9319%;width:51px;">
			<p class="g-pstyle0">2007</p>
		</div>
		<div id="g-ai2-15" class="g-xs g-aiAbs g-aiPointText" style="top:95.369%;margin-top:-8.8px;left:12.7567%;width:51px;">
			<p class="g-pstyle0">2009</p>
		</div>
		<div id="g-ai2-16" class="g-xs g-aiAbs g-aiPointText" style="top:95.369%;margin-top:-8.8px;left:22.8928%;width:51px;">
			<p class="g-pstyle0">2011</p>
		</div>
		<div id="g-ai2-17" class="g-xs g-aiAbs g-aiPointText" style="top:95.369%;margin-top:-8.8px;left:33.3464%;width:51px;">
			<p class="g-pstyle0">2013</p>
		</div>
		<div id="g-ai2-18" class="g-xs g-aiAbs g-aiPointText" style="top:95.369%;margin-top:-8.8px;left:43.7856%;width:51px;">
			<p class="g-pstyle0">2015</p>
		</div>
		<div id="g-ai2-19" class="g-xs g-aiAbs g-aiPointText" style="top:95.369%;margin-top:-8.8px;left:54.5423%;width:51px;">
			<p class="g-pstyle0">2017</p>
		</div>
		<div id="g-ai2-20" class="g-xs g-aiAbs g-aiPointText" style="top:95.369%;margin-top:-8.8px;left:65.5875%;width:51px;">
			<p class="g-pstyle0">2019</p>
		</div>
		<div id="g-ai2-21" class="g-xs g-aiAbs g-aiPointText" style="top:95.369%;margin-top:-8.8px;left:75.5032%;width:51px;">
			<p class="g-pstyle0">2021</p>
		</div>
		<div id="g-ai2-22" class="g-xs g-aiAbs g-aiPointText" style="top:95.369%;margin-top:-8.8px;left:85.9583%;width:51px;">
			<p class="g-pstyle0">2023</p>
		</div>
	</div>

</div>

<!-- End ai2html - 2025-03-10 10:19 -->

  `;

  return (
    <div 
      className="politicaldynasty-chart-container"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default PoliticalDynasty;