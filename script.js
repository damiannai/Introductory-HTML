  function createStars() {
    const universe = document.getElementById('universe');
    for (let i = 0; i < 1000; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.width = `${Math.random() * 3}px`;
      star.style.height = star.style.width;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      universe.appendChild(star);
    }
  }
  createStars();

  const cube = document.getElementById('metaCube');

  function getCurrentRotation() {
    const st = window.getComputedStyle(cube);
    const tr = st.transform || st.webkitTransform || st.mozTransform;
    if (tr && tr !== "none") {
      const values = tr.match(/matrix3d\((.+)\)/);
      if (values) {
        const m = values[1].split(', ').map(Number);
        let sy = Math.sqrt(m[0] * m[0] + m[1] * m[1]);
        let singular = sy < 1e-6;
        let x, y;
        if (!singular) {
          x = Math.atan2(m[6], m[10]);
          y = Math.atan2(-m[2], sy);
        } else {
          x = Math.atan2(-m[9], m[5]);
          y = Math.atan2(-m[2], sy);
        }
        rotX = x * 180 / Math.PI;
        rotY = y * 180 / Math.PI;
      }
    }
  }

  function setCubeRotation() {
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }

  function animateInertia() {
    velocityX *= 0.95;
    velocityY *= 0.95;
    rotY += velocityX;
    rotX += velocityY;
    setCubeRotation();

    if (Math.abs(velocityX) > 0.01 || Math.abs(velocityY) > 0.01) {
      inertiaFrame = requestAnimationFrame(animateInertia);
    } else {
      inertiaFrame = null;
    }
  }