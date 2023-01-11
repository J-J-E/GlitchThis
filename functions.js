function showValue(newValue) {
        document.getElementById("rangeValue").innerHTML = newValue;
      }

class ImageParser{

    constructor(){

        window.ImageParser = this;

        this.canvasA = document.createElement("canvas");
        this.canvasB = document.getElementById("canvasB");
        this.ctx_a = this.canvasA.getContext("2d");
        this.ctx_b = this.canvasB.getContext("2d");

        this.sourceImage = document.getElementById('image');

        // Default Glitch properties
        this.glitcher = new ImageGlitcher();
        this.glitchScanlines = true;
        this.glitchColors = true;
        this.glitchAmount = 5;
		this.blurIntensity = 0;

        this.image_data = {
            input : null, output:null,
            width : 0, height: 0
        };

        // Settings
        this.domGlitchAmount = document.getElementById("glitchAmount");
        this.domGlitchColors = document.getElementById("glitchColors");
        this.domGlitchScanLines = document.getElementById("scanLines");
		this.domblurIntensity = document.getElementById("blurIntensity");


        this.domGlitchAmount.addEventListener('change', window.ImageParser.syncSettings);
        this.domGlitchAmount.addEventListener('update', window.ImageParser.syncSettings);
        this.domGlitchColors.addEventListener('change', window.ImageParser.syncSettings);
        this.domGlitchScanLines.addEventListener('change', window.ImageParser.syncSettings);
		this.domblurIntensity.addEventListener('change', window.ImageParser.syncSettings);
        this.domblurIntensity.addEventListener('update', window.ImageParser.syncSettings);


        window.ImageParser.processImageFrame();

        this.imageInput = document.getElementById("customImage");
		this.imageInput.addEventListener('change', function (e) {
			for (const file of Array.from(this.files)) {
				if (file.type.startsWith('image/')) {
					window.ImageParser.loadImageByUrl(URL.createObjectURL(file));
					window.ImageParser.fileName = file.name;
					break;
				} else {
					alert("Invalid file type, please select an image file.");
				}
			}
		}, false);

		document.getElementById("file-selector-btn").addEventListener("click", function() {
		  var fileInput = document.getElementById("customImage");
		  fileInput.addEventListener("change", function() {
			if(isValidFileType(fileInput.files[0])) {
				document.getElementById("customText").value = fileInput.files[0].name;
			} else {
				document.getElementById("customText").value = "Image Files Only";
			}
		  });
		  fileInput.click();
		});

		function isValidFileType(file) {
		  var fileType = file.type.split('/')[0];
		  if(fileType === 'image'){
			return true;
		  }
		  return false;
		}

        this.manualGlitchButton = document.getElementById("reapplyGlitchBtn");
        this.manualGlitchButton.addEventListener('click', function() {
            window.ImageParser.processImageFrame();
        });

        this.downloadBtn = document.getElementById("downloadBtn");
        this.downloadBtn.addEventListener('click', function() {
            window.ImageParser.downloadGlitchedImage();
        });


        this.selectors = document.getElementsByClassName("sourceSelector");
        for(var s of this.selectors){
            s.addEventListener('click', function(e){
                var imgP = window.ImageParser;
                var rel = e.target.getAttribute("rel");
                for(var s of imgP.selectors){
                    s.className = "sourceSelector";
                    let localRel = s.getAttribute("rel");
                    if(rel == localRel){
                        s.className+=" active";
                    }
                    document.getElementById(localRel).className = "hidden";
                }
                document.getElementById(rel).className = "";


            });
        }


    }

    syncSettings(e){
        var pThis = window.ImageParser;
        pThis.glitchAmount = pThis.domGlitchAmount.value;
        pThis.glitchColors = pThis.domGlitchColors.checked ;
        pThis.glitchScanlines = pThis.domGlitchScanLines.checked;
		pThis.blurIntensity = pThis.domblurIntensity.value;
    }

    adjustCanvasSize(w,h){
        var pThis = window.ImageParser;
        pThis.canvasA.width = w;
        pThis.canvasA.height = h;
        pThis.canvasB.width = w;
        pThis.canvasB.height = h;
        pThis.ctx_b.fillStyle = "black";
        pThis.ctx_b.fillRect(0, 0, w,h);
    }

    loadImageByUrl(url){
        var imgP = window.ImageParser;
        imgP.sourceImage.onload = function(ev){
            // Set the canvas values to match the image source dimensions
            imgP.processImageFrame();
        }
        imgP.sourceImage.src = url;
    }

    processImageFrame(){
        var imgP = window.ImageParser;

        var w = imgP.sourceImage.naturalWidth;
        var h = imgP.sourceImage.naturalHeight;

        imgP.adjustCanvasSize(w,h);

        imgP.ctx_a.drawImage(imgP.sourceImage,0,0);
        imgP.ctx_b.drawImage(imgP.sourceImage,0,0);
        imgP.image_data.width = w;
        imgP.image_data.height = h;
        imgP.image_data.input = imgP.ctx_a.getImageData(0,0, w,h);
        imgP.image_data.output = imgP.ctx_b.getImageData(0,0, w,h);

        // do the glitch processing
        imgP.glitcher.glitch_image(imgP.image_data, imgP.glitchAmount, imgP.glitchColors, imgP.glitchScanlines, imgP.blurIntensity, 0);
        imgP.ctx_b.putImageData(imgP.image_data.output, 0, 0);
    }

    downloadGlitchedImage(){
        var imgP = window.ImageParser;
        let image = imgP.canvasB.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = (this.fileName ? this.fileName : 'glitched_default.png').replace(/.png$/,'_glitched.png')
        link.href = image;
        link.click();
    }

}