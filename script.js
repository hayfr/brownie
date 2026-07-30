const pageSound=new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
pageSound.volume=.15;

document.addEventListener("DOMContentLoaded",()=>{
    const currentPage=window.location.pathname.split("/").pop()||"index.html";

    document.querySelectorAll('a[href$=".html"]').forEach(link=>{
        const nextPage=link.getAttribute("href");

        if(link.closest("nav")&&nextPage===currentPage){
            link.classList.add("active");
        }

        link.addEventListener("click",e=>{
            if(nextPage===currentPage)return;

            e.preventDefault();
            pageSound.currentTime=0;
            pageSound.play().catch(()=>{});
            document.documentElement.classList.add("leaving");

            setTimeout(()=>{
                window.location.href=link.href;
            },120);
        });
    });

    const canvas=document.getElementById("gameCanvas");
    if(!canvas)return;

    const ctx=canvas.getContext("2d");
    const scoreText=document.getElementById("score");
    const bestText=document.getElementById("best");
    const message=document.getElementById("message");
    const actionBtn=document.getElementById("actionBtn");
    const blockHeight=28;
    const step=30;
    let blocks=[];
    let current=null;
    let score=0;
    let scroll=0;
    let state="start";
    let best=Number(localStorage.getItem("brownieBest"))||0;

    bestText.textContent=best;

    class Brownie{
        constructor(x,y,width,direction,speed){
            this.x=x;
            this.y=y;
            this.width=width;
            this.direction=direction;
            this.speed=speed;
        }

        update(){
            this.x+=this.speed*this.direction;

            if(this.x<=0){
                this.x=0;
                this.direction=1;
            }

            if(this.x+this.width>=canvas.width){
                this.x=canvas.width-this.width;
                this.direction=-1;
            }
        }

        draw(){
            const x=this.x;
            const y=this.y+scroll;
            const w=this.width;

            ctx.fillStyle="rgba(0,0,0,.18)";
            ctx.fillRect(x+4,y+5,w,blockHeight);

            ctx.fillStyle="#32150d";
            ctx.fillRect(x,y,w,blockHeight);

            ctx.fillStyle="#61331f";
            ctx.fillRect(x+3,y+3,w-6,blockHeight-6);

            ctx.fillStyle="#8b5134";
            ctx.fillRect(x+3,y+3,w-6,6);

            ctx.strokeStyle="#241009";
            ctx.lineWidth=2;
            ctx.strokeRect(x,y,w,blockHeight);

            const chips=Math.max(1,Math.floor(w/40));

            for(let i=0;i<chips;i++){
                const chipX=x+(i+1)*w/(chips+1);
                const chipY=y+11+(i%2)*7;

                ctx.fillStyle="#211009";
                ctx.beginPath();
                ctx.arc(chipX,chipY,2.5,0,Math.PI*2);
                ctx.fill();
            }

            if(w>55){
                ctx.strokeStyle="#442116";
                ctx.lineWidth=2;
                ctx.beginPath();
                ctx.moveTo(x+w*.43,y+5);
                ctx.lineTo(x+w*.49,y+10);
                ctx.lineTo(x+w*.46,y+15);
                ctx.lineTo(x+w*.52,y+21);
                ctx.stroke();
            }
        }
    }

    function startGame(){
        blocks=[];
        current=null;
        score=0;
        scroll=0;
        state="playing";
        scoreText.textContent=score;
        message.textContent="";
        actionBtn.textContent="Drop Brownie";
        blocks.push(new Brownie(100,450,200,0,0));
        spawnBlock();
    }

    function spawnBlock(){
        const last=blocks[blocks.length-1];
        const direction=score%2===0?1:-1;
        const x=direction===1?0:canvas.width-last.width;
        const speed=Math.min(2+score*.15,5);

        current=new Brownie(x,last.y-step,last.width,direction,speed);

        if(current.y+scroll<100){
            scroll+=step;
        }
    }

    function dropBlock(){
        const last=blocks[blocks.length-1];
        let start=Math.max(current.x,last.x);
        const end=Math.min(current.x+current.width,last.x+last.width);
        let overlap=end-start;

        if(overlap<=3){
            state="gameover";
            message.textContent="The brownie missed the tower!";
            actionBtn.textContent="Try Again";
            return;
        }

        if(Math.abs(current.x-last.x)<5){
            start=last.x;
            overlap=last.width;
            message.textContent="Perfect drop!";
        }else{
            message.textContent="";
        }

        current.x=start;
        current.width=overlap;
        current.speed=0;
        blocks.push(current);
        score++;
        scoreText.textContent=score;

        if(score>best){
            best=score;
            bestText.textContent=best;
            localStorage.setItem("brownieBest",best);
        }

        spawnBlock();
    }

    function drawBackground(){
        ctx.fillStyle="#f5e7d6";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.strokeStyle="rgba(109,61,37,.1)";
        ctx.lineWidth=1;

        for(let y=0;y<canvas.height;y+=40){
            ctx.beginPath();
            ctx.moveTo(0,y);
            ctx.lineTo(canvas.width,y);
            ctx.stroke();
        }

        ctx.fillStyle="#c99d72";
        ctx.fillRect(0,478,canvas.width,22);
    }

    function gameLoop(){
        drawBackground();

        blocks.forEach(block=>block.draw());

        if(current){
            if(state==="playing"){
                current.update();
            }

            current.draw();
        }

        if(state==="start"){
            ctx.fillStyle="#5a2f1d";
            ctx.font="bold 20px Trebuchet MS";
            ctx.textAlign="center";
            ctx.fillText("Press Start to Build",canvas.width/2,canvas.height/2);
        }

        requestAnimationFrame(gameLoop);
    }

    function handleAction(){
        if(state==="start"||state==="gameover"){
            startGame();
        }else{
            dropBlock();
        }
    }

    actionBtn.addEventListener("click",handleAction);

    window.addEventListener("keydown",e=>{
        if(e.code==="Space"&&document.activeElement!==actionBtn){
            e.preventDefault();
            handleAction();
        }
    });

    gameLoop();
});

