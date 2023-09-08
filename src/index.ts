const imageContainer = document.getElementById("imageContainer") as HTMLDivElement | null;
const loadMoreButton = document.getElementById("loadMoreButton") as HTMLButtonElement | null;
const refreshButton = document.getElementById("refreshButton") as HTMLButtonElement | null;

if (!imageContainer || !loadMoreButton || !refreshButton) {
    throw new Error("HTML elementlari topilmadi");
}

let imageCount = 0;
let isLoading = false; // Yuklanayotgan paytida hisoblash uchun flag
const loader = document.createElement("div"); // Loader divini yaratish
loader.classList.add("loader"); // Loaderga tuzilgan CSS qo'shish

// Rasmlarni yuklash funktsiyasi
function loadImages() {
    if (isLoading) return; // Agar yuklanayotgan paytda bosilsa, ishlatmaslik
    isLoading = true; // Yuklanayotgan paytda flagni true qilish
    imageContainer.appendChild(loader); // Loader divini yuklab olish

    // Rasmlarni yuklash
    const promises: Promise<void>[] = [];
    for (let i = 0; i < 6; i++) {
        const img: HTMLImageElement = new Image();
        img.loading = "lazy"; // loading atributini qo'shish
        const imgPromise = new Promise<void>((resolve, reject) => {
            img.addEventListener("load", () => resolve());
            img.addEventListener("error", () => reject());
        });
        img.src = `https://source.unsplash.com/random/400x400?${imageCount++}`;
        promises.push(imgPromise);
        imageContainer.appendChild(img);
    }

    // Barcha rasmlar yuklandiqlarida loader ni o'chiramiz
    Promise.all(promises)
        .then(() => {
            isLoading = false; // Yuklanayotgan paytda flagni false qilish
            imageContainer.removeChild(loader); // Loader ni o'chirish
        })
        .catch(() => {
            isLoading = false; // Yuklanayotgan paytda flagni false qilish
            imageContainer.removeChild(loader); // Loader ni o'chirish
        });
}

// Load More tugmasi bosilganda rasmlarni yuklash
loadMoreButton.addEventListener("click", loadImages);

// Refresh tugmasi bosilganda rasmlarni tozalash
refreshButton.addEventListener("click", () => {
    imageContainer.innerHTML = ""; // Image containerni tozalash
    imageCount = 0;
});

// Sahifani yuklashda avval o'zi 6ta rasmni yuklaymiz
loadImages();