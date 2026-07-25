const clickSound=new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
clickSound.volume=.25;

document.addEventListener("DOMContentLoaded",()=>{

    document.body.classList.add("loaded");

    const currentPage=window.location.pathname.split("/").pop();

    document.querySelectorAll("nav a").forEach(link=>{
        if(link.getAttribute("href")===currentPage){
            link.classList.add("active");
        }

        link.addEventListener("click",function(e){
            if(this.href===window.location.href)return;

            e.preventDefault();

            clickSound.currentTime=0;
            clickSound.play();

            document.body.classList.add("fade-out");

            setTimeout(()=>{
                window.location.href=this.href;
            },350);
        });
    });

    const hero=document.querySelector(".hero");
    if(hero)hero.classList.add("hero-show");

    const observer=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add("show");
            }
        });
    },{threshold:.15});

    document.querySelectorAll(".card,section,table,.hero-img").forEach(item=>{
        item.classList.add("hidden");
        observer.observe(item);
    });

    createBrownies();
});

function createBrownies(){
    for(let i=0;i<10;i++){
        const brownie=document.createElement("div");

        brownie.className="floating-brownie";
        brownie.innerHTML="🍫";
        brownie.style.left=Math.random()*100+"vw";
        brownie.style.animationDuration=10+Math.random()*10+"s";
        brownie.style.animationDelay=Math.random()*8+"s";
        brownie.style.fontSize=18+Math.random()*20+"px";
        brownie.style.opacity=.05+Math.random()*.08;

        document.body.appendChild(brownie);
    }
}

document.addEventListener("click",e=>{
    if(!e.target.classList.contains("btn"))return;

    const ripple=document.createElement("span");
    const rect=e.target.getBoundingClientRect();

    ripple.className="ripple";
    ripple.style.left=e.clientX-rect.left+"px";
    ripple.style.top=e.clientY-rect.top+"px";

    e.target.appendChild(ripple);

    setTimeout(()=>{
        ripple.remove();
    },600);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener("click",function(e){
        const target=document.querySelector(this.getAttribute("href"));
        if(!target)return;

        e.preventDefault();

        target.scrollIntoView({
            behavior:"smooth"
        });
    });
});

document.querySelectorAll(".btn").forEach(button=>{
    button.addEventListener("mouseenter",()=>{
        button.animate([
            {transform:"translateY(0)"},
            {transform:"translateY(-3px)"}
        ],{
            duration:150,
            fill:"forwards"
        });
    });
});

const topBtn=document.createElement("button");
topBtn.innerHTML="↑";
topBtn.className="top-btn";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{
    if(window.scrollY>350){
        topBtn.classList.add("show-top");
    }else{
        topBtn.classList.remove("show-top");
    }
});

topBtn.addEventListener("click",()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
});

window.addEventListener("load",()=>{
    document.body.classList.add("page-ready");
});