window.addEventListener("pageshow",()=>{
    document.documentElement.classList.remove("leaving");
});

document.addEventListener("DOMContentLoaded", () => {
    const servingCount = document.querySelector("#servingCount");
    const servingDisplay = document.querySelector("#servingDisplay");
    const traySize = document.querySelector("#traySize");
    const decreaseButton = document.querySelector("#decreaseServings");
    const increaseButton = document.querySelector("#increaseServings");
    const ingredientAmounts = document.querySelectorAll(".ingredient-amount");

    if (!servingCount || !servingDisplay || !traySize || !decreaseButton || !increaseButton) {
        return;
    }

    let batches = 1;
    const minimumBatches = 1;
    const maximumBatches = 4;

    const traySizes = {
        1: "8 × 8-inch square pan",
        2: "9 × 13-inch pan",
        3: "one 9 × 13-inch pan and one 8 × 8-inch pan",
        4: "two 9 × 13-inch pans"
    };

    function greatestCommonDivisor(a, b) {
        while (b !== 0) {
            const remainder = a % b;
            a = b;
            b = remainder;
        }

        return a;
    }

    function formatAmount(numerator, denominator) {
        const divisor = greatestCommonDivisor(numerator, denominator);

        numerator /= divisor;
        denominator /= divisor;

        const wholeNumber = Math.floor(numerator / denominator);
        const remainder = numerator % denominator;

        if (remainder === 0) {
            return String(wholeNumber);
        }

        if (wholeNumber === 0) {
            return `${remainder}/${denominator}`;
        }

        return `${wholeNumber} ${remainder}/${denominator}`;
    }

    function updateRecipe() {
        const servings = batches * 9;

        servingCount.textContent = servings;
        servingDisplay.textContent = servings;
        traySize.textContent = traySizes[batches];

        ingredientAmounts.forEach(amountCell => {
            const numerator = Number(amountCell.dataset.numerator) * batches;
            const denominator = Number(amountCell.dataset.denominator);
            const amount = formatAmount(numerator, denominator);
            const singularUnit = amountCell.dataset.unitSingular;
            const pluralUnit = amountCell.dataset.unitPlural;
            const totalAmount = numerator / denominator;
            const unit = totalAmount === 1 ? singularUnit : pluralUnit;

            amountCell.textContent = unit ? `${amount} ${unit}` : amount;
        });

        decreaseButton.disabled = batches === minimumBatches;
        increaseButton.disabled = batches === maximumBatches;
    }

    decreaseButton.addEventListener("click", () => {
        if (batches > minimumBatches) {
            batches--;
            updateRecipe();
        }
    });

    increaseButton.addEventListener("click", () => {
        if (batches < maximumBatches) {
            batches++;
            updateRecipe();
        }
    });

    updateRecipe();
});
