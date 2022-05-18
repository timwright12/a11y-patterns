// Cache our variables
const toggle = document.getElementById('toggle');
const menu = document.getElementById('menu');

// Hide the menu initially
menu.setAttribute('hidden', 'true');

// Bind click listener
toggle.addEventListener('click', handleClick, false);

// Toggle the open/close state
function handleClick(e){
  e.preventDefault();
  
  const src = e.target;
  const expanded = src.getAttribute('aria-expanded');
  const controls = src.getAttribute('aria-controls');
  const dest = document.getElementById(controls);
  
  // If the menu is close, open it
  if(expanded === 'false') {
    openMenu(src, dest, true);
    // Activate ESC to close the menu, bind to window so it work on src and dest
    window.addEventListener('keyup', e => {
      handleKeyup(src, dest, e);
    }, false);
  } else {
    closeMenu(src, dest);
    // clean up
    toggle.removeEventListener('click', handleKeyup);
  }
  
}

// Close the menu on ESC
function handleKeyup(src, dest, e) {
  if(e.keyCode === 27) {
    closeMenu(src, dest);
  }
}

// Open the menu and set focus to the first link
function openMenu(src, dest, trapFocus) {
  src.setAttribute('aria-expanded', 'true');
  dest.removeAttribute('hidden');
  dest.querySelector('a').focus(); // set focus to first <a>

  if(trapFocus) {
    handleFocusTrap(dest);
  }
}

// Close the menu and reset focus to the toggle button
function closeMenu(src, dest) {
  src.setAttribute('aria-expanded', 'false');
  dest.setAttribute('hidden', 'true');
  src.focus();
}

// Handle trapping focus inside menu if active
function handleFocusTrap(dest) {
  const focusElements = dest.querySelectorAll( 'a, button, input, select, textarea, [tabindex]' );
  const focusElementsLength = focusElements.length;
  const firstFocusElement = focusElements[0];
  const lastFocusElement = focusElements[focusElementsLength-1];

  lastFocusElement.addEventListener('keydown', e => {
    // if [Tab] and not [Shift]
    if( 9 === e.keyCode && !e.shiftKey ) {
			e.preventDefault();
			firstFocusElement.focus();
		}
  });

  firstFocusElement.addEventListener('keydown', e => {
    // if [Tab] and [Shift]
    if( 9 === e.keyCode && e.shiftKey ) {
			e.preventDefault();
			lastFocusElement.focus();
		}
  });

}