const menubox = document.querySelector('.menubox');
const menulabel = menubox.querySelector('.menubox__label');
const menucontent = menubox.querySelector('.menubox__contents');
const menuchecks = menubox.querySelectorAll('input[type=checkbox]');

const menuboxRect = menubox.getBoundingClientRect();
const menulabelRect = menulabel.getBoundingClientRect();

const frameTime = 1000 / 60;
const duration = 350;
const frames = Math.ceil(duration / frameTime);

const slideHeight = menuboxRect.height - menulabelRect.height;

// const menuScaleFactor = menulabelRect.height / menuboxRect.height;

// menubox.style.transform = `scale(1, ${menuScaleFactor})`;
// menucontent.style.transform = `scale(1, 0)`;
// menulabel.style.transform = `scale(1, ${1 / menuScaleFactor})`

let timer = null;
let currentItem = 0;

const debouncedFn = (fn) => {
  timer && clearTimeout(timer);
  timer = setTimeout(fn, 250);
}

const documentAnimateHeight = (e) => {
  if (e.target === menubox || menubox.contains(e.target)) {
    e.stopPropagation();
    return;
  }
  
  debouncedFn(() => {
    animateHeight(true);
  });
};
      
document.addEventListener('click', documentAnimateHeight);

function animateHeight (collapsing, done) {
  let i = 0;
  
  function __animate () {
    // const scale = (collapsing ? frames - (i++) : i++) / frames;
    // const height = menulabelRect.height + (scale * slideHeight);
    
    const factor = Math.pow((i++) / frames - 1, 3) + 1;
    const height = 2 + menulabelRect.height + (collapsing ? 1 - factor : factor) * slideHeight;

    menubox.style.maxHeight = `${height}px`;

    if (i <= frames) {
      requestAnimationFrame(__animate);
    } else {
      if (collapsing) {
        const transitionEnded = () => {
          menubox.removeEventListener('transitionend', transitionEnded);
          document.removeEventListener('click', documentAnimateHeight);
          
          (typeof done === 'function') && done();
        }
        
        menubox.classList.add('menubox--collapsed');
        menubox.addEventListener('transitionend', transitionEnded, false);
      } else {
        menuchecks.item(currentItem = currentItem || 0).focus();
        (typeof done === 'function') && done();
      }
      
      timer && clearTimeout(timer);
      timer = null;
    }
  }
  
  if (collapsing) {
    requestAnimationFrame(__animate);
  } else {
    const transitionEnded = () => {
      menubox.removeEventListener('transitionend', transitionEnded);
      requestAnimationFrame(__animate);
    }
    
    menubox.classList.remove('menubox--collapsed');
    menubox.addEventListener('transitionend', transitionEnded, false);
      
    document.addEventListener('click', documentAnimateHeight);
  }
}

menubox.addEventListener('focus', () => {
  debouncedFn(() => {
    menubox.classList.contains('menubox--collapsed') && animateHeight(false, () => {
      menubox.blur();
      menubox.setAttribute('tabIndex', -1);
    });
  });
});

menubox.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'Down':
    case 'ArrowDown': {
      menuchecks.item(++currentItem === menuchecks.length ? (currentItem = 0) : currentItem).focus();
      break;
    }
      
    case 'Up':
    case 'ArrowUp': {
      menuchecks.item(--currentItem < 0 ? (currentItem = menuchecks.length - 1) : currentItem).focus();
      break;
    }
      
    case 'Enter': {
      menuchecks.item(currentItem).click();
      break;
    }
      
    case 'Tab':
    case 'Escape': {
      debouncedFn(() => {
        menuchecks.item(currentItem).blur();
        
        !menubox.classList.contains('menubox--collapsed') && animateHeight(true, () => {
          menubox.blur();
          menubox.setAttribute('tabIndex', 0);
        });
      });
      
      break;
    }
  }
});

menulabel.addEventListener('click', () => {
  debouncedFn(() => {
    animateHeight(!menubox.classList.contains('menubox--collapsed'));
  });
});

menuchecks.forEach((checkbox, index) => {
  checkbox.setAttribute('tabindex', -1);
  
  checkbox.addEventListener('change', function() {
    currentItem = index;
    
    if (!this.checked) {
      const checker = this.closest('label')
        .querySelector('.menubox__option-toggle-check');
      
      const animationEnded = () => {
        checker.classList.remove('unchecking');
        checker.removeEventListener('animationend', animationEnded);
      };
      
      checker.classList.add('unchecking');
      checker.addEventListener('animationend', animationEnded, false);
    }
  }, false);
});