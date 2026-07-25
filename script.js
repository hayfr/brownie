const pageSound=new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
pageSound.volume=.15;

document.addEventListener("DOMContentLoaded",()=>{
    const cover=document.getElementById("pageCover");
    const currentPage=window.location.pathname.split("/").pop()||"index.html";

    requestAnimationFrame(()=>{
        cover.classList.add("hide");
    });

    document.querySelectorAll("nav a,.btn").forEach(link=>{
        const nextPage=link.getAttribute("href");

        if(link.closest("nav")&&nextPage===currentPage){
            link.classList.add("active");
        }

        link.addEventListener("click",e=>{
            if(!nextPage||nextPage.startsWith("#")||nextPage===currentPage)return;

            e.preventDefault();
            pageSound.currentTime=0;
            pageSound.play().catch(()=>{});
            cover.classList.remove("hide");

            setTimeout(()=>{
                window.location.href=nextPage;
            },100);
        });
    });
});

window.addEventListener("pageshow",()=>{
    const cover=document.getElementById("pageCover");
    if(cover)requestAnimationFrame(()=>cover.classList.add("hide"));
});
