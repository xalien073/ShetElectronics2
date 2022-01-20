<template>
    <div class="scene">
      <div class="cube">
        <img src="@/assets/m12.webp" class="front" alt="" />
        <img src="@/assets/m121.webp" class="back" alt="" />
        <img src="@/assets/m122.webp" class="left" alt="" />
        <img src="@/assets/m123.webp" class="right" alt="" />
        <img src="@/assets/m12.webp" class="top" alt="" />
      </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
$cube-color: #0ff7;
$cube-height-width: 18rem;
$half-cube: $cube-height-width/2;

.scene,
.cube {
  transform-style: preserve-3d;
}
.scene {
  position: relative;
  animation: rotate-scene 8s linear infinite;
  }
.cube,
.ball,
.top,
.left,
.right,
.front,
.back {
  position: absolute;
}
.cube {
  width: $cube-height-width;
  height: $cube-height-width;
  bottom: -$half-cube;
  left: -$half-cube;
  transform: translateY(-10%);

  .top,
  .left,
  .right,
  .front,
  .back {
    background: $cube-color;
    box-shadow: 0 0 $half-cube #000a inset;
  }
  .left,
  .right,
  .front,
  .back {
    width: 100%;
    height: 100%;
  }
  .top {
    width: $cube-height-width;
    height: $cube-height-width;
    transform: translateY(-50%) rotateX(90deg);
  }
  .cube::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: $cube-height-width;
    height: $cube-height-width;
    background: #0007;
    transform: translateY(50%) rotateX(90deg);
    box-shadow: 0 0 $half-cube #000;
  }
  .front {
    transform: translateZ($half-cube);
  }
  .right {
    transform: rotateY(90deg) translateZ($half-cube);
  }
  .back {
    transform: rotateY(180deg) translateZ($half-cube);
  }
  .left {
    transform: rotateY(270deg) translateZ($half-cube);
  }

  @keyframes rotate-scene {
    to {
      transform: rotateY(360deg);
    }
  }

  @media screen and (max-width: 768px) {
    $cube-height-width: 29vh;
    $half-cube: $cube-height-width/2;
    transform: translateY(-75%);
    width: $cube-height-width;
    height: $cube-height-width;
    bottom: -$half-cube;
    left: -$half-cube;

    .top,
    .left,
    .right,
    .front,
    .back {
      background: $cube-color;
      box-shadow: 0 0 $half-cube #000a inset;
    }
    .left,
    .right,
    .front,
    .back,
    .ballshadow {
      width: 100%;
      height: 100%;
    }
    .top {
      width: $cube-height-width;
      height: $cube-height-width;
      transform: translateY(-50%) rotateX(90deg);
    }
    .cube::before {
      content: "";
      position: absolute;
      bottom: 0;
      width: $cube-height-width;
      height: $cube-height-width;
      background: #0007;
      transform: translateY(50%) rotateX(90deg);
      box-shadow: 0 0 $half-cube #000;
    }
    .front {
      transform: translateZ($half-cube);
    }
    .right {
      transform: rotateY(90deg) translateZ($half-cube);
    }
    .back {
      transform: rotateY(180deg) translateZ($half-cube);
    }
    .left {
      transform: rotateY(270deg) translateZ($half-cube);
    }
  }
}
</style>