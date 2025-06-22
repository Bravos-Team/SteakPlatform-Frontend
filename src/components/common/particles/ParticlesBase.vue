<template>
  <div>
    <vue-particles
      id="tsparticles"
      :particlesInit="particlesInit"
      url="http://foo.bar/particles.json"
    />

    <vue-particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="{
        background: {
          color: {
            // value: '#0d0d0de9',
            value: '#0d0d0dec',
            // value: '#050505ec',
          },
          mask: {
            enable: true,
            cover: {
              color: { value: '#ffffff' },
            },
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'repulse',
            },
            onHover: {
              enable: true,
              mode: 'grab',
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 100,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            // repulse: {
            //   distance: 200,
            //   duration: 0.4,
            // },
            grab: {
              distance: 140,
              links: {
                opacity: 1,
              },
            },
          },
        },
        particles: {
          color: {
            value: '#ffffff',
          },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          // destroy: {
          //   mode: 'split',
          //   split: {
          //     count: 2,
          //     factor: { value: 2 },
          //     rate: { value: 10 },
          //     particles: {
          //       color: { value: '#f00' },
          //       move: { speed: 3 },
          //     },
          //   },
          // },
          move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.3,
              sync: false,
            },
          },
          shape: {
            // type: 'image',
            // image: {
            //   src: 'https://ccdn.steak.io.vn/logo_steak.svg',
            //   width: 102,
            //   height: 102,
            // },
            type: 'circle',
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }"
    />
  </div>
</template>

<script setup>
// import { loadFull } from 'tsparticles' // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from 'tsparticles-slim' // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

const particlesInit = async (engine) => {
  //await loadFull(engine);
  await loadSlim(engine)
}

// const particlesLoaded = async (container) => {
//   console.log('Particles container loaded', container)
// }
</script>
