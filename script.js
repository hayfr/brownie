const pageSound=new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
pageSound.volume=.15;
pageSound.preload="auto";

window.addEventListener("pageshow",()=>{
    document.body.classList.remove("page-hide");
    requestAnimationFrame(()=>{
        document.body.classList.add("page-show");
    });
});

document.addEventListener("DOMContentLoaded",()=>{
    const currentPage=window.location.pathname.split("/").pop()||"index.html";
    document.querySelectorAll("nav a").forEach(link=>{
        const nextPage=link.getAttribute("href");
        if(nextPage===currentPage)link.classList.add("active");
        link.addEventListener("click",e=>{
            if(nextPage===currentPage)return;
            e.preventDefault();
            pageSound.currentTime=0;
            pageSound.play().catch(()=>{});
            document.body.classList.remove("page-show");
            document.body.classList.add("page-hide");
            setTimeout(()=>{
                window.location.href=link.href;
            },300);
        });
    });
});
