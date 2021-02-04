const logo = document.querySelector('#logo');

const state = {
  color: 0,
  position: {
    x: (window.innerWidth / 2) - (logo.clientWidth / 2),
    y: (window.innerHeight / 2) - (logo.clientHeight / 2),
  },
  velocity: {
    x: 1,
    y: -1,
  },
  multiplier: 2
};

update();

window.addEventListener('resize', () => draw());

function update() {
  draw();
  move();
  collision();
  window.requestAnimationFrame(update);
}

function draw() {
  logo.style.top = state.position.y + 'px';
  logo.style.left = state.position.x + 'px';
  logo.querySelectorAll('path').forEach(path => {
    path.setAttribute('fill', `hsl(${state.color % 360}, 45%, 50%)`);
  });
}

function move() {
  state.position.y += (state.velocity.y * state.multiplier);
  state.position.x += (state.velocity.x * state.multiplier);
}

function collision() {
  if (state.position.x + logo.clientWidth >= window.innerWidth) {
    state.velocity.x = -state.velocity.x;
    color();
  } else if (state.position.x <= 0) {
    state.velocity.x = -state.velocity.x;
    color();
  }

  if (state.position.y <= 0) {
    state.velocity.y = -state.velocity.y;
    color();
  } else if (state.position.y + logo.clientHeight >= window.innerHeight) {
    state.velocity.y = -state.velocity.y;
    color();
  }
}

function color() {
  state.color = state.color + Math.floor(Math.random() * 360);
}
