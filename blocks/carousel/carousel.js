import Swiper from '../../scripts/swiper-bundle.esm.browser.min.js';

/**
 * Decorates a DOM block element as a Swiper carousel.
 *
 * @param {HTMLElement} block - The block element to decorate.
 */

export default function decorateCarousel(block) {
  
    // Validate the block element
    if (!block || !block.children || block.children.length === 0) {
      throw new Error('Invalid block element.');
    }
    
    // Add the necessary classes
    const swiperEle = block;
    swiperEle.classList.add('swiper');
    
    // Convert NodeList to an array
    const swiperSlides = [...block.children];
    
    // Loop through each slide and add the class to it
    swiperSlides.forEach(slide => {
      slide.classList.add('swiper-slide');
    });
    
    // Create a new div element
    const swiperWrapperEle = document.createElement('div');
    
    // Add the 'swiper-wrapper' class to the div element
    swiperWrapperEle.classList.add('swiper-wrapper');
    
    // Insert the 'swiper-wrapper' div before the first slide
    const firstSlide = swiperSlides[0];
    firstSlide.parentNode.insertBefore(swiperWrapperEle, firstSlide);
    
    // Move each slide inside the 'swiper-wrapper' div
    swiperSlides.forEach(slide => {
      swiperWrapperEle.appendChild(slide);
    });
    
    // Create a new div element
    const swiperPaginationEle = document.createElement('div');
    
    // Add the 'swiper-pagination' class to the div element
    swiperPaginationEle.classList.add('swiper-pagination');
    
    // Insert the 'swiper-pagination' div 
    swiperEle.appendChild(swiperPaginationEle);
    
    // Add the 'swiper-pagination' class to the div element
    swiperPaginationEle.classList.add('swiper-pagination');
    
    // Create a new div element
    const swiperNavigationPrevEle = document.createElement('swiper-button-prev');
    const swiperNavigationNextEle = document.createElement('swiper-button-next');
    
    // Add the 'swiper-button-prev' class to the div element
    swiperNavigationPrevEle.classList.add('swiper-button-prev');
    
    // Add the 'swiper-button-next' class to the div element
    swiperNavigationNextEle.classList.add('swiper-button-next');
    
    // Insert the 'swiper-button-prev' div 
    swiperEle.appendChild(swiperNavigationPrevEle);
    
    // Insert the 'swiper-button-next' div 
    swiperEle.appendChild(swiperNavigationNextEle);

    const swiper = new Swiper('.swiper', {
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
    
    console.log('Swiper block', block);
}