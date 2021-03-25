export default {
    inserted: el => {
        function loadImg() {
          const imageElement = Array.from(el.children).find(
            el => el.nodeName === "IMG"
          );
          if(imageElement) {
            // imageElement.src = "../../public/images/placeholder_photo.jpg"
            imageElement.addEventListener("load", () => {
              setTimeout(() =>  el.classList.add("loaded"), 100);
            });
            imageElement.addEventListener("error", () => console.log("error"));
            imageElement.src = imageElement.dataset.url;
          }
        }
        function handleIntersect(entries, observer) {
          entries.forEach(entry => {
            if(entry.isIntersecting) {
              loadImg();
              observer.unobserve(el);
            }
          });
        }
        function createObserver() {
          const options = {
            root: null,
            threshold: "0"
          };
          const observer = new IntersectionObserver(handleIntersect, options);
          observer.observe(el);
        }
        if(window["IntersectionObserver"]){
          createObserver();
        } else {
          loadImg();
        }
      }
}