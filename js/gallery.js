"use strict";
    function nextThumbs(thumbs){
        
        let activeThumbI = parseInt(thumbs[0].parentElement.dataset.activeThumb),
            newThumbI = activeThumbI,
            tTumb = 4;
        if(activeThumbI < thumbs.length){
            thumbs[0].parentElement.querySelectorAll('.activeThumb').forEach(actT => {
                actT.style.top = generateRandomNumber(2 , 90)+"%";
                actT.style.left = generateRandomNumber(2 , 90)+"%";
                actT.style.transform = `translate3d(0,0,0) rotateY(180deg) rotate(${generateRandomNumber(-30 , 30)}deg)`;
                actT.className = 'item';
            });
        }
        for(var i = 0; i <= (tTumb-1); i++){
            if((activeThumbI+i) < thumbs.length){
                thumbs[activeThumbI+i].classList.add('activeThumb');
                thumbs[activeThumbI+i].classList.add('aT'+i);
                newThumbI++;
            }
        }
        thumbs[0].parentElement.dataset.activeThumb = newThumbI;
    }
    function preThumbs(thumbs){
        let activeThumbI = parseInt(thumbs[0].parentElement.dataset.activeThumb),
            newThumbI = activeThumbI,
            tTumb = 4;
            
        if(activeThumbI-((tTumb*2)-1) >= 0){
            thumbs[0].parentElement.querySelectorAll('.activeThumb').forEach(actT => {
                actT.style.top = generateRandomNumber(2 , 90)+"%";
                actT.style.left = generateRandomNumber(2 , 90)+"%";
                actT.style.transform = `translate3d(0,0,0) rotateY(-180deg) rotate(${generateRandomNumber(-30 , 30)}deg)`;
                actT.className = 'item';
            });
        }
        for(var i = 0; i <= (tTumb-1); i++){
            if(activeThumbI-((tTumb*2)-i) >= 0){
                thumbs[activeThumbI-((tTumb*2)-i)].classList.add('activeThumb');
                thumbs[activeThumbI-((tTumb*2)-i)].classList.add('aT'+i);
                newThumbI--;
            }
        }
        thumbs[0].parentElement.dataset.activeThumb = newThumbI;
    }
    function initializeGrid(thumbs){
        let parentE = thumbs[0].parentElement;
        parentE.dataset.activeThumb = 0;
        parentE.dataset.xState = 0;
        parentE.dataset.yState = 0;
        thumbs.forEach(item => {
            item.style.top = generateRandomNumber(2 , 90)+"%"; 
            item.style.left = generateRandomNumber(2 , 90)+"%";
            item.style.transform = `translate3d(0,0,0) rotateY(-180deg) rotate(${generateRandomNumber(-30 , 30)}deg)`;
        });
        nextThumbs(thumbs);
        parentE.addEventListener('mousedown', function(e){
            parentE.dataset.xState = e.clientX;
            parentE.dataset.yState = e.clientY;
        });
        parentE.addEventListener('mousemove', function(e){
            if(parentE.dataset.yState != 0){
                if(Math.abs(parentE.dataset.xState - e.clientX) < 60){
                    if((parentE.dataset.yState - e.clientY) > 50){
                        nextThumbs(thumbs);
                        parentE.dataset.xState = e.clientX;
                        parentE.dataset.yState = e.clientY;
                    } else if((parentE.dataset.yState - e.clientY) < -50){
                        preThumbs(thumbs);
                        parentE.dataset.xState = e.clientX;
                        parentE.dataset.yState = e.clientY;
                    }
                }
            }
        });
        parentE.addEventListener('mouseup', function(){
            if(parentE.dataset.yState != 0){
                parentE.dataset.xState = 0;
                parentE.dataset.yState = 0;
            }
        });
        parentE.addEventListener('touchstart', function(e){
            parentE.dataset.xState = e.touches[0].clientX;
            parentE.dataset.yState = e.touches[0].clientY;
        });
        parentE.addEventListener('touchmove', function(e){
            if(parentE.dataset.yState != 0){
                if(Math.abs(parentE.dataset.xState - e.touches[0].clientX) < 60){
                    if((parentE.dataset.yState - e.touches[0].clientY) > 50){
                        nextThumbs(thumbs);
                        parentE.dataset.xState = e.touches[0].clientX;
                        parentE.dataset.yState = e.touches[0].clientY;
                    } else if((parentE.dataset.yState - e.touches[0].clientY) < -50){
                        preThumbs(thumbs);
                        parentE.dataset.xState = e.touches[0].clientX;
                        parentE.dataset.yState = e.touches[0].clientY;
                    }
                }
            }
        });
        parentE.addEventListener('touchend', function(){
            if(parentE.dataset.yState != 0){
                parentE.dataset.xState = 0;
                parentE.dataset.yState = 0;
            }
        });
    }
    
    
    var codePortfolio = new Vue({
        el: '#codePortfolio',
        data: {
            mainData: [],
            galleryData: [],
        },
        methods: {
            goto: function(id,name){
                window.location.href = '#/code/work/'+id+'/'+encodeURIComponent(name).split('%20').join('_');
                document.title = name+' | Portfolio | Coder : Deep Panchal';
                codeLightBox.open(id);
            }
        },
        watch: {
            mainData: function(){
                this.galleryData = this.mainData.filter(d => d.item_main_category == "code");
                this.$nextTick(() => {
                    initializeGrid(document.querySelectorAll('#codePortfolio .item'));
                })
            }
        }
    });
    var codeLightBox = new Vue({
        el: '#codeLightBox',
        data: {
            mainData: [],
            lightBoxClass: 'lightBox hideBox',
        },
        methods: {
            open: function(id){
                this.mainData = codePortfolio.mainData.filter(item => item.item_id == id)[0];
                this.lightBoxClass = 'lightBox';
            },
            close: function(){
                this.lightBoxClass = 'lightBox hideBox';
                window.location.href = "#/code/work";
            }
        }
    });
    

    var designPortfolio = new Vue({
        el: '#graphicsPortfolio',
        data: {
            mainData: [],
            galleryData: [],
        },
        methods: {
            goto: function(id,name){
                window.location.href = '#/design/work/'+id+'/'+encodeURIComponent(name).split('%20').join('_');
                document.title = name+' | Portfolio | Designer : Deep Panchal';
                designLightBox.open(id);
            }
        },
        watch: {
            mainData: function(){
                this.galleryData = this.mainData.filter(d => d.item_main_category == "design");
                this.$nextTick(() => {
                    initializeGrid(document.querySelectorAll('#graphicsPortfolio .item'));
                })
            }
        }
    });
    var designLightBox = new Vue({
        el: '#designLightBox',
        data: {
            mainData: [],
            lightBoxClass: 'lightBox hideBox',
        },
        methods: {
            open: function(id){
                this.mainData = codePortfolio.mainData.filter(item => item.item_id == id)[0];
                this.lightBoxClass = 'lightBox';
            },
            close: function(){
                this.lightBoxClass = 'lightBox hideBox';
                window.location.href = "#/design/work";
            }
        }
    });
    fetch('php/data.php')
    .then(res => res.json())
    .then(function(out){
        codePortfolio.mainData = out;
        designPortfolio.mainData = out;
        if(window.location.href.includes('#/code/work/')){
            let t = window.location.href.split('/'),
            portfolioItemId = t[t.length-2];
            codeLightBox.open(portfolioItemId);
        } 
        if(window.location.href.includes('#/design/work/')){
            let t = window.location.href.split('/'),
            portfolioItemId = t[t.length-2];
            designLightBox.open(portfolioItemId);
        } 
    });
