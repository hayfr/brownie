const pageSound=new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
pageSound.volume=.2;

document.addEventListener("DOMContentLoaded",()=>{
    document.body.classList.add("page-show");
    const currentPage=window.location.pathname.split("/").pop()||"index.html";
    document.querySelectorAll("nav a").forEach(link=>{
        if(link.getAttribute("href")===currentPage)link.classList.add("active");
        link.addEventListener("click",e=>{
            if(link.getAttribute("href")===currentPage)return;
            e.preventDefault();
            pageSound.currentTime=0;
            pageSound.play().catch(()=>{});
            document.body.classList.add("page-hide");
            setTimeout(()=>{
                window.location.href=link.href;
            },250);
        });
    });
});
